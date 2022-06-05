import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import connectDatabase from './database/connectDatabase';

dotenv.config();
const app: Application = express();

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ msg: 'Connect Successfully' })
})

const port = process.env.PORT || 5000;
const start = async () => {
    try {
        // Connect DB
        await connectDatabase(process.env.MONGO_URL as string);
        //
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}
start();

