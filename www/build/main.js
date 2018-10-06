webpackJsonp([1],{

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_login__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = (function () {
    function HomePage(iab, loginProvider, navParams, storage, nav, popoverCtrl) {
        this.iab = iab;
        this.loginProvider = loginProvider;
        this.navParams = navParams;
        this.storage = storage;
        this.nav = nav;
        this.popoverCtrl = popoverCtrl;
    }
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('LoggedUserId').then(function (userid) {
            _this.pageNo = 0;
            _this.TotalPage = 1;
            _this.loginProvider.GetAllMessages(userid, _this.pageNo).then(function (data) {
                _this.trips = data;
                _this.trips = _this.trips.reverse();
                _this.pageNo = 1;
                _this.TotalPage = data[0].TotalPage;
                _this.loginProvider.SetMsgRecivedDate(userid).then(function (res) {
                    console.log('recievdate', res);
                    _this.content.scrollToBottom(100);
                });
            });
        });
    };
    HomePage.prototype.scrollDown = function () {
        this.content.scrollTo(0, 1400, 100);
    };
    HomePage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.storage.get('LoggedUserId').then(function (userid) {
            _this.loginProvider.GetAllMessages(userid, _this.pageNo).then(function (data1) {
                _this.Newtrips = data1;
                _this.Newtrips = _this.Newtrips.reverse();
                _this.trips = _this.Newtrips.concat(_this.trips);
                _this.pageNo = _this.pageNo + 1;
                refresher.complete();
                _this.scrollDown();
            });
        });
    };
    // msg Click
    HomePage.prototype.msgClick = function (msgId, link) {
        this.loginProvider.MsgClickCount(msgId).then(function (data) {
        });
        var browser = this.iab.create(link);
        browser.show();
    };
    return HomePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
], HomePage.prototype, "content", void 0);
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"D:\WORK\Alpesh\ionic-login-api\src\pages\home\home.html"*/'<!-- -->\n\n<ion-header>\n\n  <ion-navbar color="gray">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>\n\n      <strong>Messages</strong>\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content #content>\n\n  <ion-refresher *ngIf="pageNo < TotalPage" (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles" refreshingText="Refreshing...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n  <ion-list>\n\n\n\n    <ion-item *ngFor=\'let msg of trips\' (click)="msgClick(msg.idMessageSerial,msg.actionLink)">\n\n      <div *ngIf="msg.idMessageType == 2">\n\n        <p class="txtCenter">{{msg.DisplayName}}</p>\n\n        <img style="width:100%;height:100%;object-fit: cover;" src="{{msg.headerimge}}">\n\n        <p class="txtCenter">{{msg.txtMessage}}</p>\n\n      </div>\n\n      <ion-avatar item-start *ngIf="msg.idMessageType != 2">\n\n        <img src="{{msg.siteIcon}}">\n\n      </ion-avatar>\n\n      <img *ngIf="msg.idMessageType == 1" style="width:100%;height:100%;object-fit: cover;" src="{{msg.headerimge}}">\n\n      <h2 *ngIf="msg.idMessageType != 2" class="text-black">{{msg.Username}}@frontier<span class="msgAge">{{msg.Age}}</span></h2>\n\n      <p *ngIf="msg.idMessageType != 2">{{msg.txtMessage}}</p>\n\n    </ion-item>\n\n    <!-- <ion-item>\n\n      <ion-avatar item-start>\n\n        <img src="assets/img/ionic3-ico.png">\n\n      </ion-avatar>\n\n      <h2 class="text-black">Finn</h2>\n\n      <p>I\'ve had a pretty messed up day. If we just...</p>\n\n    </ion-item> -->\n\n  </ion-list>\n\n\n\n  <!-- <div class="chatBubble" *ngFor=\'let msg of trips\'>\n\n    <div class="chat-bubble right">\n\n      <div class="message">{{msg.txtMessage}}</div>\n\n      <div class="message-detail">\n\n          <span>{{msg.dateReceived}}</span>\n\n      </div>\n\n    </div>\n\n    <br>\n\n  </div> -->\n\n</ion-content>'/*ion-inline-end:"D:\WORK\Alpesh\ionic-login-api\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_3__services_login__["a" /* LoginProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* PopoverController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WalletPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__balance_balance__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__wallet_receive_wallet_receive__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__wallet_send_wallet_send__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WalletPage = (function () {
    function WalletPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.page1 = __WEBPACK_IMPORTED_MODULE_3__wallet_receive_wallet_receive__["a" /* WalletReceivePage */];
        this.page2 = __WEBPACK_IMPORTED_MODULE_2__balance_balance__["a" /* BalancePage */];
        this.page3 = __WEBPACK_IMPORTED_MODULE_4__wallet_send_wallet_send__["a" /* WalletSendPage */];
    }
    WalletPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WalletPage');
    };
    return WalletPage;
}());
WalletPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-wallet',template:/*ion-inline-start:"D:\WORK\Alpesh\ionic-login-api\src\pages\wallet\wallet.html"*/'<ion-header>\n\n  <ion-navbar color="gray">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n\n\n    </button>\n\n    <ion-title>\n\n      <strong>FrontierCoin<ion-icon style="float: right;" name="md-more"></ion-icon><ion-icon style="float: right;padding-right: 15px;" name="md-barcode"></ion-icon></strong>\n\n    </ion-title>\n\n    <!-- \n\n     -->\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <super-tabs style="height: 100%">\n\n    <super-tab [root]="page1" title="receive"></super-tab>\n\n    <super-tab [root]="page2" title="balance"></super-tab>\n\n    <super-tab [root]="page3" title="send"></super-tab>\n\n  </super-tabs>\n\n</ion-content>'/*ion-inline-end:"D:\WORK\Alpesh\ionic-login-api\src\pages\wallet\wallet.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */]])
], WalletPage);

