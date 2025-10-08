const mongoose = require('mongoose');

// Esquema de cada presentación individual
const PresentacionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  departamento: { type: String, required: true },
  titulo: { type: String, required: true },
  hora: { type: String, required: true },
  ponente: { type: String, required: true },
}, { _id: false });

// Esquema para los departamentos dentro de un día
const DepartamentoSchema = new mongoose.Schema({
  nombre_departamento: { type: String, required: true },
  presentaciones: [PresentacionSchema],
}, { _id: false });

// ⚙️ Usamos Map para almacenar días como "fecha_9", "fecha_10", etc.
const DiasSchema = new mongoose.Schema({
  dias: {
    type: Map,
    of: [DepartamentoSchema], // cada día tiene un array de departamentos
    required: true,
  },
}, { _id: false });

// Esquema principal para cada bloque de presentaciones
const BloquePresentacionesSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  hora_grnl: { type: String, required: true },
  salon: { type: String, required: true },
  dia: DiasSchema, // contiene las claves "fecha_9", "fecha_10", etc.
}, { _id: false });

// Esquema raíz
const PresentacionesOralesSchema = new mongoose.Schema({
  presentaciones_orales: [BloquePresentacionesSchema],
}, { collection: 'eventos', timestamps: true });

module.exports = mongoose.model('PresentacionesOrales', PresentacionesOralesSchema);