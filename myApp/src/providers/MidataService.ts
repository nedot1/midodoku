import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Midata, Bundle, Resource} from 'midata';

// Create a MIDATA-Object

@Injectable()
export class MidataService {

  isAuth: boolean = false;
  midata: Midata;
  painBundle: Bundle;

  constructor() {
    this.midata = new Midata('https://test.midata.coop:9000', 'miDoDoku', 'Test12345');
  }

  getMidata(){
    return this.midata;
  }

  getisAuth(){
    return this.isAuth
  }

  setisAuth(value : boolean){
    this.isAuth = value;
  }

setMidata(midataToken: Midata){
  this.midata = midataToken;
}

flushBundle(){
  this.painBundle = undefined;
}


addEntryToBundle(observation: Resource) {
if(typeof this.painBundle != "undefined"){
  this.painBundle.addEntry("POST", "Observation", observation);
} else {
  console.log("bundle not set");
  this.painBundle = new Bundle("transaction");
  this.painBundle.addEntry("POST", "Observation", observation);
}

}

saveBundle(){
  return this.midata.save(this.painBundle);
}

logout(){
  this.setMidata(null);
  this.setisAuth(false);
}

}
