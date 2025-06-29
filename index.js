//import external modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const server = express();

//Import Custom Modules
const taskRouter = require('./routers/task');


//Database
dataBaseConnection().catch(error => console.log(error));

async function dataBaseConnection() {
    await mongoose.connect('mongodb+srv://ersurajcse:hGv91TnTTyMyMjom@node-tut-cluster.gdivr.mongodb.net/TodoDatabase?retryWrites=true&w=majority&appName=Node-Tut-Cluster').then(() => console.log("Database Connected Successfully")).catch(error => console.log(error));
}

//Middlewares
server.use(express.json());
server.use(morgan('dev'));

//Routes -- Api Endpoints --
server.use('/api/task', taskRouter.router);

server.listen(6000, (req, res) => {
    console.log("Server Started");
});
