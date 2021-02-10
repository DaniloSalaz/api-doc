import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { safeLoad } from 'js-yaml';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReadYamlService {

  constructor(protected httpClient: HttpClient) { }

  private getFileHttp(): Observable<any> {
    return this.httpClient.get('http://localhost:80/static/openapi.yaml', { responseType: 'text' });
  }

  public getYamlObject(): Observable<Object>{
    let subject = new Subject<Object>();
    this.getFileHttp().subscribe(file => {
        subject.next(safeLoad(file));
        console.log(safeLoad(file));
    })

    return subject.asObservable();
  }

  public getTagsYaml(): Observable<Object[]> {
    let subject = new Subject<Object[]>();

    this.getFileHttp().subscribe(file => {
      const yaml = safeLoad(file);
      subject.next(yaml.tags);
    })
    return subject.asObservable();
  }

  public getSchemasYaml(): Observable<Object> {
    let subject = new Subject<Object>();

    this.getFileHttp().subscribe(file => {
      const yaml = safeLoad(file);
      subject.next(yaml.components.schemas);
    })
    return subject.asObservable();
  }

  public getSchemaYaml(name: String): Observable<Object> {
    let subject = new Subject<Object>();

    this.getFileHttp().subscribe(file => {
      const yaml = safeLoad(file);
      subject.next(yaml.components.schemas[name]);
    })
    return subject.asObservable();
  }

  public getListSchemasYaml(): Observable<Object[]> {
    let subject = new Subject<Object[]>();

    this.getFileHttp().subscribe(file => {
      const yaml = safeLoad(file);
      let schemas = yaml.components.schemas;
      schemas = Object.keys(schemas).map( sch => {
          let sc = {name: sch}
          return Object.assign(sc,{schema:schemas[sch]});
      });
      subject.next(schemas);
    })
    return subject.asObservable();
  }

  public getPathYaml(tag: string): Observable<Object[]> {
    let subject = new Subject<Object[]>();

    this.getFileHttp().subscribe(file => {
      const yaml = safeLoad(file);
      let paths = Object.keys(yaml.paths).filter(keyPath => {
          const path = yaml.paths[keyPath]; 
          let metedosHttp = Object.keys(path).filter(keyMethods => 
            path[keyMethods].tags.find(t => t === tag) === tag 
          )
          if(metedosHttp[0]){
            return keyPath;
          }
      }).map(keyPath => {
       return Object.assign({path: keyPath},{methods:yaml.paths[keyPath]}) 
      })
      subject.next(paths);
    })
    return subject.asObservable();
  }

 
  
}
