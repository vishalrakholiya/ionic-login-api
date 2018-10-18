import { Component } from "@angular/core";
import { NavController, NavParams,  ToastController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: LoginProvider, public toastCtrl: ToastController, private storage: Storage) {
  }

  ionViewDidLoad() {
    this.getTranList();
    console.log('in balance screen');
  }
  doRefresh(refresher) {
    this.storage.get('LoggedUserId').then((userid) => {
      this.loginProvider.GetWalletAndTransactions(userid).then((data) => {
        if (data) {
          this.transactionList = data;
          this.transactionList = this.transactionList.filter(function (item) {
            return item.status == 1;
          });
          this.loginProvider.GetWalletDetails(userid).then((dataw) => {
            if (dataw) {
              this.walletTokenCount = parseFloat(dataw[0].WalletTokenCount).toFixed(2);
              this.walletExchangeValue = parseFloat(dataw[0].WalletExchangeValue).toFixed(2);
            }
            refresher.complete();
          });
        }
      });

    });
  }

  getTranList() {
    this.storage.get('LoggedUserId').then((userid) => {
      this.loginProvider.GetWalletAndTransactions(userid).then((data) => {
        if (data) {
          this.transactionList = data;
          this.transactionList = this.transactionList.filter(function (item) {
            return item.status == 1;
          });
          this.loginProvider.GetWalletDetails(userid).then((dataw) => {
            if (dataw) {
              this.walletTokenCount = parseFloat(dataw[0].WalletTokenCount).toFixed(2);
              this.walletExchangeValue = parseFloat(dataw[0].WalletExchangeValue).toFixed(2);
            }
          });
        }
      });

    });
  }

  // presentConfirm(idTicket) {
  //   let alert = this.alertCtrl.create({
  //     title: 'Confirm Transaction',
  //     message: 'What do you want to do with this transaction?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked', idTicket);
  //         }
  //       },
  //       {
  //         text: 'Decline',
  //         handler: () => {
  //           this.loginProvider.SetTicketStatus(idTicket, 3).then((data) => {
  //             console.log('data dec', data);

  //             if (data) {
  //               this.getTranList();
  //               let toast = this.toastCtrl.create({
  //                 message: 'Transaction Declined.',
  //                 duration: 3000,
  //                 position: 'top',
  //                 cssClass: 'dark-trans',
  //                 closeButtonText: 'OK',
  //                 showCloseButton: true
  //               });
  //               toast.present();
  //             }
  //           });
  //         }
  //       },
  //       {
  //         text: 'Accept',
  //         handler: () => {
  //           this.loginProvider.SetTicketStatus(idTicket, 1).then((data) => {
  //             if (data) {
  //               this.getTranList();
  //               let toast = this.toastCtrl.create({
  //                 message: 'Transaction accepted successfully.',
  //                 duration: 3000,
  //                 position: 'top',
  //                 cssClass: 'dark-trans',
  //                 closeButtonText: 'OK',
  //                 showCloseButton: true
  //               });
  //               toast.present();
  //             }
  //           });
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }
}
