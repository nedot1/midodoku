import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { PainDocPage} from '../paindoc/paindoc';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

          //this.navCtrl.push(PainDocPage);
      }
  pushPainDocPage(){
    this.navCtrl.push(PainDocPage);
  }

    }
