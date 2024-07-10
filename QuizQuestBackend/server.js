import express from 'express';
import setUpRoutes from './src/routes/main.route.js'
const  app = express();
app.use(express.json());

export const startServer = () =>{
    app.listen('3000', ()=>{
        setUpRoutes(app);
        console.log("Server Started");
    });
};
