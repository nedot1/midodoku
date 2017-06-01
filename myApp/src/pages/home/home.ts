import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, private midataService: MidataService, public modalCtrl: ModalController) {
   if(!midataService.getisAuth())
       this.showLogin();
   //navCtrl.setRoot(LoginPage);
  }


  showLogin() {
   let loginModal = this.modalCtrl.create(LoginPage);
   loginModal.present();
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
