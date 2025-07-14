const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Create tables if they don't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS salary_submissions (
      id TEXT PRIMARY KEY,
      position TEXT NOT NULL,
      location TEXT NOT NULL,
      company TEXT,
      baseSalary REAL NOT NULL,
      totalComp REAL NOT NULL,
      experience REAL NOT NULL,
      benefits TEXT,
      additionalNotes TEXT,
      submittedAt TEXT NOT NULL
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);
  
  // Insert default admin user if not exists
  const defaultAdmin = {
    username: 'admin',
    password: 'admin123', // Change this in production!
    password_hash: crypto.createHash('sha256').update('admin123').digest('hex')
  };
  
  db.get('SELECT id FROM admin_users WHERE username = ?', [defaultAdmin.username], (err, row) => {
    if (!row) {
      db.run(`
        INSERT INTO admin_users (id, username, password_hash, created_at)
        VALUES (?, ?, ?, ?)
      `, [uuidv4(), defaultAdmin.username, defaultAdmin.password_hash, new Date().toISOString()]);
    }
  });
});

// Routes
app.get('/api/submissions', (req, res) => {
  db.all('SELECT * FROM salary_submissions ORDER BY submittedAt DESC', (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    // Parse benefits array from JSON string
    const submissions = rows.map(row => ({
      ...row,
      benefits: row.benefits ? JSON.parse(row.benefits) : []
    }));
    
    res.json(submissions);
  });
});

app.post('/api/submissions', (req, res) => {
  const {
    position,
    location,
    company,
    baseSalary,
    totalComp,
    experience,
    benefits,
    additionalNotes,
    submittedAt
  } = req.body;

  // Validate required fields
  if (!position || !location || !baseSalary || !totalComp || experience === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const id = uuidv4();
  const benefitsJson = JSON.stringify(benefits || []);

  const stmt = db.prepare(`
    INSERT INTO salary_submissions 
    (id, position, location, company, baseSalary, totalComp, experience, benefits, additionalNotes, submittedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    id,
    position,
    location,
    company || '',
    baseSalary,
    totalComp,
    experience,
    benefitsJson,
    additionalNotes || '',
    submittedAt
  );

  stmt.finalize((err) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.status(201).json({ 
      message: 'Salary submission created successfully',
      id: id
    });
  });
});

// Admin authentication middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.substring(7);
  // In a real app, you'd verify the JWT token
  // For simplicity, we'll just check if it exists
  if (token) {
    next();
  } else {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
  
  db.get('SELECT * FROM admin_users WHERE username = ? AND password_hash = ?', 
    [username, passwordHash], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (!row) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate a simple token (in production, use JWT)
    const token = crypto.randomBytes(32).toString('hex');
    res.json({ token, message: 'Login successful' });
  });
});

// Admin get all submissions
app.get('/api/admin/submissions', authenticateAdmin, (req, res) => {
  db.all('SELECT * FROM salary_submissions ORDER BY submittedAt DESC', (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    const submissions = rows.map(row => ({
      ...row,
      benefits: row.benefits ? JSON.parse(row.benefits) : []
    }));
    
    res.json(submissions);
  });
});

// Admin delete submission
app.delete('/api/admin/submissions/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM salary_submissions WHERE id = ?', [id], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    
    res.json({ message: 'Submission deleted successfully' });
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Database file: ${dbPath}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
}); 