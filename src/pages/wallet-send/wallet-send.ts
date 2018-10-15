import { Component } from "@angular/core";
import { NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
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
  public FTBAmount: any;
  public USDAmount: any;
  public transactionList: any;
  public FtbDisable: boolean = true;
  public SendBtnDisable: boolean = true;
  public loading: any;
  public ExchangeRate: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: LoginProvider, private alertCtrl: AlertController,
    public toastCtrl: ToastController, private storage: Storage, public loadingCtrl: LoadingController
  ) {
    

  }

  ionViewDidLoad() {
    this.storage.get('LoggedUserId').then((userid) => {
      this.SenderID = parseInt(userid);
    })
    this.storage.get('LoggedUserName').then((username) => {
      this.SenderName = username;
    });

    this.FtbDisable = true;
    this.SendBtnDisable = true;
    this.getTranList();
  }

  checkFtbBlur() {
    if (this.RecieverName && parseFloat(this.FTBAmount) > 0) {
      this.loading = this.loadingCtrl.create({ spinner: 'bubbles' });
      this.loading.present();
      this.SendBtnDisable = false;
      this.loginProvider.GetWalletDetails(this.SenderID).then((data) => {
        if (data && data[0]) {
          this.USDAmount = (parseFloat(data[0].WalletExchangeRate) * parseFloat(this.FTBAmount)).toFixed(2);
        }
        this.loading.dismiss();
      }).catch(err => {
        alert(err)
        this.loading.dismiss();
      })
    } else {
      this.SendBtnDisable = true;
    }
  }

  checkBlur() {
    if (this.RecieverName == '' || this.RecieverName == null) {
      this.SendBtnDisable = true;
    } else {
      this.loading = this.loadingCtrl.create({ spinner: 'bubbles' });
      this.loading.present();
      this.loginProvider.GetReceiverId(this.RecieverName).then((data) => {
        if (data) {
          if (data == 0 || data == '0') {
            this.RecieverName = "";
            let toast = this.toastCtrl.create({
              message: 'Player account was invalid.',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
            this.SendBtnDisable = true;
          } else if (data == this.SenderID) {
            this.RecieverName = "";
            let toast = this.toastCtrl.create({
              message: 'opps, its your account..',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
            this.SendBtnDisable = true;
          } else {
            let toast = this.toastCtrl.create({
              message: 'Player account validated.',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            this.FtbDisable = false;
            if (parseFloat(this.FTBAmount) > 0)
              this.SendBtnDisable = false;
            else
              this.SendBtnDisable = true;
            toast.present();
            this.RecieverID = data;
            this.RecieverID = parseInt(this.RecieverID);
          }
          this.loading.dismiss();
          this.loading.enableBack();
        }
      }).catch(err => {
        this.loading.dismiss();
        alert(err);
      });
    }
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
      this.loading = this.loadingCtrl.create({ spinner: 'bubbles' });
      this.loading.present();
      this.loginProvider.SendTokens(this.SenderID, this.RecieverID, parseInt(this.FTBAmount), this.SenderName, this.RecieverName).then((data) => {
        if (data == "Success") {
          let toast = this.toastCtrl.create({
            message: 'Tokens send successfully.',
            duration: 3000,
            position: 'top',
            cssClass: 'dark-trans',
            closeButtonText: 'OK',
            showCloseButton: true
          });
          this.loading.dismiss();
          toast.present();
          this.getTranList();
          this.RecieverName = '';
          this.FTBAmount = '';
          this.USDAmount = '';
        } else {
          let toast = this.toastCtrl.create({
            message: 'error occured.,try again later.',
            duration: 3000,
            position: 'top',
            cssClass: 'dark-trans',
            closeButtonText: 'OK',
            showCloseButton: true
          });
          this.loading.dismiss();
          toast.present();
        }
      }).catch(err => {
        this.loading.dismiss();
        alert(err)
      });
    }
  }

  doRefresh(refresher) {
    this.storage.get('LoggedUserId').then((userid) => {
      this.loginProvider.GetWalletAndTransactions(userid).then((data) => {
        if (data) {
          this.transactionList = data;
          this.transactionList = this.transactionList.filter(function (item) {
            return item.idTicketType == 4 && item.status == 0;
          })
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
          this.transactionList = this.transactionList.filter(function (item) {
            return item.idTicketType == 4 && item.status == 0;
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
            this.loginProvider.SetTicketStatus(idTicket, 3, this.SenderID).then((data) => {
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
            this.loginProvider.SetTicketStatus(idTicket, 1, this.SenderID).then((data) => {
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
