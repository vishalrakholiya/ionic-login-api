import { Component } from "@angular/core";
import { NavController, NavParams, ToastController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: LoginProvider, public toastCtrl: ToastController, private storage: Storage) {
  }

  ionViewDidLoad() {
    this.storage.get('LoggedUserId').then((userid) => {
      this.SenderID = userid;
    })
    this.storage.get('LoggedUserName').then((username) => {
      this.SenderName = username;
    })
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

}
