const magistralesSchema = require('../simposios/magistralesSchema');
const oralPresentationsSchema = require('../simposios/oralPresentationsSchema');
const programaCompletoSchema = require('../simposios/programaCompletoSchema');
const Simposio = require('../simposios/simposioSchema');
const talleresSchema = require('../simposios/talleresSchema');
const fs = require('fs');


const allSimposios = async (req, res) => {
  try {
  const simposios = await programaCompletoSchema.find().lean(); // lean NO altera los _id    console.log(simposio)
    console.log(simposios)

  res.json({
      status:true,
      data:simposios[0].categorias[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los simposios');
  }
};

const eventos = async (req, res) => {
  try {
  const simposios = await programaCompletoSchema.find().lean(); // lean NO altera los _id    console.log(simposio)
  const eventos = []
  eventos.push(simposios[0].categorias[0].simposios)
  eventos.push(simposios[0].categorias[1].platicas_magistrales)
  console.log(eventos)
  res.json({
      status:true,
      data:eventos
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los simposios');
  }
};


const allMagistrales = async (req, res) => {
  try {
    const magistrales = await programaCompletoSchema.find();

    res.json({
      status:true,
      data:magistrales[0].categorias[1]      
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los simposios');
  }
};

const allOralPresentations= async (req, res) => {
   try {
  const PO = await programaCompletoSchema.find().lean(); // lean NO altera los _id    console.log(simposio)
  //console.log(simposios[0].categorias[0])  
  console.log(PO[0].categorias[2])
  res.json({
      status:true,
      data:PO[0].categorias[2]
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener las platicas orales');
  }
};

const allTalleres= async (req, res) => {
   try {
  const PO = await programaCompletoSchema.find().lean(); // lean NO altera los _id    console.log(simposio)
  //console.log(simposios[0].categorias[0])  
  console.log(PO[0].categorias[1])
  res.json({
      status:true,
      data:PO[0].categorias[1]
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener las platicas orales');
  }
};

const getSimposio = async (req, res) => {
  try {
    const { id } = req.params;
    const documento = await programaCompletoSchema.findOne().lean();

    if (documento && documento?.categorias[0]) {
        
        const simposio =  documento?.categorias[0].simposios.find(cat => {
                  //console.log("cat.id:", cat.id);
                // console.log("id:", id);
                  return cat.id=== id;
                });

          if (!simposio) {

          res.json({
                status:false,
                data:[]
              });

          }

        res.json({
          status:true,
          data:simposio
        });


    }
    else{
       res.json({
          status:false,
          data:[]
        });

     }
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los simposios');
  }
  
};

const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const simposios = await programaCompletoSchema.find().lean(); 
      const eventos = [
        ...simposios[0].categorias[0].simposios,
        ...simposios[0].categorias[1].platicas_magistrales
      ];


    if (eventos && eventos) {
        
        const simposio =  eventos?.find(cat => {
                  //console.log("cat.id:", cat.id);
                // console.log("id:", id);
                  return cat.id=== id;
                });

          if (!simposio) {

          res.json({
                status:false,
                data:[]
              });

          }

        res.json({
          status:true,
          data:simposio
        });


    }
    else{
       res.json({
          status:false,
          data:[]
        });

     }
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los simposios');
  }
  
};



const getMagistrales = async (req, res) => {
  try {
    const { id } = req.params;
    const documento = await programaCompletoSchema.findOne().lean();

    //console.log(documento?.categorias[1]);
    //console.log("Entro a magistrales")
    

    if (documento && documento?.categorias[1]) {

      //console.log(documento?.categorias[1])

       const magistral =  documento?.categorias[1].platicas_magistrales.find(cat => {
                  //console.log("cat.id:", cat.id);
                // console.log("id:", id);
                  return cat.id=== id;
                });

       
      if (!magistral) {
        return res.json({
          status: false,
          data: []
        });
      }

      return res.json({
        status: true,
        data: magistral
      });
    } else {
      return res.json({
        status: false,
        data: []
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error al obtener las pláticas magistrales');
  }
};



const getOralPresentation = async (req, res) => {
  try {
    const { id } = req.params;
    const documento = await programaCompletoSchema.findOne().lean();

    console.log("Entrooo")
    console.log(documento?.categorias)
    
    if (documento && documento?.categorias[0]) {

      //console.log(documento?.categorias[1])

       const p_oral =  documento?.categorias[2].presentaciones_orales.find(cat => {
                   console.log("cat.id:", cat.id);
                   console.log("id:", id);
                  return cat.id=== id;
                });
       
      if (!p_oral) {
        return res.json({
          status: false,
          data: []
        });
      }

      return res.json({
        status: true,
        data: p_oral
      });
    } else {
      return res.json({
        status: false,
        data: []
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error al obtener las presentaciones orales');
  }
};

const getTaller = async (req, res) => {
  try {
    const { id } = req.params;
    const documento = await programaCompletoSchema.findOne().lean();

    //console.log(documento?.categorias[1]);
    //console.log("Entro a magistrales")
    

    if (documento && documento?.categorias[3]) {

      //console.log(documento?.categorias[1])

       const taller =  documento?.categorias[3].talleres.find(cat => {
                  //console.log("cat.id:", cat.id);
                // console.log("id:", id);
                  return cat.id=== id;
                });

       
      if (!taller) {
        return res.json({
          status: false,
          data: []
        });
      }

      return res.json({
        status: true,
        data: taller
      });
    } else {
      return res.json({
        status: false,
        data: []
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error al obtener los talleres');
  }
};







module.exports = {
  allSimposios,
  allMagistrales,
  allOralPresentations,
  allTalleres,
  getSimposio,
  getMagistrales,
  getTaller,
  getOralPresentation,
  eventos,
  getEvent

};