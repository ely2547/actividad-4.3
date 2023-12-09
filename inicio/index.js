const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(express.static('public'));

const users = [
    { username: 'admin', password: '1234' },
    { username: 'user', password: 'abcd' }
];

const secret = 'secret';

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ username }, secret, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
});

app.get('/search', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Token inválido o expirado' });
        } else {
            const query = req.query.q;
            axios.get(`https://api.github.com/search/users?q=${query}`)
            .then(response => {
                res.json(response.data);
            })
            .catch(error => {
                res.status(500).json({ message: 'Error al buscar usuarios en GitHub' });
            });
        }
    });
});

app.get('/contacto', (req, res) => {
    res.redirect('http://localhost:3001/');
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

        
