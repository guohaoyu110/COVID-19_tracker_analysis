// "use strict";
const express = require("express");
const app = express();
const fetch = require("node-fetch");
const nodemailer = require('nodemailer');
const fs = require('fs');
const cors = require('cors')
var stateinfo = [];
var countryinfo = [];
var baseinfo = [];
var yesterdayCase;
var cumCases;
var cumRec;
var caCases;
var emailaddress = new Set();
var emailaddresslist = [];

const port = 7777; //cannot use ports like 6000

// get data used for presenting total numbers at'home'
async function getBase(){
    const base_url = "https://corona.lmao.ninja/v2/all";
    fetch(base_url).then(function(response) {
        return response.json();
    }).then(function (data){
        baseinfo = data;
    }).catch(function(e){
        console.log("Oops, error");
    });
}

// get data used for 'states'
async function getStates(){
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

// get data used for presenting countries at 'home'
async function getCountries(){
    const country_url = "https://corona.lmao.ninja/v2/countries";
    fetch(country_url).then(function(response) {
        return response.json();
    }).then(function (data){
        countryinfo = data;
    }).catch(function(e){
        console.log("Oops, error");
    });
}

// get data used for daily emails
async function getEmailData(){
    const country_url = "https://corona.lmao.ninja/v2/countries/US?yesterday=true&strict=true";
    const country_today_url = "https://corona.lmao.ninja/v2/countries/US";
    const ca_url = "https://corona.lmao.ninja/v2/states/California";
    
    fetch(country_url).then(function(response) {
        return response.json();
    }).then(function(result) {
        yesterdayCase = result.todayCases;
        //console.log(todaycases);
    }).catch(function(e){
        console.log("Oops, error");
    });

    fetch(country_today_url).then(function(response) {
        return response.json();
    }).then(function(result) {
        cumCases = result.cases;
        cumRec = result.recovered;
        //console.log(todaycases);
    }).catch(function(e){
        console.log("Oops, error");
    });

    fetch(ca_url).then(function(response) {
        return response.json();
    }).then(function(result) {
        caCases = result.cases;
        //console.log(todaycases);
    }).catch(function(e){
        console.log("Oops, error");
    });
}

// sender account information for email 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tianyi.usc@gmail.com',
    pass: '*****',
  }
});

// daily email format 
var mailOptions = {
  from: 'tianyi.usc@gmail.com',
  to: '',
  subject: 'COVID19 information update',
  text: 'test.'
};

// check whether the email address is valid
function isEmail(str) {
    var reg=/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
    return reg.test(str);
}

// send the emails
function sendEmails(){
    mailOptions.to = emailaddresslist;
    mailOptions.text = 'In USA: \n'+'Yesterday New Cases: '+yesterdayCase.toString()+"\n"+'Cumulative Cases: '
    +cumCases.toString()+"\n"+'Cumulative Recovered: '+cumRec.toString()+"\n\n"+'In California: \n'+
    'Cumulative Cases: '+caCases.toString()+"\n";
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    });
}

getBase();
getStates();
getCountries()
getEmailData();
 
// update the data once an hour
let update = setInterval(() => {
    getBase();
    getStates();
    getCountries()
    getEmailData();
    fs.writeFile('emaillist.json', JSON.stringify(emailaddresslist), () => {});
}, 3600000);

// send emails once a day
let autoSend = setInterval(() => {
    sendEmails();
}, 86400000);

// codes about local url for different functions
app.use(cors({origin: '*'}));
app.route('/base').get(function(req,res)
{
    console.log('receive a query requesting base data');
    res.status(200).send(baseinfo);
});

app.route('/state').get(function(req,res)
{
    console.log('receive a query requesting state data');
    res.status(200).send(stateinfo);
});

app.route('/country').get(function(req,res)
{
    console.log('receive a query requesting country data');
    res.status(200).send(countryinfo);
});

// get the email address of users who subscribe
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
    sendEmails();
    res.end();
});

app.listen(process.env.port||port, err => {
    console.log(`Listening on port: ${port}`);
})

module.exports = {
    isEmail: isEmail,
    getBase: getBase,
    getStates: getStates,
    getCountries: getCountries,
    stateinfo: stateinfo,
    countryinfo: countryinfo,
    baseinfo: baseinfo
};

