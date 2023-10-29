const mongoose = require('mongoose');

const expedienteSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  tipoSangre: {
    type: String,
    required: true,
  },
  nombres: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  dpi: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  convenio: String,
  sexo: {
    type: String,
    enum: ['Masculino', 'Femenino', 'Otro'],
    required: true,
  },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  departamento: String,
  municipio: String,
  telefono: String,
  actividadProfesion: String,
  alergias: String,
});

const Expediente = mongoose.model('Expediente', expedienteSchema);

module.exports = Expediente;

