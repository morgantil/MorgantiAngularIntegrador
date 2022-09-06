import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from '../Interfaces/AlumnoInterface';
import { Curso } from '../Interfaces/CursoInterface copy';
import { Profesor } from '../Interfaces/ProfesorInterface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(public http:HttpClient) { }

   api:string='https://62e31bd53891dd9ba8f450e1.mockapi.io';

  // ALUMNOSJAJJA 
  
   getAlumnos(): Promise<Alumno[]> {
    return this.http.get<Alumno[]>( this.api +`/Alumnos`).toPromise();
  }

  getAlumnosPorId(id:any): Promise<Alumno[]> {
    return this.http.get<Alumno[]>( this.api +`/Alumnos/${id}`).toPromise();
  }
  
  postAlumnos(alumno:Alumno): Promise<Alumno[]>{

    return this.http.post<Alumno[]>(this.api + `/Alumnos`,alumno).toPromise();
  }

  putAlumnos(id:any,element:any): Promise<Alumno[]>{

    return this.http.put<Alumno[]>(this.api + `/Alumnos/${id}`,element).toPromise();
  }
  
  deleteAlumnos(id:any){
    console.log('el nro de id es',id);
    
    return this.http.delete<Alumno[]>(this.api + `/Alumnos/${id}`).toPromise();
  }


  //PROFESORES

  getProfesores(): Promise<Profesor[]> {
    return this.http.get<Profesor[]>( this.api +`/Profesores`).toPromise();
  }
  
  postProfesores(profesor:Profesor): Promise<Profesor[]>{

    return this.http.post<Profesor[]>(this.api + `/Profesores`,profesor).toPromise();
  }

  putProfesores(id:any,element:any): Promise<Profesor[]>{

    return this.http.put<Profesor[]>(this.api + `/Profesores/${id}`,element).toPromise();
  }
  
  deleteProfesores(id:any){
    return this.http.delete<Profesor[]>(this.api + `/Profesores/${id}`).toPromise();
  }

   //CURSOS

   getCursos(): Promise<Curso[]> {
    return this.http.get<Curso[]>( this.api +`/Cursos`).toPromise();
  }
  
  postCursos(curso:Curso): Promise<Curso[]>{

    return this.http.post<Curso[]>(this.api + `/Cursos`,curso).toPromise();
  }

  putCursos(id:any,element:any): Promise<Curso[]>{

    return this.http.put<Curso[]>(this.api + `/Cursos/${id}`,element).toPromise();
  }
  
  deleteCursos(id:any){
    return this.http.delete<Curso[]>(this.api + `/Cursos/${id}`).toPromise();
  }








}
