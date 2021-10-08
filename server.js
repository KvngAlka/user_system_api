import express from 'express';
import cors from 'cors';
import router from './routes.js';

//configuration
const app = express();
const port = 8000;

//middleware
app.use(express.json());
app.use(cors());


app.use('/app/api/',router)

//database


//route -->

//listener
app.listen(port,()=> console.log(`listening on http://localhost:${port}`))