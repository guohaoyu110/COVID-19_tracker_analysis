import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { GlobalDataSummary } from '../models/gloabl-data';


@Injectable({
  providedIn: 'root'
})


export class DataServiceService {
  
  private yesterday = this.getyesterday();
  // nowdate : any;
  constructor(private http: HttpClient ) {
 }
 getyesterday(){
  let today = new Date();
  let nowTime = today.getTime();
  let ms = 24*3600*1000*(-1);
  today.setTime(nowTime + ms);
  let oYear = today.getFullYear();
  let oMoth = (today.getMonth() + 1).toString();
  if (oMoth.length <= 1) oMoth = '0' + oMoth;
  let oDay = today.getDate().toString();
  if (oDay.length <= 1) oDay = '0' + oDay;
  return oMoth + '-' + oDay + '-' + oYear;
 }
  // private globalDataUrl1 = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/`
  // +`0${new Date().getMonth()+1}-${new Date().getDate()}-2020.csv`;
  // private globalDataUrl2 = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/`
  // +`0${new Date().getMonth()+1}-${new Date().getDate()-1}-2020.csv`;
  public globalDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/`
  + this.yesterday + `.csv`;
  
  getCountryData(){
    
  }
  
  getGlobalData() {
    return this.http.get(this.globalDataUrl, { responseType: 'text' }).pipe(
      map(result => {
        //let data: GlobalDataSummary[] = [];
        //console.log('globalDataUrl: ', this.globalDataUrl);
        let raw = {}
        let rows = result.split('\n');
        rows.splice(0, 1);
        // console.log(rows);
        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/);

          let cs = {
            country: cols[3],
            confirmed: +cols[7],
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[10],
          };
          let temp: GlobalDataSummary = raw[cs.country];
          if (temp) {
            temp.active = cs.active + temp.active
            temp.confirmed = cs.confirmed + temp.confirmed
            temp.deaths = cs.deaths + temp.deaths
            temp.recovered = cs.recovered + temp.recovered

            raw[cs.country] = temp;
          } 
          else {
            raw[cs.country] = cs;
          }
        })
        return <GlobalDataSummary[]>Object.values(raw);
      })
    )
  }
}
