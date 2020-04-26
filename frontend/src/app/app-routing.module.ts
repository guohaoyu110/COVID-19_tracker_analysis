import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { HowtostaysafeComponent } from './components/howtostaysafe/howtostaysafe.component';
import { StateDashboardComponent } from './components/state-dashboard/state-dashboard.component';
import { NewsapiComponent } from './components/newsapi/newsapi.component';
import { CountryDashboardComponent } from './components/country-dashboard/country-dashboard.component';


const routes: Routes = [
  {path : '' , component : HomeComponent},
  {path : 'aboutme' , component :AboutmeComponent},
  {path : 'safetytips', component: HowtostaysafeComponent},
  {path : 'country', component: CountryDashboardComponent},
  {path : 'states' , component: StateDashboardComponent},
  {path : 'news', component: NewsapiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
