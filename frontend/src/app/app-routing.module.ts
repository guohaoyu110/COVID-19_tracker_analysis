import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CountriesComponent } from './components/countries/countries.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { HowtostaysafeComponent } from './components/howtostaysafe/howtostaysafe.component';
import { StateDashboardComponent } from './components/state-dashboard/state-dashboard.component';


const routes: Routes = [
  {path : '' , component : HomeComponent},
  {path : 'countries' , component :CountriesComponent}, 
  {path : 'aboutme' , component :AboutmeComponent},
  {path : 'safetytips', component: HowtostaysafeComponent},
  {path : 'states' , component: StateDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
