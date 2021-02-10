import { Component, HostListener, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { ReadYamlService } from 'src/app/services/read-yaml.service';
import { componentMethodParams } from '../method-http/method-http.component';

export interface Path{
  path: string;
  method: string;
  objMethod: Object
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  objcomMetPar: componentMethodParams;
  subjectPath: string
  paths: Path[]
  constructor(private menuService: MenuService, private yamlService: ReadYamlService) { }

  ngOnInit() {
    this.setSubjectPath();
    
  }

  setObjectParams() {
    this.yamlService.getPathYaml(this.subjectPath).subscribe(res => {
      this.paths = [];
      res.forEach(p => {
        Object.keys(p['methods']).forEach(keyMet => {
          let met = p['methods']; 
          this.paths.push({path:p['path'], method: keyMet, objMethod:met[keyMet]})
        });
      });
      this.menuService.setPaths(res);
    })
  }
  buildComponentMethod(path: string, nameMet: string, met: Object) {
    let objcomMetPar: componentMethodParams = {
      pathEndPoint: path,
      objPath:  met,
      methodName: nameMet
    };
    return objcomMetPar;
  }
  setSubjectPath(){
    this.menuService.subjectPath.subscribe(s => {
      this.subjectPath = s;
      this.setObjectParams();
    })
  }
  
  @HostListener("visibilitychange", ['$event'])
  doSomethingOnInternalScroll($event:Event){
    let scrollOffset = $event.srcElement;
    console.log("scroll: ", scrollOffset);
  }
  

}
