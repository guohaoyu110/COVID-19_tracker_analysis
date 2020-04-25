import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {
  serverUrl = 'http://127.0.0.1:7777/email/';
  msgToDisplay:string;
  subscribeForm: FormGroup;

  // constructor function
  constructor(private fBuilder: FormBuilder, private http: HttpClient) {

  }

  ngOnInit() {
    this.subscribeForm = this.fBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1})?$/)]]});
  }

  // subscribe form submit event function
  onSubmit(form: FormGroup) {
    this.http.get(this.serverUrl + form.value.email).subscribe();
    if(form.valid){ // user input correct
      console.log(form.value);
      this.http.get(this.serverUrl + form.value.email).subscribe();      
    }else{ // user input wrong
      console.log('error');
      this.msgToDisplay = 'Your email address not valid';
    }
  }
}
