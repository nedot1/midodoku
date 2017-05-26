import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { HomePage} from '../home/home';
import { InterferencePage} from '../interference/interference';


@Component({
  selector: 'page-paindoc',
  templateUrl: 'paindoc.html'
})

export class PainDocPage {

now : any = new Date();

constructor(public navCtrl: NavController) {

  // ADD two hours

  this.now.setHours(this.now.getHours() + 2)
  this.now = this.now.toISOString();
  //console.info(this.now);

  }

  pushInterferencePage(){
    this.navCtrl.push(InterferencePage);
  }

  pushHomePage(){
    this.navCtrl.push(HomePage);
  }
}
