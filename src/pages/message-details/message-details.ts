import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { HelperProvider } from '../../providers/helper/helper';

@IonicPage()
@Component({
  selector: 'page-message-details',
  templateUrl: 'message-details.html',
})
export class MessageDetailsPage {
  subject:any=""
  date:any
  body:any=""
  id:any
  language:any=""
  constructor(public viewCtrl:ViewController, public navCtrl: NavController, public helper:HelperProvider,
    private translate: TranslateService,public alertCtrl:AlertController,
    public navParams: NavParams,  public service:MainserviceProvider) {
     this.subject=this.navParams.get('subject')
     this.date=this.navParams.get('date')
     this.body=this.navParams.get('body')
     this.id=this.navParams.get('id')
     this.language=this.helper.language
     console.log(this.language)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageDetailsPage');
  }
  goback(){
    this.viewCtrl.dismiss()
  }
    
  remove_message(){
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
                console.log("not dalete message")
                  }
                },
                {
                  text:  value3,
                  handler: data => {
                    this.service. DeleteMessage(this.id).subscribe(
                      (res:any)=>{
                        this.viewCtrl.dismiss()
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
