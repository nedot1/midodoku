import { Component, ViewChild} from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import {HomePage} from '../home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {Midata} from 'midata';

// Create a MIDATA-Object
let midata: Midata;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {


  username : string;
  password : string;


  constructor(private navCtrl: NavController, public menu: MenuController) {

    // Create new MIDATA-Object
     midata = new Midata('https://test.midata.coop:9000', 'Workshop', 'secret');
  }


  login(){

    console.info("Username : " + this.username);
    console.info("Password : " + this.password);

    midata.login(this.username, this.password).then(() => {
      console.info('User id:', midata.user.id);
      this.navCtrl.setRoot(HomePage);
    },(error)=> {
	      console.log('There was an error!', error);
    });



    // midata.login('developer@midodoku.ch', 'Test1234').then(() => {
    //   console.info('User id:', midata.user.id);
    //   //this.navCtrl.setRoot(HomePage);
    // },(error)=> {
	  //     console.log('There was an error!', error);
    // });




  }

}
