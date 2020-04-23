import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CountriesComponent } from './components/countries/countries.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { FooterComponent } from './components/footer/footer.component';
import {HttpClientModule}  from '@angular/common/http';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component'
import { Ng2GoogleChartsModule } from 'ng2-google-charts'; // add google charts
import { HowtostaysafeComponent } from './components/howtostaysafe/howtostaysafe.component';
// import { LAcountyComponent } from './components/lacounty/lacounty.component';
import { StateDashboardComponent } from './components/state-dashboard/state-dashboard.component';
import { NewsapiComponent } from './components/newsapi/newsapi.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CountriesComponent,
    DashboardCardComponent,
    AboutmeComponent,
    FooterComponent,
    HowtostaysafeComponent,
    // LAcountyComponent,
    StateDashboardComponent,
    NewsapiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule, 
    Ng2GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
