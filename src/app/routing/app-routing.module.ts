import { WorkmaherComponent } from './../components/workmaher/workmaher.component';
import { WorkaymenComponent } from './../components/workaymen/workaymen.component';
import { DashboardComponent } from './../components/dashboard/dashboard.component';
import { SyspagenotfoundComponent } from './../syspagenotfound/syspagenotfound.component';
import { LoginComponent } from './../components/login/login.component';
import { SpaceComponent } from './../components/space/space.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './../components/index/index.component';
import { AuthGuard } from '../services/auth.guard';
import { RolelistComponent } from '../components/rolelist/rolelist.component';
import { RolelistmodifComponent } from '../components/rolelistmodif/rolelistmodif.component';
import { ViewlistComponent } from '../components/viewlist/viewlist.component';
import { ViewComponent } from '../components/view/view.component';
import { FormiComponent } from '../components/formi/formi.component';
import { FormcComponent } from '../components/formc/formc.component';
import { VocabComponent } from '../components/vocab/vocab.component';
import { VocablistComponent } from '../components/vocablist/vocablist.component';
import { ProductComponent } from '../components/product/product.component';
import { ProductlistComponent } from '../components/productlist/productlist.component';
import { ProductversionlistComponent } from '../components/productversionlist/productversionlist.component';
import { ProductversionComponent } from '../components/productversion/productversion.component';
import { TicketComponent } from '../components/ticket/ticket.component';
import { TicketlistComponent } from '../components/ticketlist/ticketlist.component';

import { SelectmComponent } from '../components/selectm/selectm.component';
import { SpreedsheetsexcelComponent } from '../components/spreedsheetsexcel/spreedsheetsexcel.component';
import { PersonlistComponent } from '../components/personlist/personlist.component';
import { PersonComponent } from '../components/person/person.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  {
    path: 'spreedsheetsexcel',
    component: SpreedsheetsexcelComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'index',
    component: IndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'selectm',
    component: SelectmComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Spreedsheetsexcel',
    component: SpreedsheetsexcelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'space',
    component: SpaceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rolelist',
    component: RolelistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rolelistmodif',
    component: RolelistmodifComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewlist',
    component: ViewlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'view/:id',
    component: ViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'view',
    component: ViewComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'vocablist',
    component: VocablistComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'vocab/:id',
    component: VocabComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'vocab',
    component: VocabComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'productlist',
    component: ProductlistComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'product/:id',
    component: ProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product',
    component: ProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'workaymen',
    component: WorkaymenComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'workmaher',
    component: WorkmaherComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'personlist',
    component: PersonlistComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'person/:id',
    component: PersonComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'person',
    component: PersonComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },


  {
    path: 'productversionlist',
    component: ProductversionlistComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'productversion/:id',
    component: ProductversionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'productversion',
    component: ProductversionComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'ticketlist',
    component: TicketlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ticket',
    component: TicketComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'formc',
    component: FormcComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'formi',
    component: FormiComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', component: SyspagenotfoundComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

