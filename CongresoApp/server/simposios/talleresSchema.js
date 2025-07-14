const mongoose = require('mongoose');

const ProgramaSchema = new mongoose.Schema({
  horario: String,
  actividad: String,
  ponentes: [String], // o puedes hacer otro esquema si los ponentes tienen más datos
});

const TalleresSchema = new mongoose.Schema({
  departamento: String,
  nombre: String,
  objetivo: String,
  dirigido: String,
  requisito: String,
  jefe: String,
  coordinador: String,
  moderador: String,
  hora_inicio: Date,
  hora_fin: Date,
  salon: String,
  capacidad: Number,
  extra: String,
  programa: [ProgramaSchema]
}, { collection: 'eventos' });

module.exports = mongoose.model('Talleres', TalleresSchema);