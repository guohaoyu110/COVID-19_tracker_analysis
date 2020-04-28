import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  baseUrl = 'http://localhost:7777/base';
  countryUrl = 'http://localhost:7777/country'; 
  tempCnt : any;
  tempCnt1 : any;
  totalConfirmed1 = 0;
  totalActive1 = 0;
  totalDeaths1 = 0;
  totalRecovered1 = 0;
  // totalConfirmed = 0;
  // totalActive = 0;
  // totalDeaths = 0;
  // totalRecovered = 0;
  loading = true;
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart'
  }
  GeoChart: GoogleChartInterface = {
    chartType: 'GeoChart'
  }
  constructor( private http: HttpClient) { }


  
  ngOnInit(): void {
    this.getWorldData();
    this.getCountryData();
  }
  getCountryData(){
    this.http.get(this.countryUrl).subscribe( response => {
      this.tempCnt1 = response;
      this.initChart('c');
      this.loading = false;
    })
  }
  getWorldData(){
    this.http.get(this.baseUrl).subscribe(response => {
      this.tempCnt = response;
      console.log('tempCnt: ', this.tempCnt);
      //this.countryArray = tempCnt;
      this.totalConfirmed1 = this.tempCnt.cases;
      this.totalActive1 = this.tempCnt.active;
      this.totalRecovered1 = this.tempCnt.recovered;
      this.totalDeaths1 = this.tempCnt.deaths;
    });
  }

  updateChart(input: HTMLInputElement) {//log the value of input
    console.log(input.value);
    this.initChart(input.value)
  }

  initChart(caseType: string) {
  // push the data of 
    let datatable = [];
    datatable.push(["Country", "Cases"])
    
    this.tempCnt1.forEach(cs => {
      let value :number ; // must be number type cannot be let value = ""
      if (caseType == 'c')
        if (cs.cases > 3000)  // only show over 3000 cases
          value = cs.cases
          
      if (caseType == 'a')
        if (cs.active > 200)
          value = cs.active
      if (caseType == 'd')
        if (cs.deaths > 50)
          value = cs.deaths
          
      if (caseType == 'r')
        if (cs.recovered > 300)
            value = cs.recovered
        

        datatable.push([
            cs.country, value
          ])
    })
    console.log(datatable);


    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,
      //firstRowIsData: true,
       // use options to set the piechart
      options: {
        height: 500, 
        animation:{
          duration: 1000,
          easing: 'out',
        },
      },
    };
    
    google.charts.load('current', {
      'packages':['geochart'],
      'mapsApiKey': 'AIzaSyC8g11Xy1-jvoEOkXiFMEVrXhOstXcilQI'
    });

    google.charts.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap() {
      var data = google.visualization.arrayToDataTable(datatable);
      var options = {
        colorAxis: {colors: ['#4374e0','#e7711c', '#e31b23','red']} ,
        backgroundColor: '#81d4fa',
        allowHtml: true,
        defaultColor: 'green'};

      var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
      chart.draw(data, options);
    }
  }
}
