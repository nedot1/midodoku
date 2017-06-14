import { Component, NgZone } from '@angular/core';
import { NavController} from 'ionic-angular';
import { HomePage} from '../home/home';
import { InterferencePage} from '../interference/interference';
import {Midata, Resource, Observation, Survey} from 'midata';
let midata: Midata;
import {MidataService} from '../../providers/MidataService';
import * as GLOBALS from '../../typings/globals'

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


  getSelectedPainLocation(): string {

    if(this.painLocation === "ArmLeft"){
      return GLOBALS.SNOMED_LEFT_HAND
    }
    else if(this.painLocation === "ArmRight"){
      return GLOBALS.SNOMED_RIGHT_ARM
    }
    else if(this.painLocation === "Stomach"){
      return GLOBALS.SNOMED_STOMACH
    }
    else if(this.painLocation === "LegLeft"){
      return GLOBALS.SNOMED_LEFT_LEG
    }
    else if(this.painLocation === "LegRight"){
      return GLOBALS.SNOMED_RIGHT_LEG
    }
    else if(this.painLocation === "Chest"){
      return GLOBALS.SNOMED_CHEST
    }
    else if(this.painLocation === "FootLeft"){
      return GLOBALS.SNOMED_LEFT_FOOT
    }
    else if(this.painLocation === "FootRight"){
      return GLOBALS.SNOMED_RIGHT_FOOT
    }
    else if(this.painLocation === "HandLeft"){
      return GLOBALS.SNOMED_LEFT_HAND
    }
    else if(this.painLocation === "HandRight"){
      return GLOBALS.SNOMED_RIGHT_HAND
    }
    else if(this.painLocation === "Head"){
      return GLOBALS.SNOMED_HEAD
    }
    else if(this.painLocation === "Neck"){
      return GLOBALS.SNOMED_NECK
    }
    else if(this.painLocation === "Back"){
      return GLOBALS.SNOMED_BACK
    }
    return "0";
  }

  getSelectedPainDisplay(): string {

    if(this.painLocation === "ArmLeft"){
      return GLOBALS.SNOMED_LEFT_ARM_DISPLAY
    }
    else if(this.painLocation === "ArmRight"){
      return GLOBALS.SNOMED_RIGHT_ARM_DISPLAY
    }
    else if(this.painLocation === "Stomach"){
      return GLOBALS.SNOMED_STOMACH_DISPLAY
    }
    else if(this.painLocation === "LegLeft"){
      return GLOBALS.SNOMED_LEFT_LEG_DISPLAY
    }
    else if(this.painLocation === "LegRight"){
      return GLOBALS.SNOMED_RIGHT_LEG_DISPLAY
    }
    else if(this.painLocation === "Chest"){
      return GLOBALS.SNOMED_CHEST_DISPLAY
    }
    else if(this.painLocation === "FootLeft"){
      return GLOBALS.SNOMED_LEFT_FOOT_DISPLAY
    }
    else if(this.painLocation === "FootRight"){
      return GLOBALS.SNOMED_RIGHT_FOOT_DISPLAY
    }
    else if(this.painLocation === "HandLeft"){
      return GLOBALS.SNOMED_LEFT_HAND_DISPLAY
    }
    else if(this.painLocation === "HandRight"){
      return GLOBALS.SNOMED_RIGHT_HAND_DISPLAY
    }
    else if(this.painLocation === "Head"){
      return GLOBALS.SNOMED_HEAD_DISPLAY
    }
    else if(this.painLocation === "Neck"){
      return GLOBALS.SNOMED_NECK_DISPLAY
    }
    else if(this.painLocation === "Back"){
      return GLOBALS.SNOMED_BACK_DISPLAY
    }
    return "0";
  }


  getSelectedPainSensation(sensation: string): string{

    if(sensation === "bohrend"){
    return GLOBALS.SNOMED_GNAWING_PAIN;
    }
    if(sensation === "brennend"){
    return GLOBALS.SNOMED_BURNING_PAIN;
    }
    if(sensation === "drückend"){
    return GLOBALS.SNOMED_CRUSHING_PAIN;
    }
    if(sensation === "dumpf"){
    return GLOBALS.SNOMED_DULL_PAIN;
    }
    if(sensation === "klopfend"){
    return GLOBALS.SNOMED_THROBBING_PAIN;
    }
    if(sensation === "krampfend"){
    return GLOBALS.SNOMED_CRAMPING_PAIN;
    }
    if(sensation === "stechend"){
    return GLOBALS.SNOMED_SHARP_PAIN;
    }
    if(sensation === "ziehend"){
    return GLOBALS.SNOMED_TIGHTENING_PAIN;
    }
    return "0";
  }

  savePain(){

       let painValueObservation : Observation;

       painValueObservation = new Observation(new Date(), {"coding": [
           {
               "system": "http://loinc.org",
               "code": '72514-3',
               "display": 'Pain severity'
           }
       ]}, Survey, {_quantity: { "value" : this.painValue}});

       painValueObservation.addProperty(
         "bodySite", {
            "coding": [
               {
                  "system": "http://snomed.info/sct",
                  "code": this.getSelectedPainLocation(),
                  "display": this.getSelectedPainDisplay()
               }
            ]
          }
       );
       console.log(painValueObservation);


       let painSensationObservation : Observation;

       painSensationObservation = new Observation(new Date(), {"coding": [
      {
         "system": "http://snomed.info/sct",
         "code": "410720000",
         "display": "Pain by sensation quality"
      }
   ]}, Survey, {_quantity: { "value" : 0}});

   painSensationObservation.addProperty(
     "bodySite", {
        "coding": [
           {
              "system": "http://snomed.info/sct",
              "code": this.getSelectedPainLocation(),
              "display": this.getSelectedPainDisplay()
           }
        ]
      }
   );

   for(let painSens of this.painSensation){

     console.log(painSens);

     painSensationObservation.addComponent(
          {
             "code": {
                "coding": [{
                   "system":"http://snomed.info/sct",
                   "code": this.getSelectedPainSensation(painSens),
                   "display": painSens
              }]
             }
          }
     );
   }

       console.log(painSensationObservation);

       this.midataService.addEntryToBundle(painValueObservation);
       this.midataService.addEntryToBundle(painSensationObservation);
      }


  pushHomePage(){
    this.navCtrl.push(HomePage);
  }
}
