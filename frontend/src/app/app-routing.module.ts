import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CountriesComponent } from './components/countries/countries.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { HowtostaysafeComponent } from './components/howtostaysafe/howtostaysafe.component';
import { CovidDashboardComponent } from './components/covid-dashboard/covid-dashboard.component';


const routes: Routes = [
  {path : '' , component : HomeComponent},
  {path : 'countries' , component :CountriesComponent}, 
  {path : 'aboutme' , component :AboutmeComponent},
  {path : 'safetytips', component: HowtostaysafeComponent},
  {path : 'states' , component: CovidDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
