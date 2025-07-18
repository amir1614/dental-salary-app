const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['https://amir1614.github.io', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Serve frontend static files (React build)
app.use(express.static(path.join(__dirname, '../build')));

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
      submittedAt TEXT NOT NULL,
      selfEmployed TEXT NOT NULL,
      clinicalHoursPerWeek TEXT
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

  const defaultAdmin = {
    username: 'admin',
    password: 'admin123',
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

// API Routes
app.get('/api/submissions', (req, res) => {
  db.all('SELECT * FROM salary_submissions ORDER BY submittedAt DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    const submissions = rows.map(row => ({
      ...row,
      benefits: row.benefits ? JSON.parse(row.benefits) : [],
      selfEmployed: row.selfEmployed === 'yes' ? 'yes' : 'no',
    }));
    res.json(submissions);
  });
});

app.post('/api/submissions', (req, res) => {
  const {
    position, location, baseSalary, totalComp, experience,
    benefits, additionalNotes, submittedAt, selfEmployed, clinicalHoursPerWeek
  } = req.body;

  if (!position || !location || baseSalary == null || totalComp == null || experience == null || (selfEmployed !== 'yes' && selfEmployed !== 'no')) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const id = uuidv4();
  const benefitsJson = JSON.stringify(benefits || []);

  const stmt = db.prepare(`
    INSERT INTO salary_submissions 
    (id, position, location, company, baseSalary, totalComp, experience, benefits, additionalNotes, submittedAt, selfEmployed, clinicalHoursPerWeek)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(id, position, location, '', baseSalary, totalComp, experience, benefitsJson, additionalNotes || '', submittedAt, selfEmployed, clinicalHoursPerWeek,
    function(err) {
      if (err) return res.status(500).json({ error: 'Database error', details: err.message });
      res.status(201).json({ message: 'Salary submission created successfully', id });
    }
  );
});

const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) return next();
  res.status(401).json({ error: 'Unauthorized' });
};

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

  const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

  db.get('SELECT * FROM admin_users WHERE username = ? AND password_hash = ?', [username, passwordHash], (err, row) => {
    if (!row) return res.status(401).json({ error: 'Invalid credentials' });
    const token = crypto.randomBytes(32).toString('hex');
    res.json({ token, message: 'Login successful' });
  });
});

app.get('/api/admin/submissions', authenticateAdmin, (req, res) => {
  db.all('SELECT * FROM salary_submissions ORDER BY submittedAt DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    const submissions = rows.map(row => ({
      ...row,
      benefits: row.benefits ? JSON.parse(row.benefits) : [],
      selfEmployed: row.selfEmployed === 'yes' ? 'yes' : 'no',
    }));
    res.json(submissions);
  });
});

app.delete('/api/admin/submissions/:id', authenticateAdmin, (req, res) => {
  db.run('DELETE FROM salary_submissions WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (this.changes === 0) return res.status(404).json({ error: 'Submission not found' });
    res.json({ message: 'Submission deleted successfully' });
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve React frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
