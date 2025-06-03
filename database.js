const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('employees.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS employees (
    code TEXT PRIMARY KEY,
    name TEXT,
    contact TEXT,
    email TEXT
  )`);

  db.run("INSERT OR REPLACE INTO employees VALUES ('EMP001', 'Alice Johnson', '1234567890', 'alice@example.com')");
  db.run("INSERT OR REPLACE INTO employees VALUES ('EMP002', 'Bob Smith', '2345678901', 'bob@example.com')");
  db.run("INSERT OR REPLACE INTO employees VALUES ('EMP003', 'Charlie Brown', '3456789012', 'charlie@example.com')");
});

module.exports = db;
