import { Component, ViewChild} from '@angular/core';
import { NavController, MenuController, ViewController } from 'ionic-angular';
import {HomePage} from '../home/home';
import { TabsPage } from '../tabs/tabs';
import {Midata} from 'midata';
import {MidataService} from '../../providers/MidataService';

// Create a MIDATA-Object
let midata: Midata;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  username : string;
  password : string;

  constructor(private navCtrl: NavController, public menu: MenuController, private midataService: MidataService, public viewCtrl: ViewController) {
     this.navCtrl = navCtrl;
  }

  login(){
    let midata = this.midataService.getMidata();
    console.info("Username : " + this.username);
    console.info("Password : " + this.password);

    midata.login(this.username, this.password).then(() => {
      console.info('User id:', midata.user.id);
        this.midataService.setisAuth(true);
        this.midataService.setMidata(midata);
        console.log("OK");
        this.dismiss();
    },(error)=> {
	      console.log('There was an error!', error);
    });

    // midata.login('developer@midodoku.ch', 'Test1234').then(() => {
    //   console.info('User id:', midata.user.id);
    //   this.midataService.setisAuth(true);
    //   this.midataService.setMidata(midata);
    //   //this.navCtrl.setRoot(TabsPage);
    //   this.dismiss();
    // },(error)=> {
	  //     console.info('There was an error!', error);
    // });
  }

  dismiss() {
       this.viewCtrl.dismiss();
  }



}
