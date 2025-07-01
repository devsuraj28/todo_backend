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
    try {
        const mongoOptions = {
            serverSelectionTimeoutMS: 30000, // 30 seconds timeout
            socketTimeoutMS: 45000, // 45 seconds socket timeout
            maxPoolSize: 10, // Maintain up to 10 socket connections
            minPoolSize: 5, // Maintain a minimum of 5 socket connections
        };
        
        // Disable mongoose buffering
        mongoose.set('bufferCommands', false);
        
        await mongoose.connect(process.env.MONGO_URI, mongoOptions);
        console.log("Database Connected Successfully");
        
        // Handle connection events
        mongoose.connection.on('error', (error) => {
            console.error('MongoDB connection error:', error);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        
        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected');
        });
        
    } catch (error) {
        console.error('Failed to connect to database:', error.message);
        process.exit(1);
    }
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
