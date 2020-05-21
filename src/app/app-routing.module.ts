import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeshqipComponent } from './homeshqip/homeshqip.component';
import { HomeanglishtComponent } from './homeanglisht/homeanglisht.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [{path :'', component : HomeanglishtComponent},
                         {path : 'admin',  component : AdminComponent ,},
                         {path : 'en', component : HomeshqipComponent},
                         {path : 'login', component : LoginComponent}]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
