import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { PainDocPage} from '../paindoc/paindoc';
import { OverviewPage} from '../overview/overview';
import { StatisticPage} from '../statistic/statistic';

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

  pushOverviewPage(){
    this.navCtrl.push(OverviewPage);
  }

  pushStatisticPage(){
    this.navCtrl.push(StatisticPage);
  }

    }
