import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { PainDocPage} from '../paindoc/paindoc';
import { HomePage} from '../home/home';


@Component({
  selector: 'page-interference',
  templateUrl: 'interference.html'
})
export class InterferencePage {

constructor(public navCtrl: NavController) {

  }

  pushHomePage(){
    this.navCtrl.push(HomePage);
  }

}
