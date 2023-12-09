//mongodb+srv://anggemarigi:panchito20@cluster.jvk5kiy.mongodb.net/?retryWrites=true&w=majority

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI);

const contactSchema = new mongoose.Schema({
    email: String,
    number: Number,
    date: Date,
    phone: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/submit-form', (req, res) => {
    const newContact = new Contact({
        email: req.body.email,
        number: req.body.number,
        date: req.body.date,
        phone: req.body.phone,
        message: req.body.message
    });

    newContact.save().then(() => console.log('Contacto guardado'));
    
    //enviar una confirmación al usuario
    res.send('Datos recibidos y guardados con éxito.');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
