import { Injectable } from '@angular/core';
import { ReadYamlService } from './read-yaml.service';

export interface MenuSideBar{
  title: string
  type: string
  icon?: string
  active?: boolean
  submenus?: [{
    title: string
    active: boolean
  }]

}
@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  menus: MenuSideBar[] = [
    {
      title: 'general',
      type: 'header'
    }

  ];
  constructor(private yamlService:ReadYamlService) { 
    this.setSchemas();
    this.setSubjects();
  }

  public setSchemas(){    
    this.yamlService.getListSchemasYaml().subscribe( sch => {
      
      let menu = {
        title: 'Schemas',
        icon: 'fa fa-folder-open',
        active: false,
        type: 'dropdown'
      }
      
      menu['submenus'] = sch.map(tag => {
        return {title: tag['name'],active: false}
      });
      
      this.menus.push(menu);
    });
  }
  public setSubjects(){    
    this.yamlService.getTagsYaml().subscribe( tags => {
      
      let menu = {
        title: 'Subjects',
        icon: 'fa fa-folder-open',
        active: true,
        type: 'dropdown'
      } 
      
      menu['submenus'] = tags.map(tag => {
        return {title: tag['name'], active: false}
      });

      this.menus.push(menu);
    });
  }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

}