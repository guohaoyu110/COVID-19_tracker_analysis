import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as _ from 'lodash';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { ToastrService } from 'ngx-toastr';
// import * as moment from 'moment';

@Component({
  selector: 'app-country-dashboard',
  templateUrl: './country-dashboard.component.html',
  styleUrls: ['./country-dashboard.component.css']
})
export class CountryDashboardComponent implements OnInit {
  countrApi = 'https://corona.lmao.ninja/v2/countries';
  countryArray : any;
  constructor(private http: HttpClient, 
    // private spinner :NgxSpinnerService,
    // private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getCountryData();
  }
  
  getCountryData(){
    this.http.get(this.countrApi).subscribe(response => {
      const tempCnt = response;
      this.countryArray = tempCnt;
    });
  }
}
