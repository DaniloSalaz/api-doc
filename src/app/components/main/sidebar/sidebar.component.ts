import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuSideBar, SidebarService } from 'src/app/services/sidebar.service';
import { MenuService } from 'src/app/services/menu.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  menus: MenuSideBar[];
  
  constructor(public sidebarservice: SidebarService, private menuService: MenuService) { }

  ngOnInit() {
    this.menus = this.sidebarservice.getMenuList();
    this.changePath(null, 'pet');
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  changePath(currentMenu: MenuSideBar, subject: string) {
    this.menuService.setSubjectPath(subject);
    this.menus.forEach(m => {
      if(m == currentMenu){
        m.submenus.forEach(element => {
          if(element.title === subject){
            element.active = true;
          }else{
            element.active = false;
          }
        });
      }
    });
  }
}
