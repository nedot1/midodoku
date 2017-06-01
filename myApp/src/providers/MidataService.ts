import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Midata} from 'midata';

// Create a MIDATA-Object
let midata: Midata;

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

setMidata(midataToken: Midata){
  midata = midataToken;
}

getMidata(){
  return midata;
}

}
