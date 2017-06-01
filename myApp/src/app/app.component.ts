import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NavController} from 'ionic-angular';


import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage} from '../pages/login/login';

// Service
import {MidataService} from '../providers/MidataService';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, midataService: MidataService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.rootPage = TabsPage;

      // if(!midataService.getisAuth()){
      //   this.rootPage = LoginPage;
      // }else{
      //   this.rootPage = TabsPage;
      // }

      });


  }
}
