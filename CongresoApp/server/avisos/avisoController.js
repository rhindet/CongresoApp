const programaCompletoSchema = require('../simposios/programaCompletoSchema');
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


const actualizarAviso = async (req, res) => {
  try {
    const { id } = req.params;  
    const {titulo,descripcion} = req.body
    
    const avisoActualizado = await Aviso.findByIdAndUpdate(
      id,
      {
        titulo,
        descripcion,
        hora_actualizacion: new Date()
      },
      { new: true } // retorna el nuevo documento actualizado
    );
if (!avisoActualizado) {
      return res.status(404).json({
        status: false,
        message: 'Aviso no encontrado'
      });
    }

    res.status(200).json({
      status: true,
      data: avisoActualizado
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar el aviso');
  }
};

const actualizarLinkYoutube = async (req, res) => {
  try {
    const { id } = req.params;
    const { videoUrl } = req.body;

    const doc = await programaCompletoSchema.findOne({
      $or: [
        { 'categorias.simposios.id': id },
        { 'categorias.platicas_magistrales.id': id },
        { 'categorias.presentaciones_orales.id': id },
        { 'categorias.talleres.id': id },
      ]
    });

    if (!doc) {
      return res.status(404).json({ status: false, message: 'Elemento no encontrado' });
    }

    let actualizado = false;

    for (const categoria of doc.categorias) {
      for (const tipo of ['simposios', 'platicas_magistrales', 'presentaciones_orales', 'talleres']) {
        for (const item of categoria[tipo]) {
          if (item.id === id) {
            item.link = videoUrl; // Asegúrate de que el esquema tenga ese campo
            actualizado = true;
            break;
          }
        }
      }
    }

    if (actualizado) {
      await doc.save();
      return res.json({ status: true, message: 'Link actualizado', data: doc });
    } else {
      return res.status(404).json({ status: false, message: 'No se encontró el elemento con ese ID en las categorías' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Error interno del servidor' });
  }
};




  const eliminarAviso = async (req, res) => {
  try {
    const { id } = req.params;  
    const avisoEliminado = await Aviso.findByIdAndDelete(id);

    if (!avisoEliminado) {
      return res.status(404).json({
        status: false,
        message: 'Aviso no encontrado'
      });
    }

    res.status(200).json({
      status: true,
      message: 'Aviso eliminado correctamente',
      data: avisoEliminado
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar el aviso');
  }
};



module.exports = {
  getAvisos,
  crearAviso,
  actualizarAviso,
  eliminarAviso,
  actualizarLinkYoutube
}
