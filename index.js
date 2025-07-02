// Import external modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const taskRouter = require('./routers/task');
const server = express();

// Mongoose connection options
const mongoOptions = {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 5,
};

// Disable mongoose command buffering
mongoose.set('bufferCommands', false);

// Middleware (setup before routes!)
server.use(express.json());
server.use(morgan('dev'));

// Routes
server.use('/api/task', taskRouter.router);

// DB Connection + Start server
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI, mongoOptions);
    console.log('✅ Database Connected Successfully');

    // MongoDB Events
    mongoose.connection.on('error', (error) => {
      console.error('❌ MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });

    // Start server only after DB is connected
    const PORT = process.env.PORT || 6000;
    server.listen(PORT, () => {
      console.log(`🚀 Server started on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Failed to connect to database:', error.message);
    process.exit(1);
  }
}

// Run the startup
startServer();

// Export for Vercel or testing
module.exports = server;
