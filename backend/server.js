"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.static("static"));
app.use(express.static('public'));

app.use(cors());

let port = 6000;

function getstates(){
    const { NovelCovid } = require('novelcovid');
    const track = new NovelCovid();
    let statedata = track.states();

    statedata.then(function(result) {
        //console.log(result); // "Some User token"
        let data = JSON.stringify(result);
        //console.log(data);
        let fs = require('fs');
        fs.writeFile('public/state.json', data, () => {});
    });
}

function getcountries(){
    const { NovelCovid } = require('novelcovid');
    const track = new NovelCovid();
    let countrydata = track.countries();

    countrydata.then(function(result) {
        //console.log(result); // "Some User token"
        result.forEach((obj) => { delete obj.countryInfo; });
        let data = JSON.stringify(result);
        //console.log(data);
        let fs = require('fs');
        fs.writeFile('public/country.json', data, () => {});
    });
}

async function submit(){
    getstates();
    getcountries();
    let update = setInterval(() => {
        getstates();
        getcountries();
    }, 3600000); // update it every hour
}

submit();

// app.listen(port, err => {
//     console.log(`Listening on port: ${port}`);
    
// })
app.listen(port, () => console.log(`Listening on port: ${port}`);)