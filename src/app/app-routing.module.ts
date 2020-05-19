import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeshqipComponent } from './homeshqip/homeshqip.component';
import { HomeanglishtComponent } from './homeanglisht/homeanglisht.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [{path :'', component : HomeanglishtComponent},
                         {path : 'admin', component : AdminComponent}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
