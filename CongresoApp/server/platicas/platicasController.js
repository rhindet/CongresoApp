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

module.exports = {
  allSimposios,
};