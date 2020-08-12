const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');

mongoose.connect(' mongodb://localhost:27017/condominio', { useNewUrlParser: true });

const userRoutes = require('./routes/UserRoute');
const condominiumRoutes = require('./routes/CondominiumRoute');

// Prevent CORS errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
  });

  app.listen(3000, function() {
    console.log("Server is running");
  });

  app.use('/user', userRoutes);
  app.use('/condominium', condominiumRoutes);