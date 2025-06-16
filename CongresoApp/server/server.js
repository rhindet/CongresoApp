require('dotenv').config(); 
const express = require('express');
const connectDB = require('./config/db'); 

const app = express();

connectDB(); 

app.listen(process.env.PORT, () =>
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
);

app.get('/', (req, res) => {
  res.send('BD conectada');
});

