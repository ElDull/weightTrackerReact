const express = require("express");
const cors = require("cors");
const mysql = require('mysql2');
const config = require('./config.js')
require('dotenv').config()
const connection = mysql.createConnection(config)


const generateFakeSequence = () => {
    let dateObject = {
        year: 2022,
        month: 0,
        day : 23
    }
    
    let [bottomLimit, topLimit] = [82, 84];
    const numList = []
    for (let i=0; i<30;i++ ){
        let randNum = parseFloat((Math.random()*(topLimit-bottomLimit+1)+bottomLimit).toPrecision(3));
        let d = new Date(dateObject.year, dateObject.month, dateObject.day).toLocaleDateString();
        numList.push([d,randNum])
        

        dateObject.day += 1;
        bottomLimit -= 1;
        topLimit -= 0.5;
    } 
    connection.query(`INSERT INTO weights(date, weight) VALUES ? `, [numList], (err, results, fields) => {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row inserted: ${results.affectedRows}`)
    });
};

const app = express();
app.use(cors());
app.use(express.json())
app.options('*', cors())


app.listen(5000, ()=> {
    console.log("Server has started on port 5000")
});

// Display all weights
app.get("/weights", (req,res) => {
    connection.query("SELECT * FROM weights" ,(err, results) => {
        if (err){
            res.json({error: err.message})
            return;
        } else {
            res.json(results);
        }
    })
})
// Update the weights table with new weights
app.post("/addWeight", (req,res) => {
    console.log(req.body)
    connection.query("INSERT INTO weights(id, date, weight) VALUES (?, ?, ?)", [req.body.id, req.body.date, req.body.weight], (err, results) => {
        if (err){
            console.error(err)
            res.json({error: err.message})
        } else {
            console.log(results)
            res.json({success: "Successfully updated table"})
        }
    })
})

app.get("/removeWeight", (req,res) => {
    connection.query("DELETE FROM weights ORDER BY id DESC LIMIT 1", (err, results) => {
        if (err) {
            res.json({error: err.message})
        } else {
            res.json({success: "Successfully removed row"})
        }
    })
})

