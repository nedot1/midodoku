import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { PainDocPage} from '../paindoc/paindoc';
import { OverviewPage} from '../overview/overview';
import { StatisticPage} from '../statistic/statistic';
import { LoginPage} from '../login/login';
import {MidataService} from '../../providers/MidataService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private midataService: MidataService) {
   if(!midataService.getisAuth())
       navCtrl.setRoot(LoginPage);
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
