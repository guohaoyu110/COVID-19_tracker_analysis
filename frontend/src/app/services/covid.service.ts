import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  printToConsole(arg){
    console.log(arg);
  }
  constructor() { }
}