import { Injectable, EventEmitter } from '@angular/core';
import { componentMethodParams } from '../components/method-http/method-http.component';
import { TagServiceService } from './tag-service.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  objectParams: EventEmitter<componentMethodParams> = new EventEmitter();
  pathsObjects: EventEmitter<Object> = new EventEmitter();
  schemas: EventEmitter<Object> = new EventEmitter();
  paths: EventEmitter<Object[]> = new EventEmitter();
  subjectPath: EventEmitter<String> = new EventEmitter();
  
  constructor(private serviceTag: TagServiceService) { 
  }

  setObjectParams(obj: componentMethodParams) {
    this.objectParams.emit(obj);
  }
  setPaths(obj: Object[]) {
    this.paths.emit(obj);
  }
  setSchemas(obj: Object) {
    this.schemas.emit(obj);
  }
  setSubjectPath(name: String){
    this.subjectPath.emit(name);
  }
}
