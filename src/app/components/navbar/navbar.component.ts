import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as actions from '../../core/rol.actions';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  rol : string = '';

  constructor(private store : Store<AppState> , private router:Router) {
    this.rol = "";
    this.store.select('rol').subscribe((rol)=>{
      this.rol = rol;
    });
  }

  ngOnInit(): void {
  }
  limpiar(){
    this.store.dispatch( actions.limpiar());
    this.router.navigate(['/']);
    
  }

}
