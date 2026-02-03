const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(
  path.join(__dirname, 'jobs.db'),
  (err) => {
    if (err) console.error(err);
    else console.log('SQLite DB connected');
  }
);

// Create table
db.run(`
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    taskName TEXT NOT NULL,
    payload TEXT,
    priority TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
