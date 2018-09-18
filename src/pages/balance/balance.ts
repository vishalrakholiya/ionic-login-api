import { Component } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-balance',
  templateUrl: 'balance.html'
})
export class BalancePage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
  }

}
