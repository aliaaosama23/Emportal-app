import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController,Events,App, MenuController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { HelperProvider } from '../providers/helper/helper';
import { TranslateService } from '@ngx-translate/core';
import { MainserviceProvider } from '../providers/mainservice/mainservice';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  dir:boolean
  rootPage: any = '';
  language:any=''
  mySide:string="" 
  emp_frist_name:string=""
  emp_second_name:string=""
  emp_code:number
  Emp_PhotoPath:string=""
  pages: Array<{title: string, component: any,count:number}>;
  No_Of_EmpComplaints:number=0
  No_Of_Warning:number=0
  constructor(public events: Events,
    private translate: TranslateService,
    public app:App,public menuCtrl:MenuController,public loadingCtrl:LoadingController,
    public helper:HelperProvider,public service:MainserviceProvider,
    public alertCtrl: AlertController,
  
    private storage: Storage,public platform: Platform,
    public statusBar: StatusBar, public splashScreen: SplashScreen) {
     this.dir=this.platform.isRTL
   
      // this.storage.get('mySide').then((val)=>{
      //     this.mySide=val
      //     console.log("current side "+val)
      // })
     this.mySide=this.helper.mySide
      this.initializeApp();

      this.events.subscribe('image updated', (res) => {
        console.log(" events uploaded_new_image")
        this.Emp_PhotoPath=res
      });

      this.service.EmployeeDashboard(this.helper.User_Id)
          .subscribe(
            (res:any)=>{
              this.No_Of_EmpComplaints=  res.No_Of_EmpComplaints
              this.No_Of_Warning=res.No_Of_Warning
            },(err:any)=>{
            }
          )

      this.storage.get('user_data').then((val:any)=>{
        if(val!=null || val!=undefined){
          this.service.EmployeeDashboard(val.Emp_ID)
          .subscribe(
            (res:any)=>{
              this.No_Of_EmpComplaints=  res.No_Of_EmpComplaints
              this.No_Of_Warning=res.No_Of_Warning
            },(err:any)=>{
            }
          )
          this.events.subscribe('dismiss', (val) => {
             if(val){
              this.service.EmployeeDashboard(val.Emp_ID)
              .subscribe(
                (res:any)=>{
                  this.No_Of_EmpComplaints=  res.No_Of_EmpComplaints
                  this.No_Of_Warning=res.No_Of_Warning
                },(err:any)=>{
                }
              )
             }
          });
        }else{
           this.nav.setRoot('LoginPage')
        }
      })

    
      this.events.subscribe("login", (val) => {
        console.log("events fired......")
        if(val){
          this.Emp_PhotoPath="https://empportalapi.careofme.net/"+val.Emp_PhotoPath.substring(29)
          this.emp_frist_name=val.Emp_Full_Name.split(" ", 1)[0]
          this.emp_second_name=val.Emp_Full_Name.split(" ", 2)[1]
          this.emp_code=val.Emp_Code
        }
      });


    this.pages = [
      { title:"home" , component:'TabsPage',count:0 },
      { title:"complaints" , component:'ComplaintPage',count:this.No_Of_EmpComplaints},
      { title: "warnings", component: 'WarningPage',count: this.No_Of_Warning},
      {title:"attendance",component:'AttendancePage',count:0},
      // { title:"appointments" , component:'AppointmentPage' ,count: },
      { title:  "files", component: 'FilesPage',count:0 },
      { title:  "notices", component: 'NoticesPage' ,count:0},
      { title: "Salaries"  , component:'SalaryPage',count:0 },
      { title: "Langauge", component: 'LanguagePage',count:0 },
      { title: "Logout", component: 'LoginPage' ,count:0}
    ];

  }

  menuToggle(){
    this.menuCtrl.toggle()
  }

    
  initializeApp() {
    this.platform.ready().then(() => {
  
      this.storage.get('language').then((val:any)=>{
        if(val!=null){
          if(val=='ar'){
            this.language='ar'
            this.helper.set_mySide('right')
            this.platform.setDir('rtl',true)
            this.mySide='right'
            this.helper. changeLanguage('ar')
             this.helper.set_language('ar')
          }else if(val=='en'){
            this.language='en'
            this.helper.set_mySide('left')
            this.platform.setDir('ltr',true)
            this.mySide='left'
            this.helper. changeLanguage('en')
            this.helper.set_language('en')
          }
        }
        else{
          this.language='ar'
          this.helper.set_mySide('right')
          this.helper.set_language('ar')
          this.platform.setDir('rtl',true)     
          this.mySide='right'
          this.helper. changeLanguage('ar')
          this.helper.set_language('ar')
        }
     })
      

      this.storage.get('islogin').then((val:any)=>{
        if(val!=null){
          if(val==true){
            this.rootPage='TabsPage'
          }
          else{
            this.rootPage='LoginPage'
          }
        }
        else{
          this.rootPage='LoginPage'
        }
      })
      this.storage.get('user_data').then((val:any)=>{
        if(val){
          this.emp_frist_name=val.Emp_Full_Name.split(" ", 1)[0]
          this.emp_second_name=val.Emp_Full_Name.split(" ", 2)[1]
          this.emp_code=val.Emp_Code

            this.storage.get('image').then((val1)=>{
                console.log( "image..."+  val1)
              if(val1){
                  this.Emp_PhotoPath=val1
              
              }else{
                  if(val.Emp_PhotoPath.substr(44)!=""){
                      this.Emp_PhotoPath=val.Emp_PhotoPath
                  }else{
                      this.Emp_PhotoPath="assets/imgs/images.jpg"
                  }
              }
            })

            this.service.GetEmployeeData(val.User_Id)
              .subscribe(
                (res:any)=>{
                  this.Emp_PhotoPath= res.Emp_PhotoPath
                }
            )

            console.log(  this.Emp_PhotoPath)
              if(val!=null){
              this.helper.set_Emp_ID(val.Emp_ID)
              this.helper.set_branch(val.Branch_ID)
              this.helper.set_User_Id(val.User_Id)
              this.helper.set_Org_ID(val.FK_Org_ID)
              this.helper.set_Emp_PhotoPath(val.Emp_PhotoPath)
              }
        }
       else{
         this.rootPage='LoginPage'
       }
      })
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    
    if(page.title=="Logout")
    {
      this.translate.get( "do you want to logout ?").subscribe(
           value1 => {
            this.translate.get( "yes").subscribe(
              value2 => {
                this.translate.get("no").subscribe(
                  value3 => {
              const alert = this.alertCtrl.create({
                title: value1,
                buttons: [
                  {
                    text: value2,
                    handler: data => {
                      this.storage.clear()
                      this.nav.setRoot('LoginPage')
                    }
                  }, {
                    text:  value3,
                    handler: data => {
                    }
                  }
                ]
              });
              alert.present();
          })
        })
      })
    }

    else
    {
      this.nav.setRoot(page.component);
    }
  }
}