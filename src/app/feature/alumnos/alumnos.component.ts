import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Alumno } from 'src/app/Interfaces/AlumnoInterface';



@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {

   
  displayedColumns: string[] = ['nombre', 'apellido', 'dni','email','nota','eliminar','editar'];

  formEstudiante:FormGroup;
  listaAlumnos = new MatTableDataSource<Alumno>();
  isAdmin:boolean = false;
  rol : string;
  

  constructor(private fb:FormBuilder, private http:HttpClient, private store : Store<AppState>) { 
    this.store.select('rol').subscribe((rol)=>{
      this.rol = rol;
    });
  }



  ngOnInit(): void {
    this.crearFormulario();
    this.getAlumnos();
    this.isAdmin = this.rol == 'admin';
  


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
  
  agregarAlumno(){


    let editar = false;
    let alumno= new Alumno();
  
    let listaAuxiliar = this.listaAlumnos.data;
    
  
    alumno.nombre=this.formEstudiante.get('nombre').value;
    alumno.apellido=this.formEstudiante.get('apellido').value;
    alumno.dni=this.formEstudiante.get('dni').value;
    alumno.email=this.formEstudiante.get('email').value;
    alumno.nota=this.formEstudiante.get('nota').value;
  
   for (const element of listaAuxiliar) {
     if(element.dni == alumno.dni){
      element.nombre = alumno.nombre;
      element.apellido = alumno.apellido;
      element.dni= alumno.dni;
      element.email= alumno.email;
      element.nota = alumno.nota
      editar=true;
      
      
      this.http.put<Alumno[]>('https://62e31bd53891dd9ba8f450e1.mockapi.io/Alumnos/'+element.id,element).subscribe (data =>{
        this.listaAlumnos.data=data;
        this.listaAlumnos.data = listaAuxiliar;
        this.formEstudiante.reset();
        
      })

     }
   }
  if(editar==false){
    
    this.http.post<Alumno[]>('https://62e31bd53891dd9ba8f450e1.mockapi.io/Alumnos',alumno).subscribe (data =>{
      this.listaAlumnos.data=data;
      listaAuxiliar.push(alumno);
      this.listaAlumnos.data = listaAuxiliar;
      this.formEstudiante.reset();
      
    })
    
  }
  }           

editarAlumno(element){
 this.formEstudiante.setValue(element );
}


eliminarAlumno(element){
let numAborrar=element.id;
this.http.delete<Alumno[]>('https://62e31bd53891dd9ba8f450e1.mockapi.io/Alumnos/'+numAborrar).subscribe (data =>{
      this.listaAlumnos.data=data;
      this.getAlumnos();  
    })

    

}

getAlumnos(){
  this.http.get<Alumno[]>('https://62e31bd53891dd9ba8f450e1.mockapi.io/Alumnos').subscribe (data =>{
    this.listaAlumnos.data=data;
    
  })
}
}
