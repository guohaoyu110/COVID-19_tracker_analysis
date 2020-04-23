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
    const url = "https://api.cognitive.microsoft.com/bing/v7.0/news/search?q=coronavirus";
    return this.http.get(url, {headers : {'Ocp-Apim-Subscription-Key' : '9fc2b0698a444b7c9af64925d0447951'  }});
    
  }
  ngOnInit(): void {
    this.getLatestNews().subscribe( data => {
      console.log(data);
      this.newsData = data['value'];
    })
  }

}
