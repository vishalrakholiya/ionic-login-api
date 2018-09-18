import { Component } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-wallet-send',
  templateUrl: 'wallet-send.html'
})
export class WalletSendPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletSendPage');
  }

}
