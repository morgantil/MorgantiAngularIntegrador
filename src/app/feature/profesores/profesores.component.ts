import { HttpClient, HttpRequest } from '@angular/common/http';
import { noUndefined } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Profesor } from 'src/app/Interfaces/ProfesorInterface';
import { ServiceService } from 'src/app/shared/service.service';

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
  

  constructor(private fb:FormBuilder, private http:HttpClient, private store : Store<AppState>,public service:ServiceService) { 
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

async agregarProfesor(){


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
    
    
    let data = await this.service.putProfesores(element.id,element);
      this.listaProfesores.data=data;
      this.listaProfesores.data = listaAuxiliar;
      this.formProfesor.reset();
      
    

   }
 }
if(editar==false){
  
  let data = await this.service.postProfesores(profesor);
    this.listaProfesores.data=data;
    listaAuxiliar.push(profesor);
    this.listaProfesores.data = listaAuxiliar;
    this.formProfesor.reset();
    
  
  
}
}           

editarProfesor(element){
this.formProfesor.setValue(element );

}


async eliminarProfesor(element){

let numAborrar=element.id;
let data = await this.service.deleteProfesores(numAborrar);
    
    this.listaProfesores.data=data;
    
    this.getProfesores();  
  

  

}

async getProfesores(){
  let data = await this.service.getProfesores();
  this.listaProfesores.data=data;
  

}

}
