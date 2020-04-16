
function getstates(){
    const { NovelCovid } = require('novelcovid');
    const track = new NovelCovid();
    let statedata = track.states();

    statedata.then(function(result) {
        //console.log(result); // "Some User token"
        let data = JSON.stringify(result);
        console.log(data);
        let fs = require('fs');
        fs.writeFile('state.json', data, () => {});
    });
}

function getcountries(){
    const { NovelCovid } = require('novelcovid');
    const track = new NovelCovid();
    let countrydata = track.countries();

    countrydata.then(function(result) {
        console.log(result); // "Some User token"
        result.forEach((obj) => { delete obj.countryInfo; });
        let data = JSON.stringify(result);
        console.log(data);
        let fs = require('fs');
        fs.writeFile('country.json', data, () => {});
    });
}

async function submit(){
    getstates();
    getcountries();
    let update = setInterval(() => {
        getstates();
        getcountries();
    }, 3600000);
}

submit();
