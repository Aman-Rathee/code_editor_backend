const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
require('dotenv').config()
const cors = require('cors');
const { executeCode } = require('./judge0');
// const { code_execution } = require('./abc');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

executeCode()
// Database connection
// local database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: 'code_snippets'
// });

// connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to MySQL database');
// });


// online database
// const pool = mysql.createPool({
//     host: process.env.Host,
//     port: process.env.Port,
//     user: process.env.User,
//     password: process.env.Password,
//     database: 'code_snippets',
//     connectionLimit: 10 // Adjust as needed
//   });

// Listen for the 'connect' event
// pool.on('connection', () => {
//     console.log('Database connected');
// });


// API endpoints
// Submitting a new snippet
app.post('/api/snippet', (req, res) => {
    const { username, language, stdin, code } = req.body;
    const snippet = { username, language, stdin, code };
    pool.query('INSERT INTO snippets SET ?', snippet, (err, result) => {
        if (err) throw err;
        console.log('New snippet added:', result.insertId);
        res.sendStatus(201);
    });
});

// Fetching all code snippets
app.get('/api/snippets', (req, res) => {
    pool.query('SELECT * FROM snippets', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
