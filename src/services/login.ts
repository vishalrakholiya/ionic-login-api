import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginProvider {
  url: string;
  queryNotFound: string;


  constructor(public http: HttpClient) {
    this.url = 'http://chatapp.ramanisoft.com/api'
  }

  ValidateUser(id, pass) {
    return new Promise((resolve,reject)=>{      
      this.http.get(`${this.url}/Home/login?UserName=${id}&Password=${pass}`).subscribe(res => {
        resolve(res);
      });
    });
  }
  GetAllMessages(userid){
    return new Promise((resolve,reject)=>{
      console.log(`${this.url}/Home/GetMessage?UserId=${userid}`);
      this.http.get(`${this.url}/Home/GetMessage?UserId=${userid}`).subscribe(res => {
        resolve(res);
      });
    })
  }
  MsgClickCount(msgId){
    return new Promise((resolve,reject)=>{      
      this.http.get(`${this.url}/Home/SetMessageCount?idMessageSerial=${msgId}`).subscribe(res => {
        console.log('count',res);
        resolve(res);
      });
    });
  }
}