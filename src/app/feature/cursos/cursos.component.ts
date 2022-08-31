import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Curso } from 'src/app/Interfaces/CursoInterface copy';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'cantHoras', 'alumnos','dia','hora','eliminar','editar'];
  formCurso:FormGroup;
  listaCursos= new MatTableDataSource<Curso>();
  rol:string = "";
  isAdmin:boolean = false;

  constructor(private fb:FormBuilder, private http:HttpClient, private store : Store<AppState>) { 
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

agregarCurso(){


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
    
    
    this.http.put<Curso[]>('https://62e31bd53891dd9ba8f450e1.mockapi.io/Cursos/'+element.id,element).subscribe (data =>{
      this.listaCursos.data=data;
      this.listaCursos.data = listaAuxiliar;
      this.formCurso.reset();
      
    })

   }
 }
if(editar==false){
  
  this.http.post<Curso[]>('https://62e31bd53891dd9ba8f450e1.mockapi.io/Cursos',curso).subscribe (data =>{
    this.listaCursos.data=data;
    listaAuxiliar.push(curso);
    this.listaCursos.data = listaAuxiliar;
    this.formCurso.reset();
    
  })
  
}
}           

editarCurso(element){
this.formCurso.setValue(element );
}


eliminarCurso(element){
let numAborrar=element.id;
this.http.delete<Curso[]>('https://62e31bd53891dd9ba8f450e1.mockapi.io/Cursos/'+numAborrar).subscribe (data =>{
    this.listaCursos.data=data;
    this.getCursos();  
  })

  

}

getCursos(){
this.http.get<Curso[]>('https://62e31bd53891dd9ba8f450e1.mockapi.io/Cursos').subscribe (data =>{
  this.listaCursos.data=data;
  
})
}


}

