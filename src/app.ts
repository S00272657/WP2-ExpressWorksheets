import express, { Application, Request, Response} from "express" ; 
import carRoutes from './routes/cars';
import { logRoute } from "./middleware/log.middleware";
import { swaggerSpec } from "./config/swagger";
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

//const PORT = env.port

export const app: Application = express();   

app.use(cors());
app.use(express.json());

app.use(
'/api-docs',
swaggerUi.serve,
swaggerUi.setup(swaggerSpec)
)

// telling application to use this router
//any request to /api/v1/cars will be sent to the appropriate router.
app.use('/api/v1/cars', logRoute, carRoutes);
//for auth add: authenticateKey

// logging v1
// app.use((req, _res, next) => {  

//      console.log(`${req.method} ${req.originalUrl}`); 

//     next(); 

// }); 



//routes
app.get("/pong", (_req : Request, _res: Response) => {
    console.log("Received request to /pong");
    throw new Error("Simulated error in /pong route");
});

app.get("/pung", async (_req : Request, _res: Response) => {
    console.log("Received request to /pung");
     throw new Error("Simulated error in /pung route");
});

app.get("/ping", async (_req : Request, res: Response) => { 

    res.json({ 

    message: "hello from Dominik" 

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



// const startServer = async () => {
//   await connectDB();

//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });

// };

// startServer();



 
// app.listen(PORT, () => { 

// console.log("Server is running on port", PORT); 

// }); 