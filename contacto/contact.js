// models/contact.js (Modelo de Mongoose para Contacto)
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  email: { type: String, required: true },
  number: { type: Number, required: true },
  date: { type: Date, required: true },
  phone: { type: String, required: true },
  contactMethod: { type: String, required: true },
  message: { type: String, required: true }
});

module.exports = mongoose.model('Contact', contactSchema);
