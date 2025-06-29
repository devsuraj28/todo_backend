//import external modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();


const server = express();

//Import Custom Modules
const taskRouter = require('./routers/task');


//Database
dataBaseConnection().catch(error => console.log(error));

async function dataBaseConnection() {
    await mongoose.connect(process.env.MONGO_URI).then(() => console.log("Database Connected Successfully")).catch(error => console.log(error));
}

//Middlewares
server.use(express.json());
server.use(morgan('dev'));

//Routes -- Api Endpoints --
server.use('/api/task', taskRouter.router);

// For local development
if (process.env.NODE_ENV !== 'production') {
    server.listen(process.env.PORT || 6000, (req, res) => {
        console.log("Server Started");
    });
}

// Export for Vercel
module.exports = server;
