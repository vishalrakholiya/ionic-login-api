import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, PopoverController } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { LoginProvider } from "../../services/login";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Content } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Content) content: Content;
  public trips: any;
  public Newtrips: any;
  public pageNo: any;
  public TotalPage: any;
  constructor(private iab: InAppBrowser, public loginProvider: LoginProvider, public navParams: NavParams, private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController) {
  }

  ionViewWillEnter() {
    this.storage.get('LoggedUserId').then((userid) => {
      this.pageNo = 0;
      this.TotalPage = 1;
      this.loginProvider.GetAllMessages(userid, this.pageNo).then((data) => {
        this.trips = data;
        this.trips = this.trips.reverse();
        this.pageNo = 1;
        this.TotalPage = data[0].TotalPage;
        this.loginProvider.SetMsgRecivedDate(userid).then((res) => {
          console.log('recievdate', res);
          this.content.scrollToBottom(100);
        });
      });
    })
  }
  scrollDown() {
    this.content.scrollTo(0, 1400, 100);
  }
  doRefresh(refresher) {
    this.storage.get('LoggedUserId').then((userid) => {
      this.loginProvider.GetAllMessages(userid, this.pageNo).then((data1) => {
        this.Newtrips = data1;
        this.Newtrips = this.Newtrips.reverse();
        this.trips = [...this.Newtrips, ...this.trips]
        this.pageNo = this.pageNo + 1;
        refresher.complete();
        this.scrollDown();
      });
    });

  }

  // msg Click
  msgClick(msgId, link) {
    this.loginProvider.MsgClickCount(msgId).then((data) => {
    });
    const browser = this.iab.create(link);
    browser.show()

  }

}
