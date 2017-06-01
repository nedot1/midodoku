import { Component, NgZone} from '@angular/core';
import { NavController} from 'ionic-angular';
import { HomePage} from '../home/home';
import { Midata } from 'midata';
let midata : Midata;
import {MidataService} from '../../providers/MidataService';


@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html'
})
export class OverviewPage {

  entries: Array<{date: string, painLocation: string, painSensation: string, painValue: string,
  activity: string, mood: string, walkingAbility: string, work: string, socialLife: string, sleep: string,
  enjoyment: string, score: string
  }>;

  day: any;
  month: any;
  year: any;
  hours: any;
  minutes: any;

constructor(public navCtrl: NavController, private ngZone: NgZone, private midataService: MidataService) {

      midata = new Midata('https://test.midata.coop:9000', 'miDoDoku', 'Test12345');

      midata = this.midataService.getMidata();

      this.update();
  }


  update(){
      midata.search('Observation', {code: "http://loinc.org|72514-3"}).then((resources)=> {
        this.ngZone.run(() => {

          // CLEAR ARRAY
          this.entries = [];

          // GO THROUGH OBJECT
          for(let i in resources){

            console.info(resources[i].toJson().effectiveDateTime);

            var resourceDate = new Date(resources[i].toJson().effectiveDateTime);

            this.day = resourceDate.getDate();
            this.day = this.day <= 9 ? "0" + this.day : this.day;

            this.month = resourceDate.getMonth()+1;
            this.month = this.month <= 9 ? "0" + this.month : this.month;

            this.year = resourceDate.getFullYear();
            this.hours = resourceDate.getHours();
            this.minutes = resourceDate.getMinutes();
            this.minutes = this.minutes <= 9 ? "0" + this.minutes : this.minutes;

            this.entries.push({
                date: this.day +"."+this.month+"."+this.year + " " + this.hours + ":" + this.minutes,
                painLocation: 'Fuss links ',
                painSensation: 'Brennend',
                painValue: resources[i].toJson().valueQuantity.value,
                activity: '5',
                mood: '5',
                walkingAbility: '5',
                work: '5',
                socialLife: '5',
                sleep: '5',
                enjoyment: '5',
                score: '5'
            });
          }
        });
      });
  }

}
