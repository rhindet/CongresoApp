const Simposio = require('../simposios/simposioSchema');

const allSimposios = async (req, res) => {
  try {
    const simposios = await Simposio.find();
    res.json({
      status:true,
      data:simposios
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los simposios');
  }
};


const getSimposio = async (req, res) => {
  try {
      const { id } = req.params;
    const simposio = await Simposio.findById(id);
     if (!simposio) {
      res.json({
            status:false,
            data:simposio
          });
      }

    res.json({
      status:true,
      data:simposio
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los simposios');
  }
};

module.exports = {
  allSimposios,
  getSimposio
};