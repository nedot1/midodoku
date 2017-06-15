import { Component, NgZone } from '@angular/core';
import { NavController} from 'ionic-angular';
import { PainDocPage} from '../paindoc/paindoc';
import { HomePage} from '../home/home';
import {Midata, Resource, Observation, Survey} from 'midata';
import {MidataService} from '../../providers/MidataService';


@Component({
  selector: 'page-interference',
  templateUrl: 'interference.html'
})
export class InterferencePage {

  // ADD : START
  // Init ngModel variable for the range sliders
  activity : any;
  mood : any;
  walkingAbility : any;
  work : any;
  socialLife : any;
  sleep : any;
  vitality : any;
  // ADD : END

constructor(public navCtrl: NavController, private zone: NgZone, private midataService: MidataService) {
  }

  abortAction(){
    this.midataService.flushBundle();
    this.navCtrl.push(HomePage);
  }

  saveInterference(){

      let activityObservation : Observation;

      activityObservation = new Observation(this.midataService.getTimestamp(), {"coding": [
        {
          "system": "http://loinc.org",
          "code": '77566-8',
          "display": 'Interferance of pain on general activity'
        }
      ]}, Survey, {_quantity: { "value" : this.activity}});


      let moodObservation : Observation;

      moodObservation = new Observation(this.midataService.getTimestamp(), {"coding": [
        {
          "system": "http://loinc.org",
          "code": '77567-6',
          "display": 'Interferance of pain on mood'
        }
      ]}, Survey, {_quantity: { "value" : this.mood}});

      let walkingAbilityObservation : Observation;

      walkingAbilityObservation = new Observation(this.midataService.getTimestamp(), {"coding": [
        {
          "system": "http://loinc.org",
          "code": '77568-4',
          "display": 'Interferance of pain on walking ability'
        }
      ]}, Survey, {_quantity: { "value" : this.walkingAbility}});

      let workObservation : Observation;

      workObservation = new Observation(this.midataService.getTimestamp(), {"coding": [
        {
          "system": "http://loinc.org",
          "code": '77569-2',
          "display": 'Interferance of pain on normal work'
        }
      ]}, Survey, {_quantity: { "value" : this.work}});

      let socialLifeObservation : Observation;

      socialLifeObservation = new Observation(this.midataService.getTimestamp(), {"coding": [
        {
          "system": "http://loinc.org",
          "code": '77570-0',
          "display": 'Interferance of pain on relations with other people'
        }
      ]}, Survey, {_quantity: { "value" : this.socialLife}});

      let sleepObservation : Observation;

      sleepObservation = new Observation(this.midataService.getTimestamp(), {"coding": [
        {
          "system": "http://loinc.org",
          "code": '77571-8',
          "display": 'Interferance of pain on sleep'
        }
      ]}, Survey, {_quantity: { "value" : this.sleep}});

      let vitalityObservation : Observation;

      vitalityObservation = new Observation(this.midataService.getTimestamp(), {"coding": [
        {
          "system": "http://loinc.org",
          "code": '77572-6',
          "display": 'Interferance of pain on enjoyment of life'
        }
      ]}, Survey, {_quantity: { "value" : this.vitality}});


      this.midataService.addEntryToBundle(activityObservation);
      this.midataService.addEntryToBundle(moodObservation);
      this.midataService.addEntryToBundle(walkingAbilityObservation);
      this.midataService.addEntryToBundle(workObservation);
      this.midataService.addEntryToBundle(socialLifeObservation);
      this.midataService.addEntryToBundle(sleepObservation);
      this.midataService.addEntryToBundle(vitalityObservation);

      this.midataService.saveBundle().then(_ => {
        console.log("Speichern erfolgreich");
        this.midataService.flushBundle();
        this.midataService.flushTimestamp();
        this.navCtrl.push(HomePage);
      }).catch((error) => {
        console.log(error);
      });
  }
}
