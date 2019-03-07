import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FormiComponent } from './components/formi/formi.component';
import { AlertService } from './services/alert.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppheaderComponent } from './components/appheader/appheader.component';
import { AppfooterComponent } from './components/appfooter/appfooter.component';
import { AppmenuComponent } from './components/appmenu/appmenu.component';
import { AppsettingsComponent } from './components/appsettings/appsettings.component';
import { SpaceComponent } from './components/space/space.component';
import { IndexComponent } from './components/index/index.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { RolelistComponent } from './components/rolelist/rolelist.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RolelistmodifComponent } from './components/rolelistmodif/rolelistmodif.component';
import { FormcComponent } from './components/formc/formc.component';
import { ViewlistComponent } from './components/viewlist/viewlist.component';
import { ViewComponent } from './components/view/view.component';
import { SyspagenotfoundComponent } from './syspagenotfound/syspagenotfound.component';
import { AlertComponent } from './components/alert/alert.component';
import { VocabComponent } from './components/vocab/vocab.component';
import { VocablistComponent } from './components/vocablist/vocablist.component';
import { ProductComponent } from './components/product/product.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { ProductversionComponent } from './components/productversion/productversion.component';
import { ProductversionlistComponent } from './components/productversionlist/productversionlist.component';
import { JwtInterceptor } from './security/jwt.interceptor';
import { ContentheaderComponent } from './components/templates/contentheader/contentheader.component';
import { TicketlistComponent } from './components/ticketlist/ticketlist.component';
import { TicketFilterPipe } from './components/ticket/ticket-filter.pipe';
import { TicketComponent } from './components/ticket/ticket.component';

import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

//material Design
import { AppMaterialModule } from 'src/app/app-material/app-material.module';

import { DashboardComponent } from './components/dashboard/dashboard.component';
//pagination
import { NgxPaginationModule } from 'ngx-pagination';
//ngx select and multipleselect
import { NgxSelectModule } from 'ngx-select-ex';

import { SelectmComponent } from './components/selectm/selectm.component';
//import { SelectDropDownModule } from 'ngx-select-dropdown';
//import { SelectmComponent } from './components/selectm/selectm.component';
import { SelectModule } from 'ng2-select';
import { SpreedsheetsexcelComponent } from './components/spreedsheetsexcel/spreedsheetsexcel.component';

import { SpreadSheetsModule } from "@grapecity/spread-sheets-angular";
import { PersonComponent } from './components/person/person.component';
import { PersonlistComponent } from './components/personlist/personlist.component';
import { WorkmaherComponent } from './components/workmaher/workmaher.component';
import { WorkaymenComponent } from './components/workaymen/workaymen.component';

@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    AppfooterComponent,
    AppmenuComponent,
    AppsettingsComponent,
    SpaceComponent,
    IndexComponent,
    LoginComponent,
    RolelistComponent,
    RolelistmodifComponent,
    FormiComponent,
    FormcComponent,
    ViewComponent,
    ViewlistComponent,
    SyspagenotfoundComponent,
    AlertComponent,
    FormiComponent,
    VocabComponent,
    VocablistComponent,
    ProductComponent,
    ProductlistComponent,
    ProductversionComponent,
    ProductversionlistComponent,
    TicketlistComponent,
    TicketComponent,
    ContentheaderComponent,
    TicketFilterPipe,
    ContentheaderComponent,
    ConfirmModalComponent,
    DashboardComponent,
    PersonComponent,
    PersonlistComponent,
    //SelectDropDownModule,
    SelectmComponent,
    SpreedsheetsexcelComponent,
    WorkmaherComponent,
    WorkaymenComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppMaterialModule,
    ChartsModule,
    NgxPaginationModule,
    NgxSelectModule,

    SelectModule,
    SpreadSheetsModule
    //SelectDropDownModule
  ],
  providers: [AuthGuard, AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
