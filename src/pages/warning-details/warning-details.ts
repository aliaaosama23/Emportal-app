import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { HelperProvider } from '../../providers/helper/helper';

@IonicPage()
@Component({
  selector: 'page-warning-details',
  templateUrl: 'warning-details.html',
})
export class WarningDetailsPage {
warning_details:any={}
Emp_Warn_Status:boolean=false
IsReadable:boolean=false
language:any=''
  constructor( public toastCtrl: ToastController,public helper:HelperProvider,
     public service:MainserviceProvider, private translate: TranslateService,
     public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {

      this.language=this.helper.language

    this.warning_details=this.navParams.get('details')
    this.warning_details.Emp_Warn_Date= moment( this.warning_details.Emp_Warn_Date).format('L');

    console.log( ""+ JSON.stringify( this.warning_details))
    this.Emp_Warn_Status=this.warning_details.IsChecked
    this.IsReadable=this.warning_details.IsReadable
  }

  ionViewDidLoad() {
     //  console.log('ionViewDidLoad WarningDetailsPage');
  }

  goback(){
    this.viewCtrl.dismiss()
  }

 CheckBoxChange_Emp_Warn_Status(){
   let params={
    'Emp_Warn_ID': this.warning_details.Emp_Warn_ID,
    'FK_Emp_ID':this.warning_details.FK_Emp_ID,
    'Emp_Warn_Title':this.warning_details.Emp_Warn_Title,
    'Emp_Warn_Message': this.warning_details.Emp_Warn_Message,
    'Warn_Type_Name':this.warning_details.Warn_Type_Name,
    'Emp_Warn_Date':this.warning_details.Emp_Warn_Date,
    'Emp_Warn_Status': this.warning_details.Emp_Warn_Status,
    'FK_War_Type_ID': this.warning_details.FK_War_Type_ID,
    'FK_Creator_ID': this.warning_details.FK_Creator_ID,
    'IsReadable': this.IsReadable,
    'IsChecked':  this.Emp_Warn_Status,
    'Emp_DeliveryDateTime': this.warning_details.Emp_DeliveryDateTime
  }
   this.service.CheckBoxChange(params ).subscribe(
     (res:any)=>{
        const toast = this.toastCtrl.create({
          message: res,
          duration: 3000
        });
        toast.present();
      toast.onDidDismiss(()=>{
        this.viewCtrl.dismiss()
      })

     },(err:any)=>{
    }
   )
 }

 CheckBoxChange_IsReadable(){

 }
}