//# sourceMappingURL=wallet.js.map

/***/ }),

/***/ 118:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 118;

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/wallet/wallet.module": [
		297,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 159;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BalancePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_login__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BalancePage = (function () {
    function BalancePage(navCtrl, navParams, loginProvider, toastCtrl, storage, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loginProvider = loginProvider;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
    }
    BalancePage.prototype.ionViewDidLoad = function () {
        this.getTranList();
    };
    BalancePage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.storage.get('LoggedUserId').then(function (userid) {
            _this.loginProvider.GetWalletAndTransactions(userid).then(function (data) {
                if (data[0]) {
                    _this.walletTokenCount = data[0].WalletTokenCount;
                    _this.walletExchangeValue = data[0].WalletExchangeValue;
                    _this.transactionList = data;
                }
                else {
                    _this.walletTokenCount = 0;
                    _this.walletExchangeValue = 0;
                }
                refresher.complete();
            });
        });
    };
    BalancePage.prototype.getTranList = function () {
        var _this = this;
        this.storage.get('LoggedUserId').then(function (userid) {
            _this.loginProvider.GetWalletAndTransactions(userid).then(function (data) {
                if (data[0]) {
                    _this.walletTokenCount = data[0].WalletTokenCount;
                    _this.walletExchangeValue = data[0].WalletExchangeValue;
                    _this.transactionList = data;
                }
                else {
                    _this.walletTokenCount = 0;
                    _this.walletExchangeValue = 0;
                }
            });
        });
    };
    BalancePage.prototype.presentConfirm = function (idTicket) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm Transaction',
            message: 'What do you want to do with this transaction?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked', idTicket);
                    }
                },
                {
                    text: 'Decline',
                    handler: function () {
                        _this.loginProvider.SetTicketStatus(idTicket, 3).then(function (data) {
                            console.log('data dec', data);
                            if (data) {
                                _this.getTranList();
                                var toast = _this.toastCtrl.create({
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
                    handler: function () {
                        _this.loginProvider.SetTicketStatus(idTicket, 1).then(function (data) {
                            if (data) {
                                _this.getTranList();
                                var toast = _this.toastCtrl.create({
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
    };
    return BalancePage;
}());
BalancePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-balance',template:/*ion-inline-start:"D:\WORK\Alpesh\ionic-login-api\src\pages\balance\balance.html"*/'<ion-content class="balance-bg">\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles"\n\n      refreshingText="Refreshing...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n  <ion-item class="txtCenter">\n\n    <h4 class=\'black usd\'>{{walletExchangeValue}} USD</h4>\n\n    <h1 class=\'black btcoin\'>{{walletTokenCount}}</h1>\n\n    <h3 class=\'black ftb\'>FTB</h3>\n\n  </ion-item>\n\n  <ion-list>\n\n    <ion-item (click)="presentConfirm(tran.idTicket)" *ngFor=\'let tran of transactionList\'>\n\n      <ion-avatar item-start>\n\n        <img src="assets/img/ionic3-ico.png">\n\n        <ion-icon *ngIf="tran.TicketTypeName == \'BUY\' || tran.TicketTypeName == \'SEND\'" class="battery" name="ios-battery-dead"></ion-icon>\n\n        <ion-icon *ngIf="tran.TicketTypeName == \'SELL\' || tran.TicketTypeName == \'RECEIVE\'" class="battery" name="ios-battery-full"></ion-icon>\n\n      </ion-avatar>\n\n      <p>{{tran.TicketTypeName}}<span style="float: right;">{{tran.TDate}}</span></p>\n\n      <h2 class="text-black cardno">{{tran.Memo}}</h2>\n\n      <h2 *ngIf="tran.TicketTypeName == \'BUY\' || tran.TicketTypeName == \'SEND\'" class="amountfull">- {{tran.Credit}}</h2>\n\n      <h2 *ngIf="tran.TicketTypeName == \'SELL\' || tran.TicketTypeName == \'RECEIVE\'" class="amountget">+ {{tran.Debit}}</h2>\n\n    </ion-item>\n\n    <!-- <ion-item>\n\n      <ion-avatar item-start>\n\n        <img src="assets/img/ionic3-ico.png">\n\n        <ion-icon class="battery" name="ios-battery-full"></ion-icon>\n\n      </ion-avatar>\n\n      <p>sent to</p>\n\n      <h2 class="text-black cardno">gdsfg gf2g gfg1 dg12 g21g er12 ert1 yytr</h2>\n\n      <h2 class="amount">-0.0017</h2>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-avatar item-start>\n\n        <img src="assets/img/ionic3-ico.png">\n\n      </ion-avatar>\n\n      <p>received with</p>\n\n      <h2 class="text-black cardno">My Bitcoin address</h2>\n\n      <h2 class="amountget">+0.0029</h2>\n\n    </ion-item> -->\n\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"D:\WORK\Alpesh\ionic-login-api\src\pages\balance\balance.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__services_login__["a" /* LoginProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], BalancePage);

//# sourceMappingURL=balance.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WalletReceivePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_login__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WalletReceivePage = (function () {
    function WalletReceivePage(navCtrl, navParams, loginProvider, storage, toastCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loginProvider = loginProvider;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
    }
    WalletReceivePage.prototype.ionViewDidLoad = function () {
        this.getTranList();
    };
    WalletReceivePage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.storage.get('LoggedUserId').then(function (userid) {
            _this.loginProvider.GetWalletAndTransactions(userid).then(function (data) {
                if (data[0]) {
                    _this.transactionList = data;
                    _this.transactionList = _this.transactionList.filter(function (item) {
                        return item.idTicketType == 4;
                    });
                }
                refresher.complete();
            });
        });
    };
    WalletReceivePage.prototype.getTranList = function () {
        var _this = this;
        this.storage.get('LoggedUserId').then(function (userid) {
            _this.loginProvider.GetWalletAndTransactions(userid).then(function (data) {
                if (data[0]) {
                    _this.transactionList = data;
                    _this.transactionList = _this.transactionList.filter(function (item) {
                        return item.idTicketType == 4;
                    });
                }
            });
        });
    };
    WalletReceivePage.prototype.presentConfirm = function (idTicket) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm Transaction',
            message: 'What do you want to do with this transaction?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked', idTicket);
                    }
                },
                {
                    text: 'Decline',
                    handler: function () {
                        _this.loginProvider.SetTicketStatus(idTicket, 3).then(function (data) {
                            if (data) {
                                _this.getTranList();
                                var toast = _this.toastCtrl.create({
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
                    handler: function () {
                        _this.loginProvider.SetTicketStatus(idTicket, 1).then(function (data) {
                            if (data) {
                                _this.getTranList();
                                var toast = _this.toastCtrl.create({
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
    };
    return WalletReceivePage;
}());
WalletReceivePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-wallet-receive',template:/*ion-inline-start:"D:\WORK\Alpesh\ionic-login-api\src\pages\wallet-receive\wallet-receive.html"*/'<ion-content class="balance-bg">\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles" refreshingText="Refreshing...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n  <ion-list>\n\n    <ion-item (click)="presentConfirm(tran.idTicket)" *ngFor=\'let tran of transactionList\'>\n\n      <ion-avatar item-start>\n\n        <img src="assets/img/ionic3-ico.png">\n\n        <ion-icon *ngIf="tran.TicketTypeName == \'BUY\' || tran.TicketTypeName == \'SEND\'" class="battery" name="ios-battery-dead"></ion-icon>\n\n        <ion-icon *ngIf="tran.TicketTypeName == \'SELL\' || tran.TicketTypeName == \'RECEIVE\'" class="battery" name="ios-battery-full"></ion-icon>\n\n      </ion-avatar>\n\n      <p>{{tran.TicketTypeName}}<span style="float: right;">{{tran.TDate}}</span></p>\n\n      <h2 class="text-black cardno">{{tran.Memo}}</h2>\n\n      <h2 *ngIf="tran.TicketTypeName == \'BUY\' || tran.TicketTypeName == \'SEND\'" class="amountfull">- {{tran.Credit}}</h2>\n\n      <h2 *ngIf="tran.TicketTypeName == \'SELL\' || tran.TicketTypeName == \'RECEIVE\'" class="amountget">+ {{tran.Debit}}</h2>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"D:\WORK\Alpesh\ionic-login-api\src\pages\wallet-receive\wallet-receive.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__services_login__["a" /* LoginProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], WalletReceivePage);

//# sourceMappingURL=wallet-receive.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WalletSendPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_login__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WalletSendPage = (function () {
    function WalletSendPage(navCtrl, navParams, loginProvider, alertCtrl, toastCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loginProvider = loginProvider;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.RecieverName = '';
        this.SenderName = '';
        this.FTBAmount = '';
        this.USDAmount = '';
    }
    WalletSendPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('LoggedUserId').then(function (userid) {
            _this.SenderID = userid;
        });
        this.storage.get('LoggedUserName').then(function (username) {
            _this.SenderName = username;
        });
        this.getTranList();
    };
    WalletSendPage.prototype.checkBlur = function () {
        var _this = this;
        this.loginProvider.GetReceiverId(this.RecieverName).then(function (data) {
            if (data) {
                if (data == 0 || data == '0') {
                    _this.RecieverName = "";
                    var toast = _this.toastCtrl.create({
                        message: 'Receiver not found.',
                        duration: 3000,
                        position: 'top',
                        cssClass: 'dark-trans',
                        closeButtonText: 'OK',
                        showCloseButton: true
                    });
                    toast.present();
                }
                else if (data == _this.SenderID) {
                    _this.RecieverName = "";
                    var toast = _this.toastCtrl.create({
                        message: 'opps, its your username..',
                        duration: 3000,
                        position: 'top',
                        cssClass: 'dark-trans',
                        closeButtonText: 'OK',
                        showCloseButton: true
                    });
                    toast.present();
                }
                else {
                    _this.RecieverID = data;
                }
            }
        });
    };
    WalletSendPage.prototype.sendBtnClick = function () {
        var _this = this;
        if (this.RecieverName == '' || this.FTBAmount == '' || this.USDAmount == '' || this.FTBAmount == 0 || this.USDAmount == 0) {
            var toast = this.toastCtrl.create({
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
            this.loginProvider.SendTokens(this.SenderID, this.RecieverID, this.FTBAmount, this.SenderName, this.RecieverName).then(function (data) {
                if (data == "Success") {
                    var toast = _this.toastCtrl.create({
                        message: 'Tokens send successfully.',
                        duration: 3000,
                        position: 'top',
                        cssClass: 'dark-trans',
                        closeButtonText: 'OK',
                        showCloseButton: true
                    });
                    toast.present();
                    _this.RecieverName = '';
                    _this.FTBAmount = '';
                    _this.USDAmount = '';
                }
                else {
                    var toast = _this.toastCtrl.create({
                        message: 'error occured.,try again later.',
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
    };
    WalletSendPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.storage.get('LoggedUserId').then(function (userid) {
            _this.loginProvider.GetWalletAndTransactions(userid).then(function (data) {
                if (data[0]) {
                    _this.transactionList = data;
                    _this.transactionList = _this.transactionList.filter(function (item) {
                        return item.idTicketType == 3;
                    });
                }
                refresher.complete();
            });
        });
    };
    WalletSendPage.prototype.getTranList = function () {
        var _this = this;
        this.storage.get('LoggedUserId').then(function (userid) {
            _this.loginProvider.GetWalletAndTransactions(userid).then(function (data) {
                if (data[0]) {
                    _this.transactionList = data;
                    _this.transactionList = _this.transactionList.filter(function (item) {
                        return item.idTicketType == 3;
                    });
                }
            });
        });
    };
    WalletSendPage.prototype.presentConfirm = function (idTicket) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm Transaction',
            message: 'What do you want to do with this transaction?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked', idTicket);
                    }
                },
                {
                    text: 'Decline',
                    handler: function () {
                        _this.loginProvider.SetTicketStatus(idTicket, 3).then(function (data) {
                            console.log('data dec', data);
                            if (data) {
                                _this.getTranList();
                                var toast = _this.toastCtrl.create({
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
                    handler: function () {
                        _this.loginProvider.SetTicketStatus(idTicket, 1).then(function (data) {
                            if (data) {
                                _this.getTranList();
                                var toast = _this.toastCtrl.create({
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
    };
    return WalletSendPage;
}());
WalletSendPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-wallet-send',template:/*ion-inline-start:"D:\WORK\Alpesh\ionic-login-api\src\pages\wallet-send\wallet-send.html"*/'<ion-content class="balance-bg">\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles"\n\n      refreshingText="Refreshing...">\n\n    </ion-refresher-content>\n\n  </ion-refresher>\n\n  <p class="payto">Pay To</p>\n\n  <ion-item>\n\n    <ion-label>\n\n      <img class="ftbcoin" src="assets/img/FTB.png" />\n\n    </ion-label>\n\n    <ion-input style="color:black" [(ngModel)]=\'RecieverName\' (ionBlur)="checkBlur()" clearInput></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col col-6>\n\n        <p class="payto">Amount (FTB)</p>\n\n        <ion-item>\n\n          <ion-input type="number" [(ngModel)]=\'FTBAmount\' style="color:black" clearInput></ion-input>\n\n        </ion-item>\n\n      </ion-col>\n\n      <ion-col col-6>\n\n        <p class="payto">Amount (USD)</p>\n\n        <ion-item>\n\n          <ion-input type="number" [(ngModel)]=\'USDAmount\' style="color:black" clearInput></ion-input>\n\n        </ion-item>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col col-12>\n\n        <button class="sendbtn" (click)="sendBtnClick()" ion-button>SEND</button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n  <ion-list>\n\n    <ion-item (click)="presentConfirm(tran.idTicket)" *ngFor=\'let tran of transactionList\'>\n\n      <ion-avatar item-start>\n\n        <img src="assets/img/ionic3-ico.png">\n\n        <ion-icon *ngIf="tran.TicketTypeName == \'BUY\' || tran.TicketTypeName == \'SEND\'" class="battery" name="ios-battery-dead"></ion-icon>\n\n        <ion-icon *ngIf="tran.TicketTypeName == \'SELL\' || tran.TicketTypeName == \'RECEIVE\'" class="battery" name="ios-battery-full"></ion-icon>\n\n      </ion-avatar>\n\n      <p>{{tran.TicketTypeName}}<span style="float: right;">{{tran.TDate}}</span></p>\n\n      <h2 class="text-black cardno">{{tran.Memo}}</h2>\n\n      <h2 *ngIf="tran.TicketTypeName == \'BUY\' || tran.TicketTypeName == \'SEND\'" class="amountfull">- {{tran.Credit}}</h2>\n\n      <h2 *ngIf="tran.TicketTypeName == \'SELL\' || tran.TicketTypeName == \'RECEIVE\'" class="amountget">+ {{tran.Debit}}</h2>\n\n    </ion-item>\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"D:\WORK\Alpesh\ionic-login-api\src\pages\wallet-send\wallet-send.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__services_login__["a" /* LoginProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], WalletSendPage);

//# sourceMappingURL=wallet-send.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_login__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = (function () {
    function LoginPage(iab, loginProvider, storage, nav, forgotCtrl, menu, toastCtrl) {
        this.iab = iab;
        this.loginProvider = loginProvider;
        this.storage = storage;
        this.nav = nav;
        this.forgotCtrl = forgotCtrl;
        this.menu = menu;
        this.toastCtrl = toastCtrl;
        this.menu.swipeEnable(false);
    }
    // go to register page
    LoginPage.prototype.register = function () {
        var browser = this.iab.create("http://frontier-gateway.net/ULogin/app/Register.php");
        browser.show();
        // this.nav.setRoot(RegisterPage);
    };
    // login and go to home page
    LoginPage.prototype.login = function () {
        var _this = this;
        this.loginProvider.ValidateUser(this.email, this.password).then(function (res) {
            if (res && res[0].Value == 1) {
                if (_this.RememberMe == true) {
                    _this.storage.set('IsRemember', true);
                }
                _this.storage.set('LoggedUserId', res[0].UserId);
                _this.storage.set('LoggedUserName', _this.email);
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
            }
            else {
                var toast = _this.toastCtrl.create({
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
    };
    LoginPage.prototype.forgotPass = function () {
        var _this = this;
        var forgot = this.forgotCtrl.create({
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Send',
                    handler: function (data) {
                        console.log('Send clicked');
                        var toast = _this.toastCtrl.create({
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
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"D:\WORK\Alpesh\ionic-login-api\src\pages\login\login.html"*/'<!-- -->\n\n<ion-content padding class="animated fadeIn login auth-page">\n\n  <div class="login-content">\n\n\n\n    <!-- Logo -->\n\n    <div padding-horizontal text-center class="animated fadeInDown">\n\n      <div class="logo"></div>\n\n    </div>\n\n    <ion-item class="inputbox">\n\n      <ion-label class="lblicon">\n\n        <ion-icon name="person"></ion-icon>\n\n      </ion-label>\n\n      <ion-input [(ngModel)]=\'email\' style="font-style: italic;" placeholder="Enter Username" clearInput></ion-input>\n\n    </ion-item>\n\n    <ion-item class="inputbox">\n\n      <ion-label class="lblicon">\n\n        <ion-icon name="ios-key"></ion-icon>\n\n      </ion-label>\n\n      <ion-input type="password" style="font-style: italic;" [(ngModel)]=\'password\' placeholder="Enter Password" clearInput></ion-input>\n\n    </ion-item>\n\n    <!-- <ion-item>\n\n      <ion-label floating>\n\n        <ion-icon name="person" item-start class="text-primary"></ion-icon>\n\n        Enter UserName\n\n      </ion-label>\n\n      <ion-input type="email" [(ngModel)]=\'email\'></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n\n\n      <ion-label>\n\n        <ion-icon name="ios-key" item-start class="text-primary"></ion-icon>\n\n        Enter Password\n\n      </ion-label>\n\n      <ion-input type="password" [(ngModel)]=\'password\'></ion-input>\n\n    </ion-item> -->\n\n\n\n    <ion-item class="checkboxline">\n\n      <ion-label class="logged">Keep me logged in</ion-label>\n\n      <ion-checkbox style="margin-right:15px;margin-left: 0px;" [(ngModel)]="RememberMe"></ion-checkbox>\n\n      <button ion-button icon-start block color="dark" tappable (click)="login()" item-right> LOGIN >> </button>\n\n    </ion-item>\n\n    <div>\n\n\n\n      <div style="margin-right:16px;" text-right>\n\n        <span style="font-style: italic;" ion-text color="secondary" tappable (click)="register()"><span style="color: white;">Or</span> <strong>Register</strong></span>\n\n      </div>\n\n\n\n\n\n    </div>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"D:\WORK\Alpesh\ionic-login-api\src\pages\login\login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_4__services_login__["a" /* LoginProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(231);



// this is the magic wand
Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_21" /* enableProdMode */])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic2_super_tabs__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_keyboard__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_login__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_component__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_home__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_login_login__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_wallet_wallet__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_balance_balance__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_wallet_receive_wallet_receive__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_wallet_send_wallet_send__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_wallet_wallet__["a" /* WalletPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_balance_balance__["a" /* BalancePage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_wallet_receive_wallet_receive__["a" /* WalletReceivePage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_wallet_send_wallet_send__["a" /* WalletSendPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_6_ionic2_super_tabs__["a" /* SuperTabsModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */], {
                scrollPadding: false,
                scrollAssist: true,
                autoFocusAssist: false
            }, {
                links: [
                    { loadChildren: '../pages/wallet/wallet.module#WalletPageModule', name: 'WalletPage', segment: 'wallet', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["a" /* IonicStorageModule */].forRoot({
                name: '__ionic3_start_theme',
                driverOrder: ['indexeddb', 'sqlite', 'websql']
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_wallet_wallet__["a" /* WalletPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_balance_balance__["a" /* BalancePage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_wallet_receive_wallet_receive__["a" /* WalletReceivePage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_wallet_send_wallet_send__["a" /* WalletSendPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_keyboard__["a" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_10__services_login__["a" /* LoginProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__["a" /* InAppBrowser */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_wallet_wallet__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_login__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_in_app_browser__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, keyboard, storage, loginProvider, iab) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.keyboard = keyboard;
        this.storage = storage;
        this.loginProvider = loginProvider;
        this.iab = iab;
        this.rootPage = '';
        this.initializeApp();
        this.appMenuItems = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */], icon: 'home' },
            { title: 'Wallet', component: __WEBPACK_IMPORTED_MODULE_8__pages_wallet_wallet__["a" /* WalletPage */], icon: 'logo-usd' }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            //*** Control Splash Screen
            // this.splashScreen.show();
            _this.splashScreen.hide();
            _this.loginProvider.GetDynamicAppMenu().then(function (reso) {
                var dynamicList = [];
                if (reso) {
                    _this.result = reso;
                    _this.result.forEach(function (element) {
                        dynamicList.push({ title: element.resourceName, urllink: element.resourceValue, icon: element.resourceicon }); //element.resourceicon
                    });
                    _this.DynamicappMenuItems = dynamicList;
                }
            });
            _this.storage.get('IsRemember').then(function (data) {
                console.log(data);
                if (data) {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */];
                }
                else {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */];
                }
            }).catch(function (err) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */];
            });
            //*** Control Status Bar
            _this.statusBar.styleDefault();
            _this.statusBar.overlaysWebView(false);
            //*** Control Keyboard
            _this.keyboard.disableScroll(true);
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.openLink = function (link) {
        var browser = this.iab.create(link);
        browser.show();
    };
    MyApp.prototype.logout = function () {
        this.storage.set('IsRemember', false);
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */]);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\WORK\Alpesh\ionic-login-api\src\app\app.html"*/'<ion-menu side="left" id="authenticated" [content]="content">\n\n  <ion-header>\n\n    <ion-toolbar class="user-profile">\n\n\n\n      <ion-grid>\n\n        <ion-row>\n\n          <ion-col col-12>\n\n              <img style="width: 90%;padding-top: 10px;padding-left: 5px;" src="assets/img/frontierlogo.png">\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n\n\n    </ion-toolbar>\n\n  </ion-header>\n\n\n\n  <ion-content color="primary">\n\n\n\n    <ion-list class="user-list">\n\n      <button ion-item menuClose class="text-1x" *ngFor="let menuItem of appMenuItems" (click)="openPage(menuItem)">\n\n        <ion-icon item-left [name]="menuItem.icon" color="gray"></ion-icon>\n\n        <span ion-text color="gray">{{menuItem.title}}</span>\n\n      </button>\n\n      <button ion-item menuClose class="text-1x" *ngFor="let DmenuItem of DynamicappMenuItems" (click)="openLink(DmenuItem.urllink)">\n\n        <ion-icon item-left [name]="DmenuItem.icon" color="gray"></ion-icon>\n\n        <span ion-text color="gray">{{DmenuItem.title}}</span>\n\n      </button>\n\n    </ion-list>\n\n    <ion-list class="user-list">\n\n      <button ion-item menuClose class="text-1x" (click)="logout()">\n\n        <ion-icon item-left name="md-log-out"  color="gray"></ion-icon>\n\n        <span ion-text color="gray">LOG OUT</span>\n\n      </button>\n\n    </ion-list>\n\n  </ion-content>\n\n\n\n</ion-menu>\n\n\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"D:\WORK\Alpesh\ionic-login-api\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__["a" /* Keyboard */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_9__services_login__["a" /* LoginProvider */],
        __WEBPACK_IMPORTED_MODULE_10__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginProvider = (function () {
    function LoginProvider(http) {
        this.http = http;
        this.url = 'http://chatapp.ramanisoft.com/api';
    }
    LoginProvider.prototype.ValidateUser = function (id, pass) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.url + "/Home/login?UserName=" + id + "&Password=" + pass).subscribe(function (res) {
                resolve(res);
            });
        });
    };
    LoginProvider.prototype.GetAllMessages = function (userid, pageNo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.url + "/Home/GetMessage?UserId=" + userid + "&pageNo=" + pageNo).subscribe(function (res) {
                resolve(res);
            });
        });
    };
    LoginProvider.prototype.SetMsgRecivedDate = function (userid) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.url + "/Home/SetMessageReceiveDate?UserId=" + userid).subscribe(function (res) {
                resolve(res);
            });
        });
    };
    LoginProvider.prototype.MsgClickCount = function (msgId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.url + "/Home/SetMessageCount?idMessageSerial=" + msgId).subscribe(function (res) {
                resolve(res);
            });
        });
    };
    LoginProvider.prototype.GetDynamicAppMenu = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.url + "/Home/GetAppMenu").subscribe(function (res) {
                resolve(res);
            });
        });
    };
    LoginProvider.prototype.GetWalletAndTransactions = function (userid) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.url + "/Home/GetWalletTicket?UserId=" + userid).subscribe(function (res) {
                resolve(res);
            });
        });
    };
    LoginProvider.prototype.GetReceiverId = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.url + "/Home/GetReceiverId?ReceiverName=" + name).subscribe(function (res) {
                resolve(res);
            });
        });
    };
    LoginProvider.prototype.SendTokens = function (senderid, receiverId, amt, sn, rn) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.url + "/Home/SendTokens?senderId=" + senderid + "&receiverId=" + receiverId + "&amount=" + amt + "&sentfrom=" + sn + "&sentto=" + rn).subscribe(function (res) {
                resolve(res);
            });
        });
    };
    LoginProvider.prototype.SetTicketStatus = function (id, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.url + "/Home/SetTicketStatus?idTicket=" + id + "&value=" + value).subscribe(function (res) {
                resolve(res);
            });
        });
    };
    return LoginProvider;
}());
LoginProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
], LoginProvider);

//# sourceMappingURL=login.js.map

/***/ })

},[214]);
//# sourceMappingURL=main.js.map