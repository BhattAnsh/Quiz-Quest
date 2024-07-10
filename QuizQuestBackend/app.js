import express from 'express';
import { startServer } from './server.js';
import { connectdb } from './src/config/database.js';

const startApp = async() =>{
    await connectdb().then(() =>{
        startServer();
    });
}

startApp();