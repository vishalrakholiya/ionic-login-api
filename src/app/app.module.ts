import { NgModule } from "@angular/core";
import { IonicApp, IonicModule } from "ionic-angular";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SuperTabsModule } from 'ionic2-super-tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { LoginProvider } from "../services/login";

import { MyApp } from "./app.component";

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { WalletPage } from "../pages/wallet/wallet";
import { BalancePage } from "../pages/balance/balance";
import { WalletReceivePage } from "../pages/wallet-receive/wallet-receive";
import { WalletSendPage } from "../pages/wallet-send/wallet-send";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    WalletPage,
    BalancePage,
    WalletReceivePage,
    WalletSendPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SuperTabsModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot({
      name: '__ionic3_start_theme',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    WalletPage,
    BalancePage,
    WalletReceivePage,
    WalletSendPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    LoginProvider,
    InAppBrowser
  ]
})

export class AppModule {
}
