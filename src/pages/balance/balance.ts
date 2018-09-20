import { Component } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';
import { LoginProvider } from "../../services/login";
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-balance',
  templateUrl: 'balance.html'
})
export class BalancePage {
  public walletTokenCount: any;
  public walletExchangeValue: any;
  public transactionList: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: LoginProvider, private storage: Storage) {
  }

  ionViewDidLoad() {
    this.storage.get('LoggedUserId').then((userid) => {
      this.loginProvider.GetWallet(userid).then((data) => {
        if (data[0]) {
          this.walletTokenCount = data[0].WalletTokenCount;
          this.walletExchangeValue = data[0].WalletExchangeValue;
        } else {
          this.walletTokenCount = 1111;
          this.walletExchangeValue = 1111;
        }
      });
      this.loginProvider.GetTicket(userid).then((data) => {
        if (data) {
          this.transactionList = data;
          console.log(this.transactionList);
          
        }
      });
    });
  }

}
