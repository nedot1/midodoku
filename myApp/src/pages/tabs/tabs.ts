import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProfilPage} from '../profil/profil';
import { SettingsPage} from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProfilPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
