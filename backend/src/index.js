import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin1',
    password: '12345',
    database: 'inject',
});

app.use(bodyParser.urlencoded({ extended:true}));

app.use(express.json());
//middleware 
app.use(express.static('public'));

app.use(cors());

app.get("/", (req, res) => {
    res.json("hello there");
});

app.listen(8080, ()=>{
    console.log("CONNECTEED");
});


