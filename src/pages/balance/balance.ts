import { Component } from "@angular/core";
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: LoginProvider, public toastCtrl: ToastController, private storage: Storage, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.getTranList();
  }
  doRefresh(refresher) {
    this.storage.get('LoggedUserId').then((userid) => {
      this.loginProvider.GetWalletAndTransactions(userid).then((data) => {
        if (data) {
          this.transactionList = data;
          let tokenSum = 0;
          let tokenRateSum = 0;
          this.transactionList = this.transactionList.filter(function (item) {
            return item.status == 1;
          });
          this.transactionList.forEach(function (item) {
            if (item.status == 1) {
              tokenSum = (tokenSum + (parseFloat(item.Debit) - parseFloat(item.Credit)));
              tokenRateSum = (tokenRateSum + ((parseFloat(item.Debit) - parseFloat(item.Credit)) * parseFloat(item.Rate)))
            }
          })
          this.walletTokenCount = (tokenSum).toFixed(2);
          this.walletExchangeValue = (tokenRateSum).toFixed(2);
        } else {
          this.walletTokenCount = 0;
          this.walletExchangeValue = 0;
        }
        refresher.complete();
      });
    });
  }

  getTranList() {
    this.storage.get('LoggedUserId').then((userid) => {
      this.loginProvider.GetWalletAndTransactions(userid).then((data) => {
        if (data) {
          this.transactionList = data;
          let tokenSum = 0;
          let tokenRateSum = 0;
          this.transactionList = this.transactionList.filter(function (item) {
            return item.status == 1;
          });
          this.transactionList.forEach(function (item) {
            if (item.status == 1) {
              tokenSum = (tokenSum + (parseFloat(item.Debit) - parseFloat(item.Credit)));
              tokenRateSum = (tokenRateSum + ((parseFloat(item.Debit) - parseFloat(item.Credit)) * parseFloat(item.Rate)))
            }
          })
          this.walletTokenCount = (tokenSum).toFixed(2);
          this.walletExchangeValue = (tokenRateSum).toFixed(2);
        } else {
          this.walletTokenCount = 0;
          this.walletExchangeValue = 0;
        }
      });
    });
  }

  presentConfirm(idTicket) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Transaction',
      message: 'What do you want to do with this transaction?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked', idTicket);
          }
        },
        {
          text: 'Decline',
          handler: () => {
            this.loginProvider.SetTicketStatus(idTicket, 3).then((data) => {
              console.log('data dec', data);

              if (data) {
                this.getTranList();
                let toast = this.toastCtrl.create({
                  message: 'Transaction Declined.',
                  duration: 3000,
                  position: 'top',
                  cssClass: 'dark-trans',
                  closeButtonText: 'OK',
                  showCloseButton: true
                });
                toast.present();
              }
            });
          }
        },
        {
          text: 'Accept',
          handler: () => {
            this.loginProvider.SetTicketStatus(idTicket, 1).then((data) => {
              if (data) {
                this.getTranList();
                let toast = this.toastCtrl.create({
                  message: 'Transaction accepted successfully.',
                  duration: 3000,
                  position: 'top',
                  cssClass: 'dark-trans',
                  closeButtonText: 'OK',
                  showCloseButton: true
                });
                toast.present();
              }
            });
          }
        }
      ]
    });
    alert.present();
  }
}
