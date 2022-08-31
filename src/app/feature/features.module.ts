import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { CursosComponent } from './cursos/cursos.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { MaterialModule } from '../modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FeatureRoutingModule } from './feature-routing.module';



@NgModule({
  declarations: [
    AlumnosComponent,
    ProfesoresComponent,
    CursosComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FeatureRoutingModule
    
  ]
})
export class FeaturesModule { }
