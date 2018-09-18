import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BalancePage } from '../balance/balance';
import { WalletReceivePage } from "../wallet-receive/wallet-receive";
import { WalletSendPage } from "../wallet-send/wallet-send";

@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {
  page1: any = WalletReceivePage;
  page2: any = BalancePage;
  page3: any = WalletSendPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
  }

}
