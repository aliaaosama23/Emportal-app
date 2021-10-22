import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController ,MenuController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HelperProvider } from '../../providers/helper/helper';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-password-change',
  templateUrl: 'password-change.html',
})
export class PasswordChangePage {
  myform:FormGroup
  language:any
  old_password:any
  new_password:any
  confirm_password:any
  constructor(public menuCtrl: MenuController, public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,public service:MainserviceProvider,
     public navCtrl: NavController,public formBuilder: FormBuilder,private translate: TranslateService,
     public helper:HelperProvider, private storage: Storage, public navParams: NavParams) {


      this.translate.get("old password").subscribe(
        value => {
         this.old_password=value
        }
      )
      this.translate.get("new password").subscribe(
        value => {
         this.new_password=value
        }
      )
      this.translate.get("confirm password").subscribe(
        value => {
         this.confirm_password=value
        }
      )

    this.myform =  this.formBuilder.group({
      OldPassword: ['', Validators.compose([Validators.required])],
      NewPassword:['', Validators.compose([Validators.required])],
      ConfirmPassword:['', Validators.compose([Validators.required])],
    });

  }

  ionViewDidLoad() {
     //  console.log('ionViewDidLoad PasswordChangePage');
  }


  logForm(){
    if(this.myform.valid && this.myform.value.NewPassword==this.myform.value.ConfirmPassword){
       //  console.log("form data....."+JSON.stringify(this.myform.value))
      this.storage.get('user_data').then((val:any)=>{
        let loading=this.loadingCtrl.create({})
        loading.present()
        this.service.change_password(val.User_Id,this.myform.value)
        .subscribe((res:any)=>{
          loading.dismiss()
            //  console.log(" change_password res "+JSON.stringify(res))
           let toast=this.toastCtrl.create({
            message: res,
            duration: 3000
          })
          toast.present()
          toast.onDidDismiss(()=>{
            this.navCtrl.setRoot('TabsPage')
          })
        },err=>{
          loading.dismiss()
           //  console.log(" change_password err "+JSON.stringify(err))
        })
     })
    }else{
       //  console.log('not valid data')
    }


  }

}
