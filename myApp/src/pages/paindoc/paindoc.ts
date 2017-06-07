import { Component, NgZone } from '@angular/core';
import { NavController} from 'ionic-angular';
import { HomePage} from '../home/home';
import { InterferencePage} from '../interference/interference';
import {Midata, Resource} from 'midata';
let midata: Midata;
import {MidataService} from '../../providers/MidataService';

@Component({
  selector: 'page-paindoc',
  templateUrl: 'paindoc.html'
})

export class PainDocPage {

date : any = new Date();
painValue: number = 0;
painLocation : string;
painSensation : string;

constructor(public navCtrl: NavController, private zone: NgZone, private midataService: MidataService) {

  // ADD two hours

  this.date.setHours(this.date.getHours() + 2)
  this.date = this.date.toISOString();
  //console.info(this.now);

  // Create MIDATA-Object
        midata = new Midata('https://test.midata.coop:9000', 'miDoDoku', 'Test12345');

        midata = this.midataService.getMidata();
  }

  onChange(){
    console.log('UI has refreshed');
    this.zone.run(() => {
            console.log('UI has refreshed');
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
