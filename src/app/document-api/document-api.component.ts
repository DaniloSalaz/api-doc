import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_ID, Component, OnInit } from '@angular/core';
import { safeLoad } from 'js-yaml';
import { config } from 'rxjs';
import SwaggerClient from 'swagger-client';
import { PetService } from '../api/api';
import { Configuration, ConfigurationParameters } from '../configuration';
import { Pet } from '../model/pet';

import { TagServiceService } from '../services/tag-service.service';

export interface API_DOC {
  nombre: string;
  view: boolean;
}
@Component({
  selector: 'app-document-api',
  templateUrl: './document-api.component.html',
  styleUrls: ['./document-api.component.scss']
})
export class DocumentApiComponent implements OnInit {
  APIs: API_DOC[];
  bodyResponse: string = "";
  constructor(private petService: PetService, private tagService: TagServiceService) {
    this.APIs = [];
    this.APIs.push({nombre: 'API Producto', view: true});
    this.APIs.push({nombre: 'API Categoria', view: false});
    this.APIs.push({nombre: 'API Carrito', view: false});
    this.APIs.push({nombre: 'API Pagar', view: false});
    this.APIs.push({nombre: 'API Oferta', view: false});
    this.APIs.push({nombre: 'API Cliente', view: false});
  }
  ngOnInit() {
   // this.httpsGetAsync("http://localhost:80/static/openapi.yaml",this.callback)
   const parameters: ConfigurationParameters = {
     apiKeys: {"pepa":"pepa"},
     username: "test",
     password: "abc123",
     credentials: {"api_key":""},
     basePath: 'https://petstore.swagger.io/v2'
   }
   const config = new Configuration(parameters); 
   this.petService.configuration = config;
   let headers = new HttpHeaders();
   this.petService.defaultHeaders = headers;
  //  this.petService.getPetById(8,"events",false,{httpHeaderAccept:'application/json'}).subscribe(event => {
  //   console.log(event);
  //  })
  
  //  this.petService.getPetById(1,"body",false,{httpHeaderAccept:'application/json'}) 
  //  .subscribe((response) => {
  //   console.log(response);
  //   // let headers: HttpHeaders = response.headers;
  //   // console.log(headers.get('Content-Type'));
  //  })
  //  this.petService.getPetById(1,"body",false,{httpHeaderAccept:'application/json'}).subscribe(response => {
  //   console.log(response);
  //  })
  // var format = require('xml-formatter');
  
  //  this.petService.getPetById(10,"body",false,{httpHeaderAccept:'application/xml'}).subscribe(response => {
  //   var formattedXml = format(response);
  //   console.log(response);
  //   this.bodyResponse = formattedXml;
  //  })
  // this.tagService.getTags().subscribe(res =>{
  //   res.map(tag => {
  //     console.log(tag.name);
  //   })
  // })
  this.tagService.getPath();
  // this.tagService.getPath().subscribe(res =>{
  //   res.map(path => {
  //     console.log(path.operationId);
  //   })
  // })
  console.log();
  }

  onclickAPI(nombre: string) {
    
    this.APIs.map(a => {
     if (a.nombre === nombre) {
       a.view = true;
     } else {
       a.view = false;
     }
    });
  }
  callback(responseText){
    const doc = safeLoad(responseText);
    console.log(doc);
  }
  httpsGetAsync(theURL, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theURL, true);
    xmlHttp.send(null);
  }
}
