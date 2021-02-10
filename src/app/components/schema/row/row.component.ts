import { Component, Input, OnInit } from '@angular/core';
import { Property } from 'src/app/models/ObjectsYaml';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {

  @Input() prop: Property;

  constructor() { }

  ngOnInit() {
  }
  colorbyType(typeObject: string): string {
    switch (typeObject.toLowerCase()) {
      case "integer" || "number" || "float" || "decimal" || "double":
        return "c-type-number";
      case "string":
        return "c-type-string";
      case "object":
        return "c-type-object";
      case "bool" || "boolean":
        return "c-type-bool";
      case "array" || "hasmap" || "map" || "list":
        return "c-type-array";
      default:
        return "c-type-default";
    }
  }
  getNameObject(referencia: string, isArray: boolean): string {
    let startResponse = isArray ? "array[" : "";
    let endResponse = isArray ? "]" : "";
    if (referencia && referencia.includes("#/components/schemas/")) {
      return startResponse + referencia.replace("#/components/schemas/", "") + endResponse;
    }
    return startResponse + "Object" + endResponse;
  }
}
