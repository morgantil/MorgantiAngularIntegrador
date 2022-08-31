import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { User } from 'src/app/Interfaces/UserInterface';
import * as actions from '../../core/rol.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  public credencialesValidas: boolean = null;
  public mostrarLogin = true;
  listaUser: User[] = [];
  rol : string;

  constructor(private fb: FormBuilder, private http: HttpClient, private store : Store<AppState>) {
    this.rol = "";
    this.store.select('rol').subscribe((rol)=>{
      this.rol = rol;
    });
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.getUsuarios();
  }

  crearFormulario() {
    this.formLogin = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(5)]],
      pass: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  //Chequea que se cumpla las validaciones

  get userNoValido() {
    return (
      this.formLogin.get('user').invalid && this.formLogin.get('user').touched
    );
  }

  get passNoValido() {
    return (
      this.formLogin.get('pass').invalid && this.formLogin.get('pass').touched
    );
  }

  enviar(): boolean {
    let user = this.formLogin.get('user').value;
    let pass = this.formLogin.get('pass').value;


    for (let usuario of this.listaUser) {
      if (user == usuario.user && pass == usuario.pass) {
        this.credencialesValidas = true;
        this.asignar(usuario.rol);
      }
    }
    this.mostrarLogin = !this.credencialesValidas;

    return this.credencialesValidas;
  }

  getUsuarios() {
    this.http
      .get<User[]>('https://62e31bd53891dd9ba8f450e1.mockapi.io/Usuarios')
      .subscribe((data) => {
        this.listaUser = data;
      });
  }

  asignar(rolUser : string){
    this.store.dispatch( actions.asignar({rol:rolUser}));
  }
  limpiar(){
    this.store.dispatch( actions.limpiar());
  }
}
