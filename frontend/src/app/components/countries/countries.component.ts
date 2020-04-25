import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/gloabl-data';
//import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  data : GlobalDataSummary[];
  countries : string[] = [];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  //selectedCountryData : DateWiseData[]; 
  //dateWiseData ;
  loading = true;
  // lineChart : GoogleChartInterface = {
  //   chartType: 'LineChart'
  // }
  constructor(private service : DataServiceService) { }

  ngOnInit(): void {

    merge(
      this.service.getGlobalData().pipe(map(result=>{
        this.data = result;
        this.data.forEach(cs=>{
          this.countries.push(cs.country)
          //console.log('service.globaDataUrl: ', service.globaDataUrl);
        })
      }))
    ).subscribe(
      {
        complete : ()=>{
         this.updateValues('US')
         this.loading = false;
        }
      }
    )
    
    

  }

  // updateChart(){
  //   let dataTable = [];
  //   //dataTable.push(["Date" , 'Cases']) // show the cases every
  //   // this.selectedCountryData.forEach(cs=>{
  //   //   dataTable.push([cs.date , cs.cases])
  //   // })

  //   // this.lineChart = {
  //   //   chartType: 'LineChart',
  //   //   dataTable: dataTable,
  //   //   //firstRowIsData: true,
  //   //   options: {
  //   //     height : 500, 
  //   //     animation:{
  //   //       duration: 1000,
  //   //       easing: 'out',
  //   //     },
  //   //   },
  //   // };
  // }
  // select a specific country and choose it to show the
  updateValues(country : string){
    console.log(country);
    this.data.forEach(cs=>{
      if(cs.country == country){
        this.totalActive = cs.active
        this.totalDeaths = cs.deaths
        this.totalRecovered = cs.recovered
        this.totalConfirmed = cs.confirmed
      }
    })

   // this.selectedCountryData  = this.dateWiseData[country]
    // console.log(this.selectedCountryData);
   // this.updateChart();
    
  }

}
