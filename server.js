const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));

// Connect to SQLite database
const db = new sqlite3.Database('./employees.db');

// API: Get all employee codes
app.get('/api/employees', (req, res) => {
  db.all('SELECT code FROM employees', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// API: Get employee details by code
app.get('/api/employees/:code', (req, res) => {
  const code = req.params.code;
  db.get('SELECT * FROM employees WHERE code = ?', [code], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  });
});

// Fallback: For unmatched routes, serve index.html (important for SPA routing)
app.get('/:path*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Port (for Render or local)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
