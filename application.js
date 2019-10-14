const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const postRoutes = require('./Routes/postCommands');
app.use('/',postRoutes);
app.use('/update',postRoutes);
app.use('/add',postRoutes);
app.use('/customers',postRoutes);
app.use('/registerCustomer',postRoutes);

app.use('/registerAdmin',postRoutes); // all are these nessessary ??
app.use('/admins',postRoutes);
app.use('/admins/name',postRoutes);
app.use('/editAdmin/:adminId',postRoutes);
app.use('/deleteAdmin/:adminId',postRoutes);

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true , useUnifiedTopology: true },
    ()=>{ console.log('Connected to DB');
});

app.listen(7000);