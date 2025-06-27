const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db'); 

require('dotenv').config();

const app = express();
connectDB(); 

app.get('/', async (req, res) => {
  try {
    const simposios = await mongoose.connection.db.collection('simposios_anidados').find().toArray();
    res.json(simposios);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

