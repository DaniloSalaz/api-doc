import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Tag } from '../models/Tag';
import { safeLoad } from 'js-yaml';
import { Observable, Subject } from 'rxjs';
import { Content, MetodosHttp, Path, Property, RequestBody, Schema } from '../models/Path';
import { TypeofExpr } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class TagServiceService {

  constructor(protected httpClient: HttpClient) { }

  private getFileHttp(): Observable<any> {
    return this.httpClient.get('http://localhost:80/static/openapi.yaml', { responseType: 'text' });
  }

  private getTagsFromYaml(): Observable<Tag[]> {
    let subject = new Subject<Tag[]>();

    this.getFileHttp().subscribe(file => {
      const yaml = safeLoad(file);
      subject.next(yaml.tags);
    })
    return subject.asObservable();
  }

  public getYamlObject(): Observable<Object>{
    let subject = new Subject<Object>();
    this.getFileHttp().subscribe(file => {
        subject.next(safeLoad(file));
        console.log(safeLoad(file));
    })

    return subject.asObservable();
  }

  public getPath(): Observable<Path[]> {
    let subject = new Subject<Path[]>();

    this.getYamlObject().subscribe(file => {
      const yaml = safeLoad(file);
      let paths = yaml.paths;
      // console.log(yaml.components.schemas);
      console.log(this.buildEndPoint("/pet", paths['/pet'].put, 'put', file));
      console.log(yaml.components.schemas);
      subject.next(paths);
    })
    return subject.asObservable();
  }

  /**
   * @param  {string} path path del endpoint e.g /pet
   * @param  {Object} methodPath objecto del método del endpint e.g post 
   * @returns Path contruido.
   */
  public buildEndPoint(path: string, methodPath: Object, methodHttp: string, file: Object): Path {
    // const method = Object.keys(methodPath);
    let endPoint = new Path();
    endPoint.path = path;
    endPoint.metodo = this.getMetodosHttp(methodHttp);
    endPoint.operationId = methodPath['operationId'];
    endPoint.tags = methodPath['tags'];
    endPoint.summary = methodPath['summary'] || "";
    endPoint.description = methodPath['description'] || "";
    endPoint.deprecated = methodPath['deprecated'] || false;
    endPoint.requestBody = this.buildRequestBody(methodPath['requestBody']);
    //falta response 
    // falta params
    return endPoint;
  }

  private buildRequestBody(requestObject: Object): RequestBody {
    let contents: Content[] = [];
    let requestBody = new RequestBody;
    requestBody.description = requestBody["description"] || "";
    requestBody.require = requestBody['require'] || false;

    Object.keys(requestObject['content']).forEach(key => {
      const content = requestObject['content'];
      const schemaObject = content[key].schema;
      let schema = schemaObject['$ref'].replace('#/components/schemas/', '') || ""
      contents.push({ type: key, schema: schema })
    })
    requestBody.content = contents;

    //falta si el resquest no es un esquema definido
    return requestBody;
  }


  public buildSchema(schemaName: string, schemaObject?: Object, yamlToObject?: Object): Schema {
    
    if (schemaObject == undefined || schemaObject == null) {
      if (yamlToObject != null || yamlToObject != undefined) {
        schemaObject = yamlToObject['components'].schemas[schemaName];
      } else {
        return null;
      }
    }

    let schema = new Schema();
    let properties = schemaObject['properties'];

    schema.name = schemaName;
    schema.type = schemaObject['type'];
    schema.required = schemaObject['required'] || null;
    schema.properties = [];

    Object.keys(properties).forEach(key => {
      schema.properties.push(this.makeProperty(key,properties[key]));
    })
    return schema;
  }
  public makeProperty(name:string, propertyYaml: Object): Property{
      let prop = new Property();
      if(propertyYaml['$ref']) {
        prop.name = propertyYaml['$ref'].replace('#/components/schemas/', '');
        prop.type = "Object";
        return prop;
      }
      if(propertyYaml['items']){
        const items = propertyYaml['items'];
        if(items['$ref'])
          prop.items = items['$ref'].replace('#/components/schemas/', '');
      }

      if(propertyYaml['enum']){
        prop.type = 'enum';
        prop.enum = {enum: propertyYaml['enum'], type: propertyYaml['type']}
      }
      prop.name = name;
      prop.type = propertyYaml['type'] ;
      prop.format = propertyYaml['format'];
      prop.minium = propertyYaml['minium'];
      prop.description = propertyYaml['description'];

      return prop;
  }
  /**
   * @param  {string} method método HTTP
   * @returns MetodosHttp: enum Definido en los modelos
   */
  private getMetodosHttp(method: string): MetodosHttp {
    if (method.toLowerCase().includes("get")) return MetodosHttp.GET;
    if (method.toLowerCase().includes("put")) return MetodosHttp.PUT;
    if (method.toLowerCase().includes("post")) return MetodosHttp.POST;
    if (method.toLowerCase().includes("head")) return MetodosHttp.HEAD;
    if (method.toLowerCase().includes("trace")) return MetodosHttp.TRACE;
    if (method.toLowerCase().includes("patch")) return MetodosHttp.PATCH;
    if (method.toLowerCase().includes("delete")) return MetodosHttp.DELETE;
    if (method.toLowerCase().includes("connet")) return MetodosHttp.CONNECT;
    if (method.toLowerCase().includes("options")) return MetodosHttp.OPTIONS;
    return null;
  }
}