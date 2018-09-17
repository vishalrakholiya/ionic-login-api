import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { Storage } from '@ionic/storage';
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { WalletPage } from "../pages/wallet/wallet";
import { LoginProvider } from "../services/login";
import { InAppBrowser } from '@ionic-native/in-app-browser';


export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}
export interface DynamicMenuItem {
  title: string;
  urllink: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = '';
  result: any;
  appMenuItems: Array<MenuItem>;
  DynamicappMenuItems: Array<DynamicMenuItem>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    private storage: Storage,
    public loginProvider: LoginProvider,
    private iab: InAppBrowser
  ) {
    this.initializeApp();

    this.appMenuItems = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Wallet', component: WalletPage, icon: 'logo-usd' }
    ];
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();
      this.loginProvider.GetDynamicAppMenu().then((reso) => {
        let dynamicList = [];
        if (reso) {
          this.result = reso;
          this.result.forEach(function (element) {
            dynamicList.push({ title: element.resourceName, urllink: element.resourceValue, icon: element.resourceicon })//element.resourceicon
          });
          this.DynamicappMenuItems = dynamicList;
        }
      });
      this.storage.get('IsRemember').then((data) => {
        console.log(data);
        if (data) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage
        }
      }).catch((err) => {
        this.rootPage = LoginPage;
      })

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      this.keyboard.disableScroll(true);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  openLink(link) {
    const browser = this.iab.create(link);
    browser.show();
  }
  logout() {
    this.storage.set('IsRemember', false);
    this.nav.setRoot(LoginPage);
  }

}
