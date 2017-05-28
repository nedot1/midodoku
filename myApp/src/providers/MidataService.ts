import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MidataService {

  isAuth: boolean = false;

  constructor() {
  }

  getisAuth(){
    return this.isAuth
  }

  setisAuth(value : boolean){
    this.isAuth = value;
  }

}
