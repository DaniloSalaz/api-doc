import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit, OnChanges {

  @Input() responsesObject: Object
  objectSchema: Object
  nameSchema: string
  typeResponse: string[]
  responseCurrency: Object
  constructor() { }

  ngOnInit() {
    this.setFirstResponse(Object.keys(this.responsesObject)[0]);
    this.setShowResponse();
  }

  ngOnChanges(){
    this.setFirstResponse(Object.keys(this.responsesObject)[0]);
    this.setShowResponse();
  }
  setFirstResponse(key: string) {
    this.responseCurrency = this.responsesObject[key];
  }

  setShowResponseAllFalse() {
    Object.keys(this.responsesObject).map(k => {
      this.responsesObject[k].show = false;
    })
  }
  setShowResponse() {
    let keys = Object.keys(this.responsesObject)
    this.setShowResponseAllFalse();
    this.responsesObject[keys[0]].show = true;
    this.isContentSchemaReference(this.responsesObject[keys[0]]);
  }
  showResponse(key: string): void {
    this.setShowResponseAllFalse();
    this.responsesObject[key].show = true;
    this.responseCurrency = this.responsesObject[key];
    this.isContentSchemaReference(this.responseCurrency);

  }
  isContentSchemaReference(objectRes){
    const contenido = objectRes['content']
    this.typeResponse = [];
    Object.keys(contenido).forEach(keyContent => {
      
      let schema = contenido[keyContent].schema;
      this.typeResponse.push(keyContent);
      if(schema["$ref"]){
        this.nameSchema = schema["$ref"].replace("#/components/schemas/","");
      }
      else{
        this.objectSchema = schema;
      }
    });
  }
  colorbyResponse(response: string): string {
    switch (response.charAt(0)) {
      case "2":
        return "r-2xx";
      case "3":
        return "r-3xx";
      case "4":
        return "r-4xx";
      case "5":
        return "r-5xx";
      default:
        return "";
    }
  }
  getNameObject(referencia: string): string {
    if (referencia && referencia.includes("#/components/schemas/")) {
      return referencia.replace("#/components/schemas/", "");
    }
    return "";
  }
}
