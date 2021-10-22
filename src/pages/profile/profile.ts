import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController, MenuController, ActionSheetController, Events } from 'ionic-angular';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { HelperProvider } from '../../providers/helper/helper';
import { TranslateService } from '@ngx-translate/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as moment from 'moment';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { JsonPipe } from '@angular/common';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
 
  expand1_BasicData:boolean=false
  expand1_Contact_Info:boolean=false
  expand1_Address:boolean=false
  expand1_Employee_Position:boolean=false
  language:string=""
  myFiles:any[]=[];
  base64Image:string=""
  EmployeeData:any={}
  contacts:any[]=[]
  Address:any[]=[]
  Postions:any[]=[]
  Emp_PhotoPath:any=""
  file:any
  public imagePath;
  imgURL: any;
  public message: string;
  constructor( private file1:File, public helper:HelperProvider,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController, public http: HttpClient,private translate: TranslateService,
    public events: Events,public actionSheetCtrl: ActionSheetController, private storage: Storage,
    public menCtrl:MenuController,public navCtrl: NavController,private camera: Camera,
    public service:MainserviceProvider,public navParams: NavParams,private filePath: FilePath) {
     console.log("this.base64Image"+  this.base64Image)
      this.language=this.helper.language
      // api get profile
      console.log( this.language)
      let loading=this.loadingCtrl.create({})
      loading.present()
      this.storage.get('user_data').then((val:any)=>{

          this.service.GetEmployeeData(val.User_Id).subscribe(
            (res:any)=>{
              loading.dismiss()
              this.base64Image=""  // "https://empportalapi.careofme.net/"+res.Emp_PhotoPath.substring(29)
             
              console.log( "base64Image...."+ this.base64Image)
              this.EmployeeData=res
              this.EmployeeData.Emp_DOB= moment( this.EmployeeData.Emp_DOB).format('L');
            },err=>{   loading.dismiss()}
          )
          this.service.GetEmployeeContacts(val.Emp_ID).subscribe(
            (res:any)=>{this.contacts=res },err=>{ } )

          this.service.GetEmployeeAddress(val.Emp_ID).subscribe(
            (res:any)=>{this.Address=res },  err=>{ })

          this.service.GetEmployeePostion(val.Emp_ID).subscribe(
            (res:any)=>{
                res[0].Emp_Position_JoinDate=moment( res[0].Emp_Position_JoinDate).format('L');

            this.Postions=res
          },  
           err=>{ } 
         )

    })

  }

  ionViewDidLoad() {
     //  console.log('ionViewDidLoad PtofilePage');
  }


   upload_image(){
    this.translate.get("choose from gallery").subscribe(
      value1 => {
        this.translate.get("take photo from camera").subscribe(
          value2 => {
            this.translate.get("cancel").subscribe(
              value3 => {
        const actionSheet = this.actionSheetCtrl.create({

          buttons: [
            {
              text:value1  ,
              role:  'Destructive',
              handler: () => {
              this.choose_photo(0)
              }
            },{
              text:value2,
              role:  'Destructive',
              handler: () => {
                this.choose_photo(1)
              }
            },{
              text: value3 ,
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        actionSheet.present();

        })
      })
    })
  }

  handleFileInput(src,files) {
    if(src.target.files && src.target.files[0]){
      let reader = new FileReader();
      reader.onload = (event:any) => {
        this.base64Image= event.target.result;
      }
      reader.readAsDataURL(src.target.files[0]);
    }
    console.log(files)
    this.file1= files.item(0)
    this.upload(this.file1)
  }

  upload(file){
    this.service.upload(file,this.helper.Org_ID,this.helper.Emp_ID).subscribe(
      (res:any)=>{
      },
      (err:any)=>{
      })  
  }

  choose_photo(type){
    let page =this

    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType:type
    }

    this.camera.getPicture(options).then((file) => {
        // let loading=this.loadingCtrl.create({})
        // loading.present()
          page.filePath.resolveNativePath(file)
          .then(filePath => {
              let ex=filePath.split('.').pop();
              console.log("file extionsion..."+ex)
              // split file path to directory and file name
              let fileName = filePath.split('/').pop();
              let path = filePath.substring(0, filePath.lastIndexOf("/") + 1);
              page.file1.readAsDataURL(path, fileName)
              .then(base64File => {
                  page.service.uploadFile(base64File.split(",")[1],page.helper.Org_ID,page.helper.Emp_ID,"."+ex).subscribe(
                    (res:any)=>{
                      page.base64Image=  res
                      page.events.publish('image updated',res)
                       page.storage.set('image',res)
                    },
                    (err:any)=>{
                    })
                })
              .catch(() => {
              })
          })
          .catch(err =>  {});
        }, (err) => {
        // Handle error
      });
    console.log('Destructive clicked');
  }

  togglemenu(){
    this.menCtrl.toggle()
  }


  show_notification(){
    this.navCtrl.push('NotificationsPage')
  }

  doRefresh(refresher){


    //refresher.complete();

      this.storage.get('user_data').then((val:any)=>{

          this.service.GetEmployeeData(val.User_Id).subscribe(
            (res:any)=>{
              refresher.complete();
              this.base64Image=""  // "https://empportalapi.careofme.net/"+res.Emp_PhotoPath.substring(29)
             
              console.log( "base64Image...."+ this.base64Image)
              this.EmployeeData=res
              this.EmployeeData.Emp_DOB= moment( this.EmployeeData.Emp_DOB).format('L');
            },err=>{   refresher.complete();}
          )
          this.service.GetEmployeeContacts(val.Emp_ID).subscribe(
            (res:any)=>{this.contacts=res },err=>{ } )

          this.service.GetEmployeeAddress(val.Emp_ID).subscribe(
            (res:any)=>{this.Address=res },  err=>{ })

          this.service.GetEmployeePostion(val.Emp_ID).subscribe(
            (res:any)=>{
                res[0].Emp_Position_JoinDate=moment( res[0].Emp_Position_JoinDate).format('L');

            this.Postions=res
          },  
           err=>{ } 
         )

    })

  }

  expand(type){
      if(type==0){
        this.expand1_BasicData=true
      } 
      if(type==1){
        this.expand1_BasicData=false
      }
  }
  
  expand1(type){
    if(type==0){
      this.expand1_Contact_Info=true
    } 
    if(type==1){
      this.expand1_Contact_Info=false
    }
  }

  expand2(type){
    if(type==0){
      this.expand1_Address=true
    } 
    if(type==1){
      this.expand1_Address=false
    }
  }
  
  expand3(type){
    if(type==0){
      this.expand1_Employee_Position=true
    } 
    if(type==1){
      this.expand1_Employee_Position=false
    }
  }
}





  // fn(base64File){
  //   var binary = atob(base64File.split(',')[1]);
  //   var array = [];
  //   for (var i = 0; i < binary.length; i++) {
  //   array.push(binary.charCodeAt(i));
  //   }
  //   var myFile:Blob= new Blob([new Uint8Array(array)], {
  //   type: 'image/jpg'
  //   });
  //   alert(myFile)
  //   const reader = new FileReader();
  //   reader.readAsText(myFile);
  //   alert(JSON.stringify(reader) )
  // }