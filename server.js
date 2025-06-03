const express = require('express');
const cors = require('cors');
const db = require('./database');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/employees', (req, res) => {
  db.all('SELECT code FROM employees', [], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

app.get('/api/employees/:code', (req, res) => {
  const code = req.params.code;
  db.get('SELECT * FROM employees WHERE code = ?', [code], (err, row) => {
    if (err) return res.status(500).send(err);
    if (!row) return res.status(404).send({ message: 'Not found' });
    res.json(row);
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
