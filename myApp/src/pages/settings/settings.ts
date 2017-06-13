import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { LoginPage} from '../login/login';
import { TabsPage } from '../tabs/tabs';
import {MidataService} from '../../providers/MidataService';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, private midataService: MidataService) {

  }

    pushLoginPage(){
      this.navCtrl.setRoot(TabsPage);
      this.midataService.logout()
    }
    
}
