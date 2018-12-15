import { LoginComponent } from './../components/login/login.component';
import { SpaceComponent } from './../components/space/space.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from './../components/index/index.component';
import { Login2Component } from '../components/login2/login2.component';
import { AuthGuard } from '../services/auth.guard';
import { RolelistComponent } from '../components/rolelist/rolelist.component';
import { RolelistmodifComponent } from '../components/rolelistmodif/rolelistmodif.component';
import { OldindexComponent } from '../components/oldindex/oldindex.component';
import { FormiComponent } from '../components/formi/formi.component';

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
    path: 'oldindex',
    component: OldindexComponent,
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
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'login2',
    component:Login2Component,
    canActivate: [AuthGuard]
  },
  {
    path: 'formi',
    component:FormiComponent,
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

