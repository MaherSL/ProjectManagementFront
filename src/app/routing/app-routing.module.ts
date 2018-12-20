import { SyspagenotfoundComponent } from './../syspagenotfound/syspagenotfound.component';
import { LoginComponent } from './../components/login/login.component';
import { SpaceComponent } from './../components/space/space.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from './../components/index/index.component';
import { AuthGuard } from '../services/auth.guard';
import { RolelistComponent } from '../components/rolelist/rolelist.component';
import { RolelistmodifComponent } from '../components/rolelistmodif/rolelistmodif.component';
import { ViewlistComponent } from '../components/viewlist/viewlist.component';
import { ViewComponent } from '../components/view/view.component';
import { FormiComponent } from '../components/formi/formi.component';
import { FormcComponent } from '../components/formc/formc.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: IndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'space',
    component:SpaceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rolelist',
    component:RolelistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rolelistmodif',
    component:RolelistmodifComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewlist',
    component:ViewlistComponent,
    canActivate: [AuthGuard]},
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'view/:id',
    component:ViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'view',
    component:ViewComponent,
    canActivate: [AuthGuard]
  },
  {
  path: 'formi',
  component:FormiComponent,
  canActivate: [AuthGuard]
},
  { path: '**', component: SyspagenotfoundComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

