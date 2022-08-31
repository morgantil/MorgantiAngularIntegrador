import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './modules/login/login.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FeaturesModule } from './feature/features.module';
import { RoutingModule } from './routing.module';
import { ProfesoresComponent } from './feature/profesores/profesores.component';
import { StoreModule } from '@ngrx/store';
import { rolReducer } from './core/rol.reducer';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    LoginModule,
    RoutingModule,
    StoreModule.forRoot({ rol: rolReducer})
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
