const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db'); 
const routes = require('./routes');
const cors = require('cors');

require('dotenv').config();

const app = express();
connectDB(); 
app.use(cors());


app.use(express.json());
app.use('/api/platicas', routes);

const PORT = 8003;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

