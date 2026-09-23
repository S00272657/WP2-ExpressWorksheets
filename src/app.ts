import express, {Application, Request, Response} from "express" ; 
import { env } from "./config/env";
import { connectDB } from "./config/database"
import carRoutes from './routes/cars';

const PORT = env.port

const app: Application = express(); 

// telling application to use this router
//any request to /api/v1/cars will be sent to the appropriate router.
app.use('/api/v1/cars', carRoutes);


// logging 
app.use((req, _res, next) => {  

     console.log(`${req.method} ${req.originalUrl}`); 

    next(); 

}); 

//routes
app.get("/ping", async (_req : Request, res: Response) => { 

    res.json({ 

    message: "hello from Dominik " 

    }); 

}); 

app.get('/bananas', async (_req : Request, res: Response) => { 

    res.json({ 

    message: "this is bananas", 

    }); 

});

app.get('/hello', async (_req : Request, res: Response) => { 

    res.json({ 

    message: "this is my own route", 

    }); 

});


const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

};

startServer();

 
// app.listen(PORT, () => { 

// console.log("Server is running on port", PORT); 

// }); 