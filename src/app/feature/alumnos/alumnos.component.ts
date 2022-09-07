import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Alumno } from 'src/app/Interfaces/AlumnoInterface';
import { ServiceService } from 'src/app/shared/service.service';



@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {

   
  displayedColumns: string[] = ['nombre', 'apellido','detalles'];

  formEstudiante:FormGroup;
  listaAlumnos = new MatTableDataSource<Alumno>();
  listaAlumnos2:any = [];
  listaAlumnos3:any = [];
  detalleCurso:any = [];
  isVisible=false;
  isVisible2=false;
  cursos:string[]=[];
  isAdmin:boolean = false;
  rol : string;
  

  constructor(private fb:FormBuilder, private http:HttpClient, private store : Store<AppState>,public service:ServiceService) { 
    this.store.select('rol').subscribe((rol)=>{
      this.rol = rol;
    });
  }



  ngOnInit(): void {
    this.crearFormulario();
    this.getAlumnos();
    this.isAdmin = this.rol == 'admin';
    this.agregarCurso();

  }
  
  //Metodo de Crea,Inicializa y AgregaValida los inputs
  crearFormulario():void{
   
    this.formEstudiante = this.fb.group({
      id  : ['' ],
      nombre  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      apellido: ['', [Validators.required,Validators.minLength(5)] ],
      dni  : ['', [ Validators.required,Validators.maxLength(8),Validators.pattern("^[0-9]*$")]],
      email  : ['', [ Validators.required,Validators.email]],
      nota  : ['', [ Validators.required,Validators.pattern("^[0-9]*$")]],
      curso  : ['' ],
    });
  }


  //Chequea que se cumpla las validaciones

  get nombreNoValido(){
    return this.formEstudiante.get('nombre').invalid && this.formEstudiante.get('nombre').touched;
  }

  get apellidoNoValido(){
    return this.formEstudiante.get('apellido').invalid && this.formEstudiante.get('apellido').touched;
  }

  get dniNoValido(){
    return this.formEstudiante.get('dni').invalid && this.formEstudiante.get('dni').touched;
  }

  get emailNoValido(){
    return this.formEstudiante.get('email').invalid && this.formEstudiante.get('email').touched;
  }

  get notaNoValido(){
    return this.formEstudiante.get('nota').invalid && this.formEstudiante.get('nota').touched;
  }

  //Probando como obtener los valores de los forumarios
  
 async agregarAlumno(){


    let editar = false;
    let alumno= new Alumno();
  
    let listaAuxiliar = this.listaAlumnos.data;
    
  
    alumno.nombre=this.formEstudiante.get('nombre').value;
    alumno.apellido=this.formEstudiante.get('apellido').value;
    alumno.dni=this.formEstudiante.get('dni').value;
    alumno.email=this.formEstudiante.get('email').value;
    alumno.nota=this.formEstudiante.get('nota').value;
    alumno.curso=this.formEstudiante.get('curso').value;
  
   for (const element of listaAuxiliar) {
     if(element.dni == alumno.dni){
      element.nombre = alumno.nombre;
      element.apellido = alumno.apellido;
      element.email= alumno.email;
      element.nota = alumno.nota;
      element.curso = alumno.curso;
      editar=true;
      
      
      let data = await this.service.putAlumnos(element.id,element);
        this.listaAlumnos.data=data;
        this.listaAlumnos.data = listaAuxiliar;
        this.formEstudiante.reset();
        
      

     }
   }
  if(editar==false){  
    let data = await this.service.postAlumnos(alumno);
      this.listaAlumnos.data = data;
      listaAuxiliar.push(alumno);
      this.listaAlumnos.data = listaAuxiliar;
      this.formEstudiante.reset();
      
    
    
  }
  }           

editarAlumno(element){
 this.formEstudiante.setValue(element );
}


async eliminarAlumno(element){
let numAborrar=element.id;
let data = await this.service.deleteAlumnos(numAborrar);
      this.listaAlumnos.data=data;
      this.getAlumnos();  
    

    

}


async getAlumnos(){
  let data = await this.service.getAlumnos();
  this.listaAlumnos.data =  data;
  this.listaAlumnos2=data;

}
async mostrarOcultar(element){
  

this.listaAlumnos3=[];
this.isVisible=!this.isVisible;
this.listaAlumnos3.push(element);
//DATOS CURSOS
let data = await this.service.getCursos();
this.detalleCurso=[];
for (const curso of data) {
  if(curso.nombre == element.curso){
    
    this.detalleCurso.push(curso);
  }
}


  
}

async agregarCurso(){

  let data = await this.service.getCursos();

  for(let curso of data){
    this.cursos.push(curso.nombre);
  }

  const cursos = new Set(data);


}


}
