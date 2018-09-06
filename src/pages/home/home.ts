import { Component } from "@angular/core";
import { NavController, NavParams, PopoverController } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { NotificationsPage } from "../notifications/notifications";
import { SettingsPage } from "../settings/settings";
import { SearchLocationPage } from "../search-location/search-location";
import { LoginProvider } from "../../services/login";
import { InAppBrowser } from '@ionic-native/in-app-browser';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public trips: any;
  constructor(private iab: InAppBrowser,public loginProvider: LoginProvider, public navParams: NavParams, private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController) {
  }

  ionViewWillEnter() {
    this.storage.get('LoggedUserId').then((userid) => {
      this.loginProvider.GetAllMessages(userid).then((data) => {
        this.trips = data;

        this.loginProvider.SetMsgRecivedDate(userid).then((res) => { console.log('recievdate',res);
         }); 
      });
    })
  }

  // msg Click
  msgClick(msgId,link) {
    this.loginProvider.MsgClickCount(msgId).then((data) => {
    });
    const browser = this.iab.create(link);
    browser.show()
    
  }

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }

}

//