const mongoose = require('mongoose');

// Subdocumento: cada bloque dentro del arreglo `programa`
const ProgramaSchema = new mongoose.Schema({
  horario: String,
  actividad: String,
  ponentes: [String],
}); // <== Ya no tiene { _id: false }

// Subdocumento: cada elemento dentro de `simposios`, `platicas_magistrales`, etc.
const ItemSchema = new mongoose.Schema({
  id: String,
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
}); // <== Ya no tiene { _id: false }

// Categorías
const CategoriaFlexibleSchema = new mongoose.Schema({
  simposios: [ItemSchema],
  platicas_magistrales: [ItemSchema],
  presentaciones_orales: [ItemSchema],
  talleres: [ItemSchema]
}); // <== Ya no tiene { _id: false }

// Esquema principal
const ProgramaCompletoSchema = new mongoose.Schema({
  categorias: [CategoriaFlexibleSchema]
}, { collection: 'eventos' });

module.exports = mongoose.model('ProgramaCompleto', ProgramaCompletoSchema);