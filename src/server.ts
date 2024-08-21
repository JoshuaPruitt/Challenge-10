import express from 'express';
import { QueryResult } from 'pg';
import {pool, connectToDb} from './connection.js';

//connect to the database
await connectToDb();

const PORT = process.env.port || 3001;
const app = express();

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

pool.query('SELECT * FROM employee', (err: Error, result: QueryResult) => {
    if(err){
        console.log(err);
    } else if (result){
        console.log(result.rows);
    }
})

app.use((_req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});