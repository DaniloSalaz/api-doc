import { IfStmt } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Property, Schema } from 'src/app/models/ObjectsYaml';
import { ReadYamlService } from 'src/app/services/read-yaml.service';
import { SchemaService } from 'src/app/services/schema.service';
import { TagServiceService } from 'src/app/services/tag-service.service';


@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss']
})
export class SchemaComponent implements OnInit {

  @Input() name: string
  @Input() objectSchema: Object

  schemas: Schema[]
  schema: Schema
  isArray: boolean;
  objectoJsonExample: string

  viewerSchema = {
    schema: true,
    json: false
  }
  constructor(private schemaService: SchemaService) {
  }

  ngOnInit() {
    this.isArray = false;
    this.schemaService.getSchemas().subscribe(list => {
      this.schemas = list;
      if (this.name) {
        list[this.name].properties.forEach(prop => {
          if (prop.ref || prop.items || prop.enum) {
            prop['show'] = false
          }
        })
        this.schema = list[this.name];
      } else if (this.objectSchema) {
         if (this.objectSchema['type'] && this.objectSchema['type'] == 'array') {
          this.isArray = true
          if(this.objectSchema['items'].$ref){
            this.name = this.getNameObject(this.objectSchema['items'].$ref);
            this.schema = this.schemas[this.name];
          }else{
            this.schema = this.schemaService.getSchemaByObject(this.objectSchema)
          }
          
        }else if (this.objectSchema['$ref']) {
          this.schema = this.schemas[this.getNameObject(this.objectSchema['$ref'])];
        }else {
          this.schema = this.schemaService.getSchemaByObject(this.objectSchema)
        }
      }  
      let objJsonExample = this.schemaService.assamblerJsonWithExample(this.schema.properties, this.schemas); //this.prettyPrint(this.assamblerJsonWithExample(this.schema.properties,this.isArray));
      this.objectoJsonExample = this.schemaService.prettyPrint(objJsonExample);
    });
  }


  showReference(property: Property): void {
    this.schema.properties.forEach(prop => {
      if (prop == property) {
        prop['show'] = !prop['show'];
      }
    })

  }

  parseStringToProperty(value: string): Property {
    let prop = new Property();
    prop.name = value;
    prop.type = '';
    return prop;
  }

  // assamblerJsonWithExample(properties: Property[], isArray?:boolean): Object {
  //   let objJson = {};
    
  //   properties.forEach(prop => {
  //     if (prop.type == "array" || prop.items) {
  //       objJson[prop.name] = this.getExampleByType(prop.items.type);
  //       if (prop.items.enum) {
  //         objJson[prop.name] = prop.items.enum;
  //       }
  //       if (prop.items.isRef) {
  //         objJson[prop.name] = [this.assamblerJsonWithExample(this.schemas[prop.items.type].properties)]
  //       }

  //     } else if (prop.enum) {
  //       objJson[prop.name] = prop.enum;

  //     } else if (prop.ref) {
  //       objJson[prop.name] = this.assamblerJsonWithExample(this.schemas[prop.ref].properties);
  //     }
  //     else {
  //       objJson[prop.name] = this.getExampleByType(prop.type);
  //     }

  //   })
    
  //   return isArray ? [objJson]: objJson;
  // }
  // getExampleByType(typeObject: string,): any {
  //   switch (typeObject.toLowerCase()) {
  //     case "integer" || "number" || "float" || "decimal" || "double":
  //       return 0;
  //     case "string":
  //       return 'textExample';
  //     case "bool" || "boolean":
  //       return "true";
  //     default:
  //       return '';
  //   }
  // }


  // replacer(match, pIndent, pKey, pVal, pEnd) {
  //   var key = '<span class=json-key>';
  //   var val = '<span class=json-value>';
  //   var str = '<span class=json-string>';
  //   var r = pIndent || '';
  //   if (pKey)
  //     r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
  //   if (pVal)
  //     r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
  //   return r + (pEnd || '');
  // }

  // prettyPrint(obj: Object) {
  //   var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
  //   return JSON.stringify(obj, null, 3)
  //     .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
  //     .replace(/</g, '&lt;').replace(/>/g, '&gt;')
  //     .replace(jsonLine, this.replacer);
  // }

   getNameObject(referencia: string): string {
    if (referencia && referencia.includes("#/components/schemas/")) {
      return referencia.replace("#/components/schemas/", "");
    }
    return "";
  }

  changeViwer(key: string) {
    Object.keys(this.viewerSchema).map(key => {
      this.viewerSchema[key] = false;
    });
    this.viewerSchema[key] = true;
  }
}
