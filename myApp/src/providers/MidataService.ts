import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Midata, Bundle, Resource} from 'midata';

// Create a MIDATA-Object
let midata: Midata;
let painBundle: Bundle;

@Injectable()
export class MidataService {

  isAuth: boolean = false;

  constructor() {
    painBundle = new Bundle("transaction");
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

addEntryToBundle(observation: Resource) {
  painBundle.addEntry("GET", "Observation", observation).then((_) => {
    console.log(painBundle);
  });

}

saveBundle(){
  midata.save(painBundle);
}

logout(){
  this.setMidata(null);
  this.setisAuth(false);
}


}
