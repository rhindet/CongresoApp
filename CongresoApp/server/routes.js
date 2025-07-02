
const express = require('express');
const router = express.Router();
const platicasController = require('./platicas/platicasController');


router.get('/simposios', platicasController.allSimposios);
router.get('/simposio/:id', platicasController.getSimposio);


module.exports = router;