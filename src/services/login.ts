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
      console.log(`${this.url}/Home/login?UserName=${id}&Password=${pass}`)
      this.http.get(`${this.url}/Home/login?UserName=${id}&Password=${pass}`).subscribe(res => {
        resolve(res);
      });
    });
  }
  GetAllMessages(userid){
    return new Promise((resolve,reject)=>{
      this.http.get(`${this.url}/Home/GetMessage?UserId=${userid}`).subscribe(res => {
        resolve(res);
      });
    })
  }
}