const Aviso = require('./avisoSchema'); 

const getAvisos = async (req, res) => {
  try {
    const avisos = await Aviso.find().sort({ hora_creacion: -1 }).lean();
    res.json({
      status: true,
      data: avisos
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los avisos');
  }
};

const crearAviso = async (req, res) => {
  try {
    const aviso = req.body;
    console.log("Entro Avisos", aviso);
    
    const nuevoAviso = new Aviso({

      titulo: aviso.titulo.titulo,
      descripcion: aviso.titulo.descripcion,
      hora_creacion: new Date(),
      hora_actualizacion: new Date()
    });
    console.log("Nuevo Aviso", nuevoAviso);

    const avisoGuardado = await nuevoAviso.save();

    res.status(201).json({
      status: true,
      data: avisoGuardado
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear el aviso');
  }
};

module.exports = {
  getAvisos,
  crearAviso
};
