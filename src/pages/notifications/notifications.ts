import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
   notifications:any[]=[]
   language:any=""
  constructor(public navCtrl: NavController,public helper:HelperProvider, public navParams: NavParams) {
    this.notifications=[
      '1','2'
    ]
    this.language=this.helper.language
  }



  ionViewDidLoad() {
     //  console.log('ionViewDidLoad NotificationsPage');
  }

}
