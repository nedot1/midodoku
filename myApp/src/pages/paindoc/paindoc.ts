import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { HomePage} from '../home/home';
import { InterferencePage} from '../interference/interference';
import {Midata, Resource} from 'midata';
let midata: Midata;

@Component({
  selector: 'page-paindoc',
  templateUrl: 'paindoc.html'
})

export class PainDocPage {

now : any = new Date();
painValue: number = 0;
painLocation : string;
painSensation : string;

constructor(public navCtrl: NavController) {

  // ADD two hours

  this.now.setHours(this.now.getHours() + 2)
  this.now = this.now.toISOString();
  //console.info(this.now);

  // Create MIDATA-Object
        midata = new Midata('https://test.midata.coop:9000', 'miDoDoku', 'Test12345');

        // Login
        midata.login('developer@midodoku.ch', 'Test1234').then(() => {
          console.info('Logged in');
        },(error)=> {
            console.log('There was an error!', error)
        });



  }

  pushInterferencePage(){
    this.savePain()
    this.navCtrl.push(InterferencePage);
  }


  savePain(){

        let painValueObserveration = {
                         "resourceType": "Observation",
                         "status": "final",
                         "category": [
                             {
                                 "coding": [
                                     {
                                         "system": "http://hl7.org/fhir/observation-category",
                                         "code": "survey",
                                         "display": "Survey"
                                     }
                                 ],
                                 "text": "Survey"
                             }
                         ],
                         "code": {
                             "coding": [
                                 {
                                     "system": "http://loinc.org",
                                     "code": '72514-3',
                                     "display": 'Pain severity'
                                 }
                             ]
                         },
                         "effectiveDateTime": new Date(),
                         "valueQuantity": {
                             "value": this.painValue,
                         }
                };
              // Save the resource
              midata.save(painValueObserveration).then(()=> {
                  console.log('Saved PainValue');
              },(error) =>{
                  console.log('There was an error!', error)
              });
      }



  pushHomePage(){
    this.navCtrl.push(HomePage);
  }
}
