const mongoose = require('mongoose');

const avisoSchema = new mongoose.Schema({
  titulo: String,
  descripcion:String,
  hora_creacion: Date,
  hora_actualizacion: Date
});

module.exports = mongoose.model('Aviso', avisoSchema);
