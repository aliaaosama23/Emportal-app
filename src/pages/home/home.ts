import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,Platform ,MenuController, LoadingController } from 'ionic-angular';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { HelperProvider } from '../../providers/helper/helper';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  current_language:string=""
  Emp_Full_Name:string=""
  Emp_PhotoPath:string=""
  Emp_Code:string=""
  dashboard:any={}
  day:string
  month:string
  year:string
  day1:string
  month1:string
  year1:string
  day_higri:string
  month_higri:string
  year_higri:string
  day_name:string
  language:string=""
  constructor( public events:Events, public helper:HelperProvider,public platform:Platform,
      public loadingCtrl:LoadingController, private translate: TranslateService,
      private storage:Storage,public menuCtrl:MenuController, public service:MainserviceProvider,
      public navCtrl: NavController, public menCtrl:MenuController,
      public navParams: NavParams) {

        this.events.subscribe('Language',val=>{
          this.language=val
          this.helper.language=val
        })

      this.storage.get('language').then((val)=>{
        if(val){
            if(val=='en'){  this.current_language='ar'}
            else if(val=='ar'){  this.current_language='en'}
        }else{
               this.current_language=this.helper.language
        }
      })

      this.language=this.helper.language

     let loading2=this.loadingCtrl.create({})
     loading2.present()

      this.storage.get('user_data').then((val:any)=>{
        if(val!=null || val!=undefined){
          this.Emp_Full_Name= val.Emp_Full_Name
          this.service.EmployeeDashboard(val.Emp_ID).subscribe(
            (res:any)=>{
              loading2.dismiss()
              this.dashboard=res
            },(err:any)=>{
              loading2.dismiss()
            }
          )
        }else{
           this.navCtrl.setRoot('LoginPage')
        }
      })

  }

  ionViewDidEnter(){
    this.storage.get('user_data').then((val:any)=>{
      if(val!=null || val!=undefined){
        //  call api for dashboard statistics
        this.service.EmployeeDashboard(val.Emp_ID)
        .subscribe(
          (res:any)=>{
            this.dashboard=res
          },(err:any)=>{
          }
        )
      }else{
         this.navCtrl.setRoot('LoginPage')
      }
    })
  }


  change_direction(){
    if(this.platform.isRTL){
      this.translate.use('en')
      this. translate.setDefaultLang('en')
      this.platform.setDir('ltr',true)
      this.events.publish('Language','en')
      this.storage.set('language','en')
      this.current_language="ar"
    }else{
      this.translate.use('ar')
      this.platform.setDir('rtl',true)
      this. translate.setDefaultLang('ar')
      this.events.publish('Language','ar')
      this.storage.set('language','ar')
      this.current_language="en"

    }
  }


  go_to_page(page){
    this.navCtrl.setRoot(page)
  }

  doRefresh(refresher){
    this.storage.get('user_data').then((val:any)=>{
      if(val!=null || val!=undefined){
        this.Emp_Full_Name= val.Emp_Full_Name
        //  call api for dashboard statistics
        this.service.EmployeeDashboard(val.Emp_ID).subscribe(
          (res:any)=>{
            refresher.complete();
            this.dashboard=res
          },(err:any)=>{
            refresher.complete();
          }
        )
      }else{
         this.navCtrl.setRoot('LoginPage')
      }
    })
  }

  ionViewDidLoad() {
      this.menuCtrl.swipeEnable( true )
  }


  show_notification(){
    this.navCtrl.push('NotificationsPage')
  }

}