"use strict";
const express = require("express");
const app = express();
const fetch = require("node-fetch");
let fs = require('fs');
var cors = require('cors')
var stateinfo = [];
var emailaddress = [];

const port = 7777; //cannot use ports like 6000


async function getstates(){
    const state_url = "https://corona.lmao.ninja/v2/states";
    // const response = await fetch(state_url);
    // const data = await response.json();
    // console.log('data: ', data);
    fetch(state_url).then(function(response) {
        return response.json();
    }).then(function (data){
        //console.log(data);
        //fs.writeFile('public/state.json',JSON.stringify(data),()=>{});
        stateinfo = data;
    }).catch(function(e){
        console.log("Oops, error");
    });
    
}

/*
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
        fs.writeFile('public/country.json', data, () => {});
    }).catch(function(e){
        console.log("Oops, error");
    });
}
 */
getstates();

let update = setInterval(() => {
    getstates();
}, 3600000); // update it every hour

app.use(cors({origin: '*'}));
app.route('/state').get(function(req,res)
{
    console.log('receive a query');
    res.status(200).send(stateinfo);
});
app.route('/email/:address').get(function(req,res)
{
    let address = req.params.address;
    emailaddress.push(address);
    res.send(address);
});
app.get('/',function(req,res){
    res.send('Welcome to COVID19');
});

app.listen(port, err => {
    console.log(`Listening on port: ${port}`);
})