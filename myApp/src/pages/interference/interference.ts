import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { PainDocPage} from '../paindoc/paindoc';
import { HomePage} from '../home/home';


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

constructor(public navCtrl: NavController) {

  }

  pushHomePage(){

      // ADD : START
     // Print all values from range sliders out in console
     console.info("Allgemeine Aktivität : " + this.activity);
     console.info("Stimmung : " + this.mood);
     console.info("Gehvermögen : " + this.walkingAbility);
     console.info("Normale Arbeit (sowohl ausserhalb des Hauses als auch Hausarbeit) : " + this.work);
     console.info("Beziehung zu anderen Menschen : " + this.socialLife);
     console.info("Schlaf : " + this.sleep);
     console.info("Lebensfreude : " + this.vitality);
     // ADD : END


    this.navCtrl.push(HomePage);
  }

}
