
const express = require('express');
const router = express.Router();
const platicasController = require('./platicas/platicasController');

router.get('/eventos', platicasController.eventos);
router.get('/evento/:id', platicasController.getEvent);


router.get('/simposios', platicasController.allSimposios);
router.get('/simposio/:id', platicasController.getSimposio);

router.get('/magistrales', platicasController.allMagistrales);
router.get('/magistral/:id', platicasController.getMagistrales);

router.get('/oralPresentations', platicasController.allOralPresentations);
router.get('/oralPresentation/:id', platicasController.getOralPresentation);

router.get('/talleres', platicasController.allTalleres);
router.get('/taller/:id', platicasController.getTaller);






module.exports = router;