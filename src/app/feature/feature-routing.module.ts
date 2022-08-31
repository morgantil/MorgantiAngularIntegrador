import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { CursosComponent } from './cursos/cursos.component';

const routes:Routes = [
{
  path:'',
  component:AlumnosComponent,
  children:[
    {path:'alumnos',component:AlumnosComponent},
  ]
}
]

@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class FeatureRoutingModule { }
