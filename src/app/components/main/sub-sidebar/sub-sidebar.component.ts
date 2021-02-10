import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { MenuService } from 'src/app/services/menu.service';

export interface PathSubSidebar{
  path: string;
  method: string;
  active: boolean;
}

@Component({
  selector: 'app-sub-sidebar',
  templateUrl: './sub-sidebar.component.html',
  styleUrls: ['./sub-sidebar.component.scss']
})
export class SubSidebarComponent implements OnInit {


  constructor(private menuService: MenuService, private generalService: GeneralService) { }

  paths: PathSubSidebar[];
  nameSubject: string;

  ngOnInit() {
    this.getSubjectPath();
    this.getSubjectName();
  }
  getSubjectPath(){
    this.menuService.paths.subscribe(paths => {
      this.paths = []
      let i = 0;
      paths.forEach(p => {
        Object.keys(p['methods']).forEach(obj => {
          let act = i++ == 0? true: false;
          this.paths.push({path:p.path, method: obj, active: act})
        })
        
      });
    });
  }
  getSubjectName() {
    this.menuService.subjectPath.subscribe(name => {this.nameSubject = name});
  }

  colorEndPoint(method: string): string {
    return this.generalService.colorEndPoint(method);
  }

  changePath(path: PathSubSidebar){
    
    this.paths.forEach(p => {
      if (p === path) {
        p.active = true;
      }else{
        p.active = false;
      }
      
    })
  }

}
