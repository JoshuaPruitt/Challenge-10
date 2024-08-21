import express from 'express';
import Main from './main.js';

const PORT = process.env.port || 3001;
const app = express();

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//start the server


const main = new Main
main.startInit();

app.use((_req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});