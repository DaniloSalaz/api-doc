import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Schema, Property } from '../models/ObjectsYaml';
import { ReadYamlService } from './read-yaml.service';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  constructor(private yamlService: ReadYamlService ) { }

  public getSchemas(): Observable<Schema[]> {
    let subject = new Subject<Schema[]>();

    this.yamlService.getListSchemasYaml().subscribe(list => {
        let schemas: Schema[] = [new Schema()];

         list.forEach(sch => {
           schemas[sch['name']] = this.buildSchema(sch['name'], sch['schema']);
         })
         subject.next(schemas);
    });

    return subject.asObservable();
  }

  public getSchemaByObject(schemaObject?: Object): Schema {
    let schema = null;
    schemaObject['type'] = schemaObject['type'] ? schemaObject['type'] : "object";
    schema = this.buildSchema("", schemaObject);
    return schema;

  }
  public getSchemaByName(schemaName: string): Observable<Schema> {
    let subject = new Subject<Schema>();
    if (schemaName != null) {
      this.yamlService.getSchemaYaml(schemaName).subscribe(schema =>{
        subject.next(this.buildSchema(schemaName, schema));
      })
    }
    return  subject.asObservable();

  }

  private buildSchema(schemaName: string, schemaObject: Object): Schema {
    
    let schema = new Schema();

    let properties = schemaObject['properties'];

    schema.name = schemaName;
    schema.type = schemaObject['type'];
    schema.required = schemaObject['required'] || null;
    schema.properties = [];

    if(properties){
      Object.keys(properties).forEach(key => {
        schema.properties.push(this.setProperty(key,properties[key]));
      })
    }else{
      Object.keys(schemaObject).forEach(key => {
        if(schemaObject[key].type) {
          schema.properties.push(this.setProperty(key,schemaObject[key]))
        }
      })
    }
    return schema;
  }

  private setProperty(name:string, propertyYaml: Object): Property{
      let prop = new Property();
      
      prop.name = name;
      prop.type = propertyYaml['type'] ;
      if(propertyYaml['format']) prop.format = propertyYaml['format'];
      if(propertyYaml['minium']) prop.minium = propertyYaml['minium'];
      if(propertyYaml['description']) prop.description = propertyYaml['description'];
      if(propertyYaml['enum']) prop.enum = propertyYaml['enum'];
      
      if(propertyYaml['$ref']) {
        prop.ref = propertyYaml['$ref'].replace('#/components/schemas/', '');
        prop.type = prop.ref;
      }
      if(propertyYaml['items']){
        const items = propertyYaml['items'];
        
        prop.items = {isRef: false, type: null, enum: null};
        prop.items.type = items['type'] ? items['type'] : null; 
        if(items['enum']) prop.items.enum = items['enum'];

        if(items['$ref']){
          prop.items.type = items['$ref'].replace('#/components/schemas/', '');
          prop.items.isRef = true;
        }
        
      }
      return prop;
  }

  /*---- Construir Example Json a partir Properties ----*/
  public assamblerJsonWithExample(properties: Property[], schemas: Schema[], isArray?:boolean, ): Object {
    let objJson = {};
    properties.forEach(prop => {
      if (prop.type == "array" || prop.items) {
        objJson[prop.name] = this.getExampleByType(prop.items.type);
        if (prop.items.enum) {
          objJson[prop.name] = prop.items.enum;
        }
        if (prop.items.isRef) {
          objJson[prop.name] = [this.assamblerJsonWithExample(schemas[prop.items.type].properties, schemas)]
        }

      } else if (prop.enum) {
        objJson[prop.name] = prop.enum[0];

      } else if (prop.ref) {
        objJson[prop.name] = this.assamblerJsonWithExample(schemas[prop.ref].properties, schemas);
      }
      else {
        objJson[prop.name] = this.getExampleByType(prop.type);
      }

    })
    
    return isArray ? [objJson]: objJson;
  }

  public prettyPrint(obj: Object) {
    var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
    return JSON.stringify(obj, null, 3)
      .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(jsonLine, this.replacer);
  }

  private getExampleByType(typeObject: string,): any {
    switch (typeObject.toLowerCase()) {
      case "integer" || "number" || "float" || "decimal" || "double":
        return 0;
      case "string":
        return 'textExample';
      case "bool" || "boolean":
        return "true";
      default:
        return '';
    }
  }

  private replacer(match, pIndent, pKey, pVal, pEnd) {
    var key = '<span class=json-key>';
    var val = '<span class=json-value>';
    var str = '<span class=json-string>';
    var r = pIndent || '';
    if (pKey)
      r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
    if (pVal)
      r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
    return r + (pEnd || '');
  }

  

  private getNameObject(referencia: string): string {
    if (referencia && referencia.includes("#/components/schemas/")) {
      return referencia.replace("#/components/schemas/", "");
    }
    return "";
  }
}
