import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {CategoryComponent} from "./components/category/category.component";
import {MatIconModule} from "@angular/material/icon";
import {ChitchatComponent} from './components/chitchat/chitchat.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {authInterceptorProviders} from "./service/auth-interceptor.service";
import {authErrorInterceptorProviders} from "./service/error-interceptor.service";
import {OneChitchatComponent} from './components/one-chitchat/one-chitchat.component';
import {AddNewChitchatComponent} from './components/add-new-chitchat/add-new-chitchat.component';
import {ChitchatFilterComponent} from './components/chitchat-filter/chitchat-filter.component';
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import { ChitchatRefComponent } from './components/chitchat-ref/chitchat-ref.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainComponent } from './components/main/main.component';


const appRoutes: Routes = [

]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CategoryComponent,
    ChitchatComponent,
    OneChitchatComponent,
    AddNewChitchatComponent,
    ChitchatFilterComponent,
    ChitchatRefComponent,
    NotFoundComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule

  ],
  providers: [authInterceptorProviders,authErrorInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
