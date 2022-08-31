import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './app.reducers';


@Injectable({
  providedIn: 'root'
})
export class LogueoGuard implements CanActivate {

  rol : string = "";

  constructor(private store : Store<AppState>){
    this.store.select('rol').subscribe((rol)=>{
      this.rol = rol;
    });
  }
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.rol != "" ? true : false;
  }
  
}
