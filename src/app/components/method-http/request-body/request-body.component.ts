import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { RequestBody } from 'src/app/models/Path';

@Component({
  selector: 'app-request-body',
  templateUrl: './request-body.component.html',
  styleUrls: ['./request-body.component.scss']
})
export class RequestBodyComponent implements OnInit, OnChanges {

  @Input() requestBody: Object
  objectSchema: Object
  nameSchema: string;
  descriptionBody: string;
  typeResponse: string[]
  
  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges() {
    this.setNameSchema();
  }

  setNameSchema() {
    let content = this.requestBody['content']; 
    this.descriptionBody = this.requestBody['description'];
    this.typeResponse = [];
    Object.keys(content)
    .forEach(key => {
      let schema = content[key].schema;
      this.typeResponse.push(key);
      if(schema["$ref"]){
        this.nameSchema = schema["$ref"].replace("#/components/schemas/","");
      }
      else{
        this.objectSchema = schema;
      }

    });
  }

}
