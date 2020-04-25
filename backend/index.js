// "use strict";
const express = require("express");
const app = express();
const fetch = require("node-fetch");
const nodemailer = require('nodemailer');
const fs = require('fs');
const cors = require('cors')
var stateinfo = [];
var todaycases = 0;
var totalcases = 0;
var emailaddress = new Set();
var emailaddresslist = [];

const port = 7777; //cannot use ports like 6000

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tianyi.usc@gmail.com',
    pass: '20120823zhima',
  }
});

var mailOptions = {
  from: 'tianyi.usc@gmail.com',
  to: '',
  subject: 'COVID19 information update',
  text: 'test.'
};

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

function isEmail(str) {
    var reg=/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
    return reg.test(str);
}

function sendemails(){
    mailOptions.to = emailaddresslist;
    mailOptions.text = 'In USA:'+'todayCases: '+todaycases.toString()+" "+'totalCases: ' + totalcases.toString();
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    });
}

async function getcountries(){
    const country_url = "https://corona.lmao.ninja/v2/countries/usa?yesterday=true&strict=true";
    
    fetch(country_url).then(function(response) {
        return response.json();
    }).then(function(result) {
        totalcases = result.cases;
        todaycases = result.todayCases;
        //console.log(todaycases);
    }).catch(function(e){
        console.log("Oops, error");
    });
}

getstates();
getcountries();
 
let update = setInterval(() => {
    getstates();
    getcountries();
    fs.writeFile('emaillist.json', JSON.stringify(emailaddresslist), () => {});
}, 3600000); // update it every hour

let autoSend = setInterval(() => {
    sendemails();
}, 86400000);

app.use(cors({origin: '*'}));
app.route('/state').get(function(req,res)
{
    console.log('receive a query');
    res.status(200).send(stateinfo);
});

app.route('/email/:address').get(function(req,res)
{
    let address = req.params.address;
    if (!isEmail(address)) {
        console.log('invalid address');
        res.status(200).send('invalid');
    }
    if (isEmail(address) && !emailaddress.has(address))
    {
        emailaddress.add(address);
        emailaddresslist.push(address);
        console.log(address);
        //res.send('valid');
    }
    res.end();
});

app.route('/notify').get(function(req,res)
{
    sendemails();
    res.end();
});

app.get('/',function(req,res){
    res.send('Welcome to COVID19');
});

app.listen(port, err => {
    console.log(`Listening on port: ${port}`);
})
