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
import { Login2Component } from './components/login2/login2.component';
import { AuthGuard } from './services/auth.guard';
import { RolelistComponent } from './components/rolelist/rolelist.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RolelistmodifComponent } from './components/rolelistmodif/rolelistmodif.component';




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
    Login2Component,
    RolelistComponent,
    RolelistmodifComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
