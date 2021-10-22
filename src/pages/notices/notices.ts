import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { HelperProvider } from '../../providers/helper/helper';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { ThrowStmt } from '@angular/compiler';

@IonicPage()
@Component({
  selector: 'page-notices',
  templateUrl: 'notices.html',
})
export class NoticesPage {
  l1:boolean=false
  l2:boolean=false
  l3:boolean=false
  l4:boolean=false
  l5:boolean=false
  l6:boolean=false
notice_data:any
Passport:any=""
Iqama:any=""
Visa:any=""
Driving:any=""
Doctor_License:any=""
Test:any=""
language:any
  constructor(public loadingCtrl:LoadingController, private translate: TranslateService,
    public helper:HelperProvider,public menuCtrl:MenuController,
     public service:MainserviceProvider, public navCtrl: NavController,
      public navParams: NavParams) {

        this.language=this.helper.language
        let loading=this.loadingCtrl.create({})
        loading.present()
     this.service. LoadGrid(this.helper.Emp_ID)
     .subscribe(
        (res:any)=>{
          loading.dismiss()
          var now = moment(res.Emp_Visa_Expiration_Date); //todays date
          var end = moment(new Date()); // another date
          var duration = moment.duration(end.diff(now));
          var days = duration.asDays();
          console.log(days)
          console.log(days.toFixed())

          if(res.Emp_Passport_Expiration_Date!=null){
           this.Passport= moment(  res.Emp_Passport_Expiration_Date).locale(  this.language) .format('ll');

          }else{
            this.Passport=this.translate.instant("no_date")
          }

          if( res.Emp_Iqama_Expiration_Date!=null){
              this.Iqama=  moment(res.Emp_Iqama_Expiration_Date).locale(  this.language) .format('ll');
          }
          else{
            this.Iqama=this.translate.instant("no_date")
          }

          if(res.Emp_Visa_Expiration_Date!=null){
           this.Visa=   moment( res.Emp_Visa_Expiration_Date).locale(  this.language) .format('ll');

          }
          else{
            this.Visa=this.translate.instant("no_date")
          }

          if( res.Driving_License_Expiration_Date!=null){
           this.Driving=   moment( res.Driving_License_Expiration_Date).locale(  this.language) .format('ll');

          }
          else{
            this.Driving=this.translate.instant("no_date")
          }

          if( res.Driving_License_Expiration_Date!=null){
            this.Doctor_License=   moment( res.Driving_License_Expiration_Date).locale(  this.language) .format('ll');

          }
           else{
             this.Doctor_License=this.translate.instant("no_date")
           }

           if( res.Driving_License_Expiration_Date!=null){
            this.Test=   moment( res.Driving_License_Expiration_Date).locale(  this.language) .format('ll');

          }
           else{
             this.Test=this.translate.instant("no_date")
           }
          this.notice_data=res
        },
        (err:any)=>{
          loading.dismiss()
        }
     )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticesPage');
  }

  tapEvent(status){
    if(status==0){
      this.l1=true
    }
    else if(status==1){
      this.l1=false
    }
  }

  
  tapEvent1(status){
    if(status==0){
      this.l2=true
    }
    else if(status==1){
      this.l2=false
    }
  }

  tapEvent2(status){
    if(status==0){
      this.l3=true
    }
    else if(status==1){
      this.l3=false
    }
  }
  tapEvent3(status){
    if(status==0){
      this.l4=true
    }
    else if(status==1){
      this.l4=false
    }
  }
  tapEvent4(status){
    if(status==0){
      this.l5=true
    }
    else if(status==1){
      this.l5=false
    }
  }
  tapEvent5(status){
    if(status==0){
      this.l6=true
    }
    else if(status==1){
      this.l6=false
    }
  }
  toggle(){
    this.menuCtrl.toggle()
  }
}
