import { Component, Injector, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
  }

}
