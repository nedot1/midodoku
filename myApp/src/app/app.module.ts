import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { InterferencePage } from '../pages/interference/interference';
import { LoginPage} from '../pages/login/login';
import { OverviewPage} from '../pages/overview/overview';
import { PainDocPage} from '../pages/paindoc/paindoc';
import { ProfilPage} from '../pages/profil/profil';
import { SettingsPage} from '../pages/settings/settings';
import { StatisticPage} from '../pages/statistic/statistic';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Service
import {MidataService} from '../providers/MidataService';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InterferencePage,
    LoginPage,
    OverviewPage,
    PainDocPage,
    ProfilPage,
    SettingsPage,
    StatisticPage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Zurück',
    },
  )],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InterferencePage,
    LoginPage,
    OverviewPage,
    PainDocPage,
    ProfilPage,
    SettingsPage,
    StatisticPage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    MidataService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]

})
export class AppModule {}
