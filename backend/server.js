// "use strict";
const express = require("express");
const app = express();
var fetch = require("node-fetch");
let fs = require('fs');

let port = 6000;

async function getstates(){
    const state_url = "https://corona.lmao.ninja/v2/states";
    // const response = await fetch(state_url);
    // const data = await response.json();
    // console.log('data: ', data);
    fetch(state_url).then(function(response) {
        return response.json();
    }).then(function (data){
        //console.log(data);
        fs.writeFile('state.json',JSON.stringify(data),()=>{});
    }).catch(function(e){
        console.log("Oops, error");
    });
    
}

async function getcountries(){
    const country_url = "https://corona.lmao.ninja/v2/countries";
    
    fetch(country_url).then(function(response) {
        return response.json();
    }).then(function(result) {
        //console.log(result); // "Some User token"
        result.forEach((obj) => { delete obj.countryInfo; });
        let data = JSON.stringify(result);
        //console.log(data);
        let fs = require('fs');
        fs.writeFile('country.json', data, () => {});
    }).catch(function(e){
        console.log("Oops, error");
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

app.listen(port, err => {
    console.log(`Listening on port: ${port}`);
    
})
