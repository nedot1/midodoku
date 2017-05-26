import { Component, NgZone} from '@angular/core';
import { NavController} from 'ionic-angular';
import { HomePage} from '../home/home';
import { Midata } from 'midata';
let midata : Midata;


@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html'
})
export class OverviewPage {

  entries: Array<{date: string, painLocation: string, painSensation: string, painValue: string,
  activity: string, mood: string, walkingAbility: string, work: string, socialLife: string, sleep: string,
  enjoyment: string
  }>;

  day: any;
  month: any;
  year: any;
  hours: any;
  minutes: any;

constructor(public navCtrl: NavController, private ngZone: NgZone) {

      midata = new Midata('https://test.midata.coop:9000', 'miDoDoku', 'Test12345');

      midata.login('developer@midodoku.ch', 'Test1234').then(() => {
        console.info('Logged in');
        this.update();
      },(error)=> {
          console.log('There was an error!', error)
      });

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
            this.month = resourceDate.getMonth();
            this.year = resourceDate.getFullYear();
            this.hours = resourceDate.getHours();
            this.minutes = resourceDate.getSeconds();
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
                enjoyment: '5'
            });

          }



        });
      });
  }

}
