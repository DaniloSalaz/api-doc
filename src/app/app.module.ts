import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DocumentApiComponent } from './document-api/document-api.component';
import { HttpClientModule } from "@angular/common/http";
import { PetService } from './api/api';
import { PostComponent } from './post/post.component';
import { MethodComponent } from './method/method.component';
import { SchemaComponent } from './components/schema/schema.component';
import { RowComponent } from './components/schema/row/row.component';
import { MethodHTTPComponent } from './components/method-http/method-http.component';
import { ParametersComponent } from './components/method-http/parameters/parameters.component';
import { ResponseComponent } from './components/method-http/response/response.component';
import { MainComponent } from './components/main/main.component';
import { SidebarComponent } from './components/main/sidebar/sidebar.component';
import { SubSidebarComponent } from './components/main/sub-sidebar/sub-sidebar.component';
import { RequestBodyComponent } from './components/method-http/request-body/request-body.component';
import { LaunchComponent } from './components/launch/launch.component';
import { TryitComponent } from './components/launch/tryit/tryit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DocumentApiComponent,
    PostComponent,
    MethodComponent,
    SchemaComponent,
    RowComponent,
    MethodHTTPComponent,
    ParametersComponent,
    ResponseComponent,
    MainComponent,
    SidebarComponent,
    SubSidebarComponent,
    RequestBodyComponent,
    LaunchComponent,
    TryitComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
