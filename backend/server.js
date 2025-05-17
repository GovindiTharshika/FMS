const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: 'root',
  database: 'patchorbit'
});


app.get('/api/servers/count', (req, res) => {
  const sql = 'SELECT COUNT(*) AS total FROM servers';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching server count:', err);
      return res.status(500).json({ error: 'Failed to fetch server count' });
    }
    res.json({ total: result[0].total });
  });
});

app.post('/api/servers', (req, res) => {
  const { hostname, ipAddress, osType } = req.body;
  const sql = 'INSERT INTO servers (hostname, ip_address, os_type) VALUES (?, ?, ?)';
  db.query(sql, [hostname, ipAddress, osType], (err, result) => {
    if (err) {
      console.error('Error inserting server:', err);
      return res.status(500).json({ error: 'Failed to add server' });
    }
    res.json({ message: 'Server added successfully', serverId: result.insertId });
  });
});



app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});