import { Component } from '@angular/core';
import { SMS } from 'ionic-native'
import { NavController, ToastController } from 'ionic-angular';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Text object
  text = {
    "number": "", 
    "message": "",
  };



  constructor(private toastCtrl: ToastController, public navCtrl: NavController, public http: Http) {
      this.http.get('http://localhost/Diverse/API/PHP/').map(res => res.json()).subscribe(data => {
          let successToast = this.toastCtrl.create({
              message: data.data[0].data,
              duration: 3000
          })
          successToast.present();
      });
  }

  sendTextMessage() {
    SMS.send(this.text.number, this.text.message).then((result) => {
      let successToast = this.toastCtrl.create({
        message: "Text message sent successfully",
        duration: 3000
      })
      successToast.present();
    }, (error) => {
      let errorToast = this.toastCtrl.create({
        message: "Text message not sent. :(",
        duration: 3000
      })
      errorToast.present();
    });
  }

}
