import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { EmployeeService } from './ctwo/employee.service';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ConeComponent } from './cone/cone.component';
import { CtwoComponent } from './ctwo/ctwo.component';
import { CthreeComponent } from './cthree/cthree.component';
import { CfourComponent } from './cfour/cfour.component';
import { CfiveComponent } from './cfive/cfive.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConeComponent,
    CtwoComponent,
    CthreeComponent,
    CfourComponent,
    CfiveComponent,
    ListEmployeesComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
