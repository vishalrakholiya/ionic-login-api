import { Component } from "@angular/core";
import { NavController, NavParams, ToastController,AlertController } from 'ionic-angular';
import { LoginProvider } from "../../services/login";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-wallet-send',
  templateUrl: 'wallet-send.html'
})
export class WalletSendPage {
  public RecieverName: any = '';
  public SenderName: any = '';
  public RecieverID: any;
  public SenderID: any;
  public FTBAmount: any = '';
  public USDAmount: any = '';
  public transactionList: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: LoginProvider, private alertCtrl: AlertController, public toastCtrl: ToastController, private storage: Storage) {
  }

  ionViewDidLoad() {
    this.storage.get('LoggedUserId').then((userid) => {
      this.SenderID = userid;
    })
    this.storage.get('LoggedUserName').then((username) => {
      this.SenderName = username;
    })
    this.getTranList();
  }

  checkBlur() {
    this.loginProvider.GetReceiverId(this.RecieverName).then((data) => {
      if (data) {
        if (data == 0 || data == '0') {
          this.RecieverName = "";
          let toast = this.toastCtrl.create({
            message: 'Receiver not found.',
            duration: 3000,
            position: 'top',
            cssClass: 'dark-trans',
            closeButtonText: 'OK',
            showCloseButton: true
          });
          toast.present();
        } else if (data == this.SenderID) {
          this.RecieverName = "";
          let toast = this.toastCtrl.create({
            message: 'opps, its your username..',
            duration: 3000,
            position: 'top',
            cssClass: 'dark-trans',
            closeButtonText: 'OK',
            showCloseButton: true
          });
          toast.present();
        } else {
          this.RecieverID = data;
        }
      }
    });
  }

  sendBtnClick() {
    if (this.RecieverName == '' || this.FTBAmount == '' || this.USDAmount == '' || this.FTBAmount == 0 || this.USDAmount == 0) {
      let toast = this.toastCtrl.create({
        message: 'Please enter valid details.',
        duration: 3000,
        position: 'top',
        cssClass: 'dark-trans',
        closeButtonText: 'OK',
        showCloseButton: true
      });
      toast.present();
    }

    else {
      this.loginProvider.SendTokens(this.SenderID,this.RecieverID,this.FTBAmount,this.SenderName,this.RecieverName).then((data) => {
        if(data == "Success"){
          let toast = this.toastCtrl.create({
            message: 'Tokens send successfully.',
            duration: 3000,
            position: 'top',
            cssClass: 'dark-trans',
            closeButtonText: 'OK',
            showCloseButton: true
          });
          toast.present();
          this.getTranList();
          this.RecieverName= '';
          this.FTBAmount= '';
          this.USDAmount= '';
        }else{
          let toast = this.toastCtrl.create({
            message: 'error occured.,try again later.',
            duration: 3000,
            position: 'top',
            cssClass: 'dark-trans',
            closeButtonText: 'OK',
            showCloseButton: true
          });
          toast.present();
        }
      })
    }
  }

  doRefresh(refresher) {
    this.storage.get('LoggedUserId').then((userid) => {
      this.loginProvider.GetWalletAndTransactions(userid).then((data) => {
        if (data[0]) {
          this.transactionList = data;
          this.transactionList = this.transactionList.filter(function (item) {
            return item.idTicketType == 3 && item.status == 0;
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
            return item.idTicketType == 3 && item.status == 0;
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
              console.log('data dec',data);
              
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
