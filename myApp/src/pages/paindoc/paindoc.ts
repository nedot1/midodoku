import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { HomePage} from '../home/home';
import { InterferencePage} from '../interference/interference';


@Component({
  selector: 'page-paindoc',
  templateUrl: 'paindoc.html'
})
export class PainDocPage {

constructor(public navCtrl: NavController) {

  }

  pushInterferencePage(){
    this.navCtrl.push(InterferencePage);
  }

  pushHomePage(){
    this.navCtrl.push(HomePage);
  }
}
