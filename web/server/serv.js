import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import { spawn } from 'child_process';

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Welcome to my webPage")
});

app.get('/quests', (req, res) =>{
    fs.readFile('projecte.json', 'utf8', (err, data) =>{
        try{ const jsonData = JSON.parse(data);
            res.json(jsonData);
        }catch (parseErr) {
            console.error("Error parseando el archivo:", parseErr);
        }
    })
})

app.listen(port, () =>{
    console.log('Servidor escontant a http://localhost:3000/quests')
});


