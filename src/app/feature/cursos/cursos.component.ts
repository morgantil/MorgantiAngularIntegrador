import { isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Alumno } from 'src/app/Interfaces/AlumnoInterface';
import { Curso } from 'src/app/Interfaces/CursoInterface copy';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  displayedColumns: string[] = ['nombre','detalles'];
  formCurso:FormGroup;
  listaCursos= new MatTableDataSource<Curso>();
  rol:string = "";
  isAdmin:boolean = false;
  listaAlumnos3: any[];
  isVisible: boolean;
  alumnosInscriptos2: any[];
  listaCurso3: any[];

  constructor(private fb:FormBuilder, private http:HttpClient, private store : Store<AppState>,public service:ServiceService) { 
    this.store.select('rol').subscribe((rol)=>{
      this.rol = rol;
    });
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.getCursos();
    this.isAdmin = this.rol == 'admin';
   

  }

  crearFormulario(){
    this.formCurso = this.fb.group({
      id  : ['' ],
      nombre  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      cantHoras  : ['', [ Validators.required, Validators.minLength(1) ]  ],
      alumnos  : ['', [ Validators.required,Validators.maxLength(3),]],
      dia  : ['', [ Validators.required, ]  ],
      hora  : ['', [ Validators.required, ]  ]
  });

}

get nombreNoValido(){
  return this.formCurso.get('nombre').invalid && this.formCurso.get('nombre').touched;
}

get cantHorasNoValido(){
  return this.formCurso.get('cantHoras').invalid && this.formCurso.get('cantHoras').touched;
}

get alumnosNoValido(){
  return this.formCurso.get('alumnos').invalid && this.formCurso.get('alumnos').touched;
}

get diaNoValido(){
  return this.formCurso.get('dia').invalid && this.formCurso.get('dia').touched;
}
get horaNoValido(){
  return this.formCurso.get('hora').invalid && this.formCurso.get('hora').touched;
}

async agregarCurso(){


  let editar = false;
  let curso= new Curso();

  let listaAuxiliar = this.listaCursos.data;
  

  curso.nombre=this.formCurso.get('nombre').value;
  curso.cantHoras=this.formCurso.get('cantHoras').value;
  curso.alumnos=this.formCurso.get('alumnos').value;
  curso.dia=this.formCurso.get('dia').value;
  curso.hora=this.formCurso.get('hora').value;


 for (const element of listaAuxiliar) {
   if(element.nombre == curso.nombre){
    element.cantHoras = curso.cantHoras;
    element.alumnos = curso.alumnos;
    element.dia= curso.dia;
    element.hora= curso.hora;
    editar=true;
    
    
    let data = await this.service.putCursos(element.id,element);
      this.listaCursos.data=data;
      this.listaCursos.data = listaAuxiliar;
      this.formCurso.reset();
      
    

   }
 }
if(editar==false){
  
  let data = await this.service.postCursos(curso);
    this.listaCursos.data=data;
    listaAuxiliar.push(curso);
    this.listaCursos.data = listaAuxiliar;
    this.formCurso.reset();
    
  
  
}
}           

editarCurso(element){
this.formCurso.setValue(element );
}


async eliminarCurso(element){
let numAborrar=element.id;
let data = await this.service.deleteCursos(numAborrar);
    this.listaCursos.data=data;
    this.getCursos();  
  

  

}

async getCursos(){
let data = await this.service.getCursos();
  this.listaCursos.data=data;
  

}

async alumnosInscriptos(element){
  let nombre = element.nombre;
  let data = await this.service.getAlumnos();
  let alumInscriptos:any[]=[];

  for (const alumno of data) {

    if(alumno.curso == nombre){
      alumInscriptos.push(alumno);
    }

    
  }



}

async mostrarOcultar(element){
  

  this.listaCurso3=[];
  this.isVisible=!this.isVisible;
  this.listaCurso3.push(element);  
  //DATOS ALUMNOS
  let data = await this.service.getAlumnos();
  this.alumnosInscriptos2=[];
  for(let alumno of data){
    if(alumno.curso == element.nombre){
        this.alumnosInscriptos2.push(alumno);
    }
  }



  
    
  }


}

