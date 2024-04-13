const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to mysql db');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(500).send("username and password are required");
    }
    const checkUserExist = 'Select * FROM users WHERE username = ?';
    connection.query(checkUserExist, [username], async (err, result) => {
        if (err) {
            res.status(500).send("error in sign up");
            return;
        }
        if (result.length > 0) {
            res.status(400).send('user already exists');
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = 'INSERT INTO users (username, password) VALUES (?,?)';
        connection.query(sql, [username, hashedPassword], (err, result) => {
            if (err) {
                res.status(500).send("error in sign up");
                return;
            }
            res.status(200).send("Sign up successfull !");
        });
    })

});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ? ";
    connection.query(sql, [username, password], async (err, result) => {
        if (err) {
            res.status(500).send('error in login');
            return;
        }
        if (result.length === 0) {
            res.status(400).send("username or password invalid");
            return;
        }
        const user = result[0];
        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            res.status(400).send('username or password invalid');
        }
        res.status(200).send("Login successfull !");
    })
});

app.listen(port, () => {
    console.log('port running on 3000');
});