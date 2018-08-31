import { Component } from "@angular/core";
import { NavController, NavParams, PopoverController } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { NotificationsPage } from "../notifications/notifications";
import { SettingsPage } from "../settings/settings";
import { SearchLocationPage } from "../search-location/search-location";
import { LoginProvider } from "../../services/login";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public trips: any;
  constructor(public loginProvider: LoginProvider, public navParams: NavParams, private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController) {
  }

  ionViewWillEnter() {
    this.storage.get('LoggedUserId').then((userid) => {
      this.loginProvider.GetAllMessages(userid).then((data) => {
        this.trips = data;
      });
    })
  }

  // choose place
  choosePlace(from) {
    this.nav.push(SearchLocationPage, from);
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
