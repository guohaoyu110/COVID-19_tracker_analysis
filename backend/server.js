// "use strict";
const express = require("express");
const app = express();
var fetch = require("node-fetch");
let fs = require('fs');


let port = 6000;

async function getstates(){
    // const { NovelCovid } = require('novelcovid');
    // // const track = new NovelCovid();
    // let statedata = track.states();

    // statedata.then(function(result) {
    //     //console.log(result); // "Some User token"
    //     let data = JSON.stringify(result);
    //     //console.log(data);
    //     let fs = require('fs');
    //     fs.writeFile('state.json', data, () => {});
    // });
    const state_url = "https://corona.lmao.ninja/v2/states";
    // const response = await fetch(state_url);
    // const data = await response.json();
    // console.log('data: ', data);
    fetch(state_url).then(function(response) {
        return response.json();
    }).then(function (data){
        console.log(data);
        fs.writeFile('state.json',response.json(),()=>{});
    }).catch(function(e){
        console.log("Oops, error");
    });
    
}

// async function getcountries(){
//     const { NovelCovid } = require('novelcovid');
//     const track = new NovelCovid();
//     let countrydata = track.countries();

//     countrydata.then(function(result) {
//         //console.log(result); // "Some User token"
//         result.forEach((obj) => { delete obj.countryInfo; });
//         let data = JSON.stringify(result);
//         //console.log(data);
//         let fs = require('fs');
//         fs.writeFile('country.json', data, () => {});
//     });
// }

async function submit(){
    getstates();
    // getcountries();
    let update = setInterval(() => {
        getstates();
        // getcountries();
    }, 3600000); // update it every hour
}

submit();

app.listen(port, err => {
    console.log(`Listening on port: ${port}`);
    
})