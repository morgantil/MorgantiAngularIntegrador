import { HttpClient, HttpRequest } from '@angular/common/http';
import { noUndefined } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Profesor } from 'src/app/Interfaces/ProfesorInterface';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss']
})
export class ProfesoresComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'dni','curso','eliminar','editar'];
  formProfesor:FormGroup;
  listaProfesores= new MatTableDataSource<Profesor>();
  isAdmin:boolean = false;
  rol : string;
  

  constructor(private fb:FormBuilder, private http:HttpClient, private store : Store<AppState>) { 
    this.store.select('rol').subscribe((rol)=>{
      this.rol = rol;
    });
  }
  ngOnInit(): void {
    this.crearFormulario();
    this.isAdmin = this.rol == 'admin';
    this.getProfesores();

  }

  crearFormulario(){
    this.formProfesor = this.fb.group({
      id  : ['' ],
      nombre  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      apellido  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      dni  : ['', [ Validators.required,Validators.maxLength(8),Validators.pattern("^[0-9]*$")]],
      curso  : ['', [ Validators.required, Validators.minLength(5) ]  ]
  });

}

get nombreNoValido(){
  return this.formProfesor.get('nombre').invalid && this.formProfesor.get('nombre').touched;
}

get apellidoNoValido(){
  return this.formProfesor.get('apellido').invalid && this.formProfesor.get('apellido').touched;
}

get dniNoValido(){
  return this.formProfesor.get('dni').invalid && this.formProfesor.get('dni').touched;
}

get cursoNoValido(){
  return this.formProfesor.get('curso').invalid && this.formProfesor.get('curso').touched;
}

agregarProfesor(){


  let editar = false;
  let profesor= new Profesor();

  let listaAuxiliar = this.listaProfesores.data;
  

  profesor.nombre=this.formProfesor.get('nombre').value;
  profesor.apellido=this.formProfesor.get('apellido').value;
  profesor.dni=this.formProfesor.get('dni').value;
  profesor.curso=this.formProfesor.get('curso').value;


 for (const element of listaAuxiliar) {
   if(element.dni == profesor.dni){
    element.nombre = profesor.nombre;
    element.apellido = profesor.apellido;
    element.dni= profesor.dni;
    element.curso= profesor.curso;
    editar=true;
    
    
    this.http.put<Profesor[]>('https://62e31bd53891dd9ba8f450e1.mockapi.io/Profesores/'+element.id,element).subscribe (data =>{
      this.listaProfesores.data=data;
      this.listaProfesores.data = listaAuxiliar;
      this.formProfesor.reset();
      
    })

   }
 }
if(editar==false){
  
  this.http.post<Profesor[]>('https://62e31bd53891dd9ba8f450e1.mockapi.io/Profesores',profesor).subscribe (data =>{
    this.listaProfesores.data=data;
    listaAuxiliar.push(profesor);
    this.listaProfesores.data = listaAuxiliar;
    this.formProfesor.reset();
    
  })
  
}
}           

editarProfesor(element){
this.formProfesor.setValue(element );

}


eliminarProfesor(element){

let numAborrar=element.id;
this.http.delete<Profesor[]>('https://62e31bd53891dd9ba8f450e1.mockapi.io/Profesores/'+numAborrar).subscribe (data =>{
    
    this.listaProfesores.data=data;
    
    this.getProfesores();  
  })

  

}

getProfesores(){
this.http.get<Profesor[]>('https://62e31bd53891dd9ba8f450e1.mockapi.io/Profesores').subscribe (data =>{
  this.listaProfesores.data=data;
  
})
}

}
