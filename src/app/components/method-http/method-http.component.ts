import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

export interface componentMethodParams {
  methodName: string;
  pathEndPoint: string;
  objPath: Object;
}
@Component({
  selector: 'app-method-http',
  templateUrl: './method-http.component.html',
  styleUrls: ['./method-http.component.scss']
})
export class MethodHTTPComponent implements OnInit,OnChanges {

  @Input() objectParams: componentMethodParams;

  nameSchema: string; 
  schemasProperties: Object
  paramsPath: []

  responsesObject: Object
  requestBody: Object
  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.initValues();
  }
  ngOnChanges(){
    this.initValues();
  }

  initValues(){
    this.nameSchema = 'Pet'
    this.responsesObject = this.objectParams.objPath['responses'];
    this.requestBody = this.objectParams.objPath['requestBody'];
    this.paramsPath = this.objectParams.objPath['parameters'];
  }
  colorEndPoint(method: string): string {
    return this.generalService.colorEndPoint(method);
  }

  
}

