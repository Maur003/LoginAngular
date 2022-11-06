import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegistrarUsuarioComponent } from "./registrar-usuario/registrar-usuario.component";
import { RecordarPasswordComponent } from "./recordar-password/recordar-password.component";
import { DashComponent } from "./dash/dash.component"
const routes: Routes = [ {path:'', component:LoginComponent}, { path:'Login', component:LoginComponent}, {path:'Sign-Up', component:RegistrarUsuarioComponent}, {path:'Rpassword', component:RecordarPasswordComponent}, {path: 'DashBoard', component:DashComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
