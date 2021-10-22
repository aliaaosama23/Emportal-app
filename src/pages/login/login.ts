import { Component } from '@angular/core';
import { IonicPage, NavController,Platform, NavParams, ToastController,Events, LoadingController ,MenuController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HelperProvider } from '../../providers/helper/helper';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  myform:FormGroup
  language:any
  user_name:any
  password:any

  constructor(public menuCtrl: MenuController,public platform:Platform,public loadingCtrl:LoadingController,
              public events: Events,public toastCtrl:ToastController,
              public service:MainserviceProvider,public navCtrl: NavController,
              public formBuilder: FormBuilder,public helper:HelperProvider,private storage: Storage,
              private translate: TranslateService,public navParams: NavParams) {
                this.events.subscribe('Language')
                this.translate.get("user_name").subscribe(
                  value => {
                   this.user_name=value
                  }
                )
                this.translate.get("password").subscribe(
                  value => {
                   this.password=value
                  }
                )
            
        
        this.myform =  this.formBuilder.group({
          Username: ['', Validators.compose([Validators.required])],
          Password:['', Validators.compose([Validators.required])],
          language:['', Validators.compose([Validators.required])]
        });

        this.language=this.helper.language

  }

  ionViewDidLoad() {
     this.menuCtrl.swipeEnable( false )
  }

  ionViewDidLeave() {
    this.menuCtrl.swipeEnable( true )
  }

  logForm(){

    // static playerid   c9b09a0c-dfa2-454d-b8f2-3028b38bb98f
    this.storage.get("PlayerID").then((val)=>{
      console.log("login data ...."+   JSON.stringify(this.myform.value))
      console.log(" PlayerID..... "+  val)
        let loading =this.loadingCtrl.create({})
        loading.present()
        this.service.login(this.myform.value,"c9b09a0c-dfa2-454d-b8f2-3028b38bb98f").subscribe(
          (res:any)=>{
            loading.dismiss()
                this.helper.set_Emp_PhotoPath(res.Emp_PhotoPath.substring(45))
                console.log("image.."+res.Emp_PhotoPath.substring(45))
                this.events.publish("login",res)
                this.storage.set('user_data',res)
                localStorage.setItem('Username',this.myform.value.Username)
                localStorage.setItem('Password',this.myform.value.Password)
                this.helper.set_is_login(true)
                this.helper.set_Emp_ID(res.Emp_ID)
                this.helper.set_branch(res.Branch_ID)
                this.storage.set('islogin',true)
                this.navCtrl.setRoot('TabsPage')
            },(err:any)=>{
              loading.dismiss()
              this.helper.set_is_login(false)
              this.storage.set('islogin',false)
              if(err.error=="عفواَ، غير مسموح لهذا المستخدم بالدخول لأنه ليس موظف !")
              {
                this.translate.get("login_error1")
                .subscribe(
                  value => {
                    this.service.toast_service(value,3000)
                  })
              }
        })
    })

  }

  set_language(){
    console.log(  "this.language.."+ this.language)
    this.helper.set_language(this.language)
    if(this.language=="en"){
      this.helper. changeLanguage('en')
      this.platform.setDir('ltr',true)
      this.events.publish('Language','en')
      this.storage.set('language','en')
    }else{
        this.helper. changeLanguage('ar')
        this.platform.setDir('rtl',true)
        this.events.publish('Language','ar')
        this.storage.set('language','ar')
    }
    this.events.subscribe('Language')
  }

  reset_password(){
     this.navCtrl.push("PasswordChangePage")
  }

}
