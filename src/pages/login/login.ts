import { Component } from "@angular/core";
import { NavController, AlertController, ToastController, MenuController } from "ionic-angular";
import { HomePage } from "../home/home";
import { Storage } from '@ionic/storage';
import { LoginProvider } from "../../services/login";
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email: any;
  password: any;
  RememberMe: any;
  constructor(private iab: InAppBrowser, public loginProvider: LoginProvider, private storage: Storage, public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController) {
    this.menu.swipeEnable(false);
  }

  // go to register page
  register() {
    const browser = this.iab.create("http://frontier-gateway.net/ULogin/app/Register.php");
    browser.show()

    // this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {

    this.loginProvider.ValidateUser(this.email, this.password).then((res) => {
      if (res && res[0].Value == 1) {
        if (this.RememberMe == true) {
          this.storage.set('IsRemember', true);
        }
        this.storage.set('LoggedUserId', res[0].UserId);
        this.nav.setRoot(HomePage);
      } else {
        let toast = this.toastCtrl.create({
          message: res[0].Message,
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

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
