import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/gloabl-data';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  loading = true;
  globalData: GlobalDataSummary[];
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart'
  }
  Table: GoogleChartInterface = {
    chartType: 'GeoChart'
  }
  constructor(private dataService: DataServiceService) { }


  
  ngOnInit(): void {

    this.dataService.getGlobalData()
      .subscribe(
        {
          next: (result) => {
            console.log(result);
            this.globalData = result;
            result.forEach(cs => {
              if (!Number.isNaN(cs.confirmed)) {
                this.totalActive += cs.active
                this.totalConfirmed += cs.confirmed
                this.totalDeaths += cs.deaths
                this.totalRecovered += cs.active
              }

            })

            this.initChart('c');
          }, 
          complete : ()=>{
            this.loading = false;
          }
        }
      )
  }



  updateChart(input: HTMLInputElement) {//log the value of input
    console.log(input.value);
    this.initChart(input.value)
  }

  initChart(caseType: string) {
  // push the data of 
    let datatable = [];
    datatable.push(["Country", "Cases"])
    
    this.globalData.forEach(cs => {
      let value :number ; // must be number type cannot be let value = ""
      if (caseType == 'c')
        if (cs.confirmed > 2000)  // only show over 2000 cases
          value = cs.confirmed
          
      if (caseType == 'a')
        if (cs.active > 200)
          value = cs.active
      if (caseType == 'd')
        if (cs.deaths > 10)
          value = cs.deaths
          
      if (caseType == 'r')
        if (cs.recovered > 100)
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
    this.Table = {
      chartType: 'GeoChart',
      dataTable: datatable,
      options:{
        //displayMode : 'markers',
        colorAxis: {colors: ['#4374e0','#e7711c', 'red']} ,
        allowHtml: true,
      },
    };
  }

}
