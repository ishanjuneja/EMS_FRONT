import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {DatePipe} from '@angular/common'
import { FormsModule } from '@angular/forms';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { Routes, RouterModule } from '@angular/router';

import { LoginService } from './services/login.service';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';

import { AgmCoreModule } from '@agm/core';
import { DynamicGraphComponent } from './components/dynamic-graph/dynamic-graph.component';
import { StaticGraphComponent } from './components/static-graph/static-graph.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { StaticGraphDialog} from './components/static-graph/static-graph.component'
import { NgDraggableWidgetModule } from 'ngx-draggable-widget';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { WidgethomeComponent } from './components/widgethome/widgethome.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dyGraph', component: DynamicGraphComponent },
  { path: 'stGraph', component: StaticGraphComponent },
  {path:'siteInfo',component:WidgethomeComponent},
  { path: 'home',  component: HomeComponent }, // <-- delete this line
  { path: '',   redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HomeComponent,
    DynamicGraphComponent,
    StaticGraphComponent,
    NavBarComponent,
    StaticGraphDialog,
    WidgethomeComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    HttpClientModule,
    NgDraggableWidgetModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCoegRRdaK7vfJV75rTUVmydXNfJAXUbYY'
    })
    
  ],
  entryComponents:[
    StaticGraphDialog
  ],
  providers: [
    LoginService,
    MatNativeDateModule,
    DatePipe
  ],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA ]
})
export class AppModule { }
