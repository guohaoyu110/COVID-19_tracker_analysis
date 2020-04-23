import { Component, OnInit } from '@angular/core';
import {news} from '../../models/news';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-newsapi',
  templateUrl: './newsapi.component.html',
  styleUrls: ['./newsapi.component.css']
})
export class NewsapiComponent implements OnInit {
  
  newsData : news[] = [];
  constructor(private http: HttpClient) { }
  getLatestNews(){
    const url = "https://api.cognitive.microsoft.com/bing/v7.0/news/search?q=uscoronavirus";
    // var url = "https://gnews.io/api/v3/search?q="+"&token=d02959da05c216ca2a05811eff49b7e7"
    return this.http.get(url, {headers : {'Ocp-Apim-Subscription-Key' : '9fc2b0698a444b7c9af64925d0447951'  }});
    // return this.http.get(url);
    
  }
  ngOnInit(): void {
    this.getLatestNews().subscribe( data => {
      console.log(data);
      this.newsData = data['value'];
    })
  }

}
