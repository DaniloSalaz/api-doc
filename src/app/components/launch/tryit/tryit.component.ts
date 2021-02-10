import { Component, OnInit } from '@angular/core';
import { SchemaService } from 'src/app/services/schema.service';

export interface ItemsParHeader {
  name: string
  values: Array<{key:string,value:string, isSend: boolean}>
}
interface MenuTryIt {
  title: string
  active: boolean
}

@Component({
  selector: 'app-tryit',
  templateUrl: './tryit.component.html',
  styleUrls: ['./tryit.component.scss']
})
export class TryitComponent implements OnInit {

  menuTry: MenuTryIt[];
  itemsParamasHeader: ItemsParHeader[]
  currentItemParHea: ItemsParHeader;

  objectoJsonExample: string
  heigthTextArea = '300px' 
  constructor(private schemaService: SchemaService) { }

  ngOnInit() {
    this.menuTry = [
      {
        title: 'Params',
        active: true
      },
      {
        title: 'Headers',
        active: false
      }
    ]

    this.itemsParamasHeader = [
      {
        name: 'Params',
        values: [{key:'name',value:'danilo', isSend: true}]
      },
      {
        name: 'Headers',
        values: [
          {key:'Accept', value:'applications/json', isSend: true},
          {key:'Content-Type',value:'applications/json', isSend: true},
          {key:'Key',value:'5d4b0a250cf1f341fbe1cc5ef9efbbd6e52ead6e560682392aaedbf738a0b1a6999ab83cd1c3898',isSend: true},
        ]
      }
    ]
    this.setCurrentItem('Params');
    this.schemaService.getSchemas().subscribe(list => {
      let schema = list['Pet']
      let objJsonExample = this.schemaService.assamblerJsonWithExample(schema.properties, list);
      this.objectoJsonExample = JSON.stringify(objJsonExample, undefined, 4);

    })
  }

  setCurrentItem(nameItem: String){
    this.itemsParamasHeader.forEach(item => {
      if(item.name === nameItem){
        this.currentItemParHea = item;
      }
    })
  }
  changeMenu(obj:MenuTryIt){
    this.menuTry.forEach(menu => {
      menu.active = false;
      if(menu.title == obj.title){
        menu.active = true;
        this.setCurrentItem(menu.title);
      }
    })
  }
  changeSend(obj: Object){
    obj['isSend'] = !obj['isSend']
  }

}
