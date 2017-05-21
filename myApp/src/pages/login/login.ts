// import { Component, ViewChild} from '@angular/core';
// import { NavController, MenuController } from 'ionic-angular';
// import {HomePage} from '../home/home';
// import {Midata} from 'midata';
// // Create a MIDATA-Object
// let midata: Midata;
//
// @Component({
//   selector: 'page-login',
//   templateUrl: 'login.html'
// })
// export class LoginPage {
//
//   // TODO : MODIFY THE PARAMETERS, SO THAT YOU ACCESS TO MIDATA
//   constructor(private navCtrl: NavController, public menu: MenuController) {
//
//     // Create new MIDATA-Object
//      midata = new Midata('https://test.midata.coop:9000', 'Workshop', 'secret');
//
//      this.menu = menu;
//   }
//
//   // Disable the Sidemenu
//   ionViewWillEnter() {
//       this.menu.get().enable(false)
//   }
//
//   ionViewWillLeave() {
//       this.menu.enable(true);
//   }
//
//   // TODO : MODIFY WITH YOUR CREDENTIALS, SO THAT YOU CAN LOG IN
//   login(){
//     midata.login('test@test.com', 'Testing12345').then(() => {
//       console.info('User id:', midata.user.id);
//       this.navCtrl.setRoot(HomePage);
//     },(error)=> {
// 	      console.log('There was an error!', error);
//     });
//   }
//
// }
