const fs = require('fs');

let globalDataUrl1 = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/`
  +`0${new Date().getMonth()+1}-${new Date().getDate()}-2020.csv`;
  
let globalDataUrl2 = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/`
  +`0${new Date().getMonth()+1}-${new Date().getDate()-1}-2020.csv`;

let globalDataUrl;

function isFileExisted(){
    return new Promise(function(resolve, reject){
        fs.access(globalDataUrl1, (err) => {
            if (err){
                globalDataUrl1 = globalDataUrl2;
                console.log('globalDataUrl: ', globalDataUrl);
                resolve(globalDataUrl1);
            }
            else {
                globalDataUrl1 = globalDataUrl11;
                console.log('globalDataUrl: ', globalDataUrl);
                resolve(globalDataUrl);
            }
        })
    })
}
(async()=> {
    try{
        var res = await isFileExisted();
        console.log('res: ', res);
    }catch(err){
        console.log(error);
  }
})

isFileExisted();