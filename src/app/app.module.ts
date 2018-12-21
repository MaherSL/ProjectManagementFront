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
import { HttpClientModule, HttpClient } from '@angular/common/http';
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
    ProductversionlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard,AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
