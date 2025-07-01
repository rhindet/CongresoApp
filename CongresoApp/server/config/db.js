require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Atlas conectado correctamente');
  } catch (err) {
    console.error('❌ Error al conectar con MongoDB Atlas:', err.message);
    process.exit(1);
  }
};


module.exports = connectDB;
