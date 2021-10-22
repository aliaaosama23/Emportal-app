
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { Events,Platform ,  MenuController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import * as moment from 'moment';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { HelperProvider } from '../../providers/helper/helper';
import { Storage } from '@ionic/storage';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
@IonicPage()
@Component({
  selector: 'page-all-messages',
  templateUrl: 'all-messages.html',
})
export class AllMessagesPage {
  
   all_messages:any[]=[]

   constructor( private storage:Storage,public modalCtrl:ModalController,
    public events:Events,public platform:Platform,public viewCtrl:ViewController,
   public helper:HelperProvider,public alertCtrl:AlertController,
   public loadingCtrl:LoadingController,
    public service:MainserviceProvider,  public navCtrl: NavController ,
    private transfer: FileTransfer, private file: File,
    public menCtrl:MenuController, private translate: TranslateService,
    public navParams: NavParams) {
    this.all_messages=this.navParams.get('all_messages')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllMessagesPage');
  }
  
  back(){
     this.viewCtrl.dismiss()
  }
  message_details(subject,date,body,Msg_ID){
    this.navCtrl.push('MessageDetailsPage',{'subject':subject,'date':date,'body':body,'id':Msg_ID})
  }

  
  remove_message(Msg_ID){
    this.translate.get('delete this message').subscribe(
      value1 => {
        this.translate.get( "no").subscribe(
          value2 => {
            this.translate.get("yes").subscribe(
              value3 => {
          const alert = this.alertCtrl.create({
              title: value1,
              buttons: [
                {
                  text: value2,
                  handler: data => {
                  }
                },
                {
                  text:  value3,
                  handler: data => {
                    this.service. DeleteMessage(Msg_ID).subscribe(
                      (res:any)=>{
                        this.service.toast_service(res,2000)
              
                  },(err:any)=>{
                  }
                    )
              }
            }
          ]
        });

        alert.present();
      })
    })
  })
  }
}
