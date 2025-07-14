# Dental Salary Backend

Express.js backend server with SQLite database for the dental salary comparison platform.

## Features

- RESTful API for salary submissions
- SQLite database for data persistence
- CORS enabled for frontend integration
- Input validation and error handling
- UUID generation for unique IDs

## API Endpoints

### GET /api/submissions
Retrieve all salary submissions ordered by submission date (newest first).

**Response:**
```json
[
  {
    "id": "uuid",
    "position": "General Dentist",
    "location": "New York, NY",
    "company": "Bright Smiles",
    "baseSalary": 160000,
    "totalComp": 180000,
    "experience": 3,
    "benefits": ["Health Insurance", "Dental Insurance"],
    "additionalNotes": "Great work environment",
    "submittedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### POST /api/submissions
Create a new salary submission.

**Request Body:**
```json
{
  "position": "General Dentist",
  "location": "New York, NY",
  "company": "Bright Smiles",
  "baseSalary": 160000,
  "totalComp": 180000,
  "experience": 3,
  "benefits": ["Health Insurance", "Dental Insurance"],
  "additionalNotes": "Great work environment",
  "submittedAt": "2024-01-15T10:30:00.000Z"
}
```

**Response:**
```json
{
  "message": "Salary submission created successfully",
  "id": "uuid"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Start the production server:
```bash
npm start
```

The server will run on `http://localhost:3001` and create a `database.sqlite` file for data storage.

## Database Schema

```sql
CREATE TABLE salary_submissions (
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
);
```

## Environment

- **Port**: 3001
- **Database**: SQLite (database.sqlite)
- **CORS**: Enabled for all origins
- **Body Parser**: JSON

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (missing required fields)
- `500` - Internal Server Error

## Development

The server uses nodemon for development, which will automatically restart when files change. 