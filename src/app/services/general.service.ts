import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  public colorEndPoint(method: string): string {
    switch(method.toLowerCase()){
      case 'get':
        return 'bg-primary text-light';
      case 'put':
        return 'bg-warning text-dark'
      case 'post':
        return 'bg-success text-light';
      case 'delete':
        return 'bg-danger text-light'
    }
  }
}
