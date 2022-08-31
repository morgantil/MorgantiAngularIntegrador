import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './feature/alumnos/alumnos.component';
import { CursosComponent } from './feature/cursos/cursos.component';
import { LoginComponent } from './components/login/login.component';
import { ProfesoresComponent } from './feature/profesores/profesores.component';
import { LogueoGuard } from './logueo.guard';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'profesores',component:ProfesoresComponent, canActivate:[LogueoGuard]},
  {path:'cursos',component:CursosComponent, canActivate:[LogueoGuard]},
  {path:'alumnos',loadChildren:()=>import('./feature/features.module').then(m=>m.FeaturesModule),
 canActivate:[LogueoGuard]
},
  //{path:'',component:LoginComponent,pathMatch:'full'},
  {path:'**',redirectTo:'/',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
