import { Component } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-wallet-receive',
  templateUrl: 'wallet-receive.html'
})
export class WalletReceivePage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletReceivePage');
  }

}
