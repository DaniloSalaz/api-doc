import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order';
import { Pet } from '../model/pet';
import { Category } from '../model/category';
import { TagServiceService } from '../services/tag-service.service';
import { Property, Schema } from '../models/Path';

export interface compentMethodParams {
  methodName: string;
  pathEndPoint: string;
  description: string;
}
export class Test implements Category {
}
@Component({
  selector: 'app-method',
  templateUrl: './method.component.html',
  styleUrls: ['./method.component.scss']
})
export class MethodComponent implements OnInit {

  objectParams: compentMethodParams = {
    methodName: 'GET',
    pathEndPoint:'/pet/{petId}',
    description: 'Returns a single pet'
  }

  // objectParams: compentMethodParams = {
  //   methodName: 'PUT',
  //   pathEndPoint:'/pet',
  //   description: 'Update an existing pet'
  // }

  pathsObjects: Object
  schemas: Object
  path: Object 

  constructor(private serviceTag: TagServiceService) {
    
    
   }
  
  ngOnInit() {
    this.serviceTag.getYamlObject().subscribe(obj => {
      console.log(obj);
      this.schemas = obj['components'].schemas;
      this.pathsObjects = obj['paths']
      
      // this.path = this.pathsObjects["/pet"].put;
      this.path = this.pathsObjects["/pet/{petId}"].get;

    });
  }
  
}
