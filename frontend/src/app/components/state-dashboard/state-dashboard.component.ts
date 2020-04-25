import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as Chart from 'chart.js'


@Component({
  selector: 'app-state-dashboard',
  templateUrl: './state-dashboard.component.html',
  styleUrls: ['./state-dashboard.component.css']
})
export class StateDashboardComponent implements OnInit {
  title = 'Covid19 Graph';
  canvas: any;
  ctx: any;
  stateData : any;
  state =[];
  cases =[];
  todayCases =[];
  active =[];
  deaths =[];
  testsPerOneMillion = [];
  
  constructor(private http:HttpClient) {
    
   }

  ngOnInit(): void {
    
  }


  getStateData(){
 
    this.http.get('http://localhost:7777/state')
    .subscribe((response) => 
      {this.stateData = response;
      this.stateData = JSON.stringify(this.stateData);
      this.stateData = JSON.parse(this.stateData);
      //console.log("State Data response..!!", this.stateData)
      
      for (let i=0;i<this.stateData.length ;i++){
        this.state.push(this.stateData[i].state);
        this.cases.push(this.stateData[i].cases)
        this.todayCases.push(this.stateData[i].todayCases)
        this.active.push(this.stateData[i].active)
        this.deaths.push(this.stateData[i].deaths)
        this.testsPerOneMillion.push(this.stateData[i].testsPerOneMillion)

      }
      
      //console.log("Confirmed cases American SUM..", this.cases.reduce((a,b) => a+b,0));
      this.canvas = document.getElementById('myChart');
      this.ctx = this.canvas.getContext('2d');
      let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: ["Confirmed Cases total","Active", "Deaths"],
          datasets: [{
              label: 'State Data',
              data: [
                this.cases.reduce((a,b) => a+b,0),
                //this.todayCases.reduce((a,b) => a+b,0),
                this.active.reduce((a,b) => a+b,0),
                // this.testsPerOneMillion.reduce((a,b)=> a+b,0),
                this.deaths.reduce((a,b) => a+b,0),],
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
        display:true
      }
    });


    });
  }

}
