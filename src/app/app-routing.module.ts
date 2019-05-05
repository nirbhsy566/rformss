import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConeComponent } from './cone/cone.component';
import { CtwoComponent } from './ctwo/ctwo.component';
import { CthreeComponent } from './cthree/cthree.component';
import { CfourComponent } from './cfour/cfour.component';
import { CfiveComponent } from './cfive/cfive.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
const routes: Routes = [
  { path: 'one', component: ConeComponent },
  { path: 'edit', component: CtwoComponent },
  { path: 'list', component: ListEmployeesComponent },
  { path: 'edit/:id', component: CtwoComponent },
  { path: 'three', component: CthreeComponent },
  { path: 'four', component: CfourComponent },
  { path: 'five', component: CfiveComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
