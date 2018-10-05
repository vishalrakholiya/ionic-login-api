import { Component } from "@angular/core";
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { LoginProvider } from "../../services/login";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-wallet-receive',
  templateUrl: 'wallet-receive.html'
})
export class WalletReceivePage {
  public transactionList: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: LoginProvider, private storage: Storage, public toastCtrl: ToastController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.getTranList();
  }
  doRefresh(refresher) {
    this.storage.get('LoggedUserId').then((userid) => {
      this.loginProvider.GetWalletAndTransactions(userid).then((data) => {
        if (data[0]) {
          this.transactionList = data;
          this.transactionList = this.transactionList.filter(function (item) {
            return item.idTicketType == 4;
          })
        }
        refresher.complete();
      });
    });
  }
  getTranList() {
    this.storage.get('LoggedUserId').then((userid) => {
      this.loginProvider.GetWalletAndTransactions(userid).then((data) => {
        if (data[0]) {
          this.transactionList = data;
          this.transactionList = this.transactionList.filter(function (item) {
            return item.idTicketType == 4;
          })
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
