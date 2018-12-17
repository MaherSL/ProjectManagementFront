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
<<<<<<< HEAD
import { ViewlistComponent } from '../components/viewlist/viewlist.component';
import { ViewComponent } from '../components/view/view.component';
=======
import { OldindexComponent } from '../components/oldindex/oldindex.component';
import { FormiComponent } from '../components/formi/formi.component';
>>>>>>> 8768d70679110a0a50f154ed5193ff04d0eb7343

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
<<<<<<< HEAD
    path: 'viewlist',
    component:ViewlistComponent,
    canActivate: [AuthGuard]
=======
    path: 'login',
    component:LoginComponent
>>>>>>> 8768d70679110a0a50f154ed5193ff04d0eb7343
  },
  {
    path: 'view/:id',
    component:ViewComponent,
    canActivate: [AuthGuard]
  },
  {
<<<<<<< HEAD
    path: 'view',
    component:ViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component:LoginComponent
  },
  { path: '**', component: SyspagenotfoundComponent }
=======
    path: 'formi',
    component:FormiComponent,
    canActivate: [AuthGuard]
  }
>>>>>>> 8768d70679110a0a50f154ed5193ff04d0eb7343
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

