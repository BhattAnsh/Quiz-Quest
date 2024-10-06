import express from 'express';
import cors from 'cors';
import setUpRoutes from './src/routes/main.route.js'
const  app = express();
app.use(express.json());

const allowedOrigins = [
    'http://localhost:5173/',
];

app.use(cors({
    origin: allowedOrigins,  
    credentials: true,  
}));

export const startServer = () =>{
    app.listen('3000', ()=>{
        setUpRoutes(app);
        console.log("Server Started");
    });
};
