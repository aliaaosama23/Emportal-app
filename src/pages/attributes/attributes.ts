import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { HelperProvider } from '../../providers/helper/helper';
import { TranslateService } from '@ngx-translate/core';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-attributes',
  templateUrl: 'attributes.html',
})
export class AttributesPage {

  Attributes:any[]=[]
  req_type_id:any
  desc:any
  array_values:any[]=[]
  base64_Model:any
  Temp_Requset_ValueList:any=[{'FK_Req_Attrib_ID':'','FK_Emp_Req_ID':'','Req_Val_Value':''}]

  filename:string=""
  constructor( private file1:File, private filePath: FilePath,private fileChooser: FileChooser,
    public translate: TranslateService,public helper:HelperProvider,  public toastCtrl:ToastController,
     public viewCtrl:ViewController,public service:MainserviceProvider,
      public navCtrl: NavController, public navParams: NavParams)
      {
        this.req_type_id=this.navParams.get('request_type_id')
        this.service.GetRequestAttributes(this.navParams.get('request_type_id')).subscribe(
          (res:any[])=>{
              this.Attributes=res
              this.Attributes.forEach(element => {
                element.val="",
                element.Emp_ID=this.helper.Emp_ID,
                element.Branch_ID=this.helper.brabch
              });
          },
          (err:any)=>{
          }
        )
      }

  ionViewDidLoad() {
  }

  add_request(){
    
      this.Attributes.forEach(elem=>{
        this.Temp_Requset_ValueList.push({'FK_Req_Attrib_ID':elem.Req_Attrib_ID,'Req_Val_Value':elem.val,'FK_Emp_Req_ID':""})
          
      })

                let body={
                  "Req_Val_ID":"",
                  "Temp_Requset_ValueList":this.Temp_Requset_ValueList,
                  "RequestType_Value":"",
                  "Emp_ID":this.helper.Emp_ID,
                  "Branch_ID":this.helper.brabch,
                  "Req_Attrib_Lable":"",
                  "Req_Trace_Status":null,
                  "FileList":null, //this.base64_Model,
                  "FK_Req_Type_ID": this.req_type_id
                }
                this.service.AddRequest(body)
                .subscribe(
                  (res:any)=>{
                  const toast = this.toastCtrl.create({
                    message: this.translate.instant("request sent successfully"),
                    duration: 3000
                  });
                  toast.present();
                  toast.onDidDismiss(()=>{
                    this.viewCtrl.dismiss()
                  })
                  },err=>{
                    this.service.toast_service(err.error,3000)
                  }
                )

  }

  goback(){
    this.viewCtrl.dismiss()
  }

  open_files(){
    this.fileChooser.open()
    .then(uri =>{
      console.log("====="+  uri)

      this.filePath.resolveNativePath(uri)
      .then(filePath => {
          let ex=filePath.split('.').pop();
        
         let fileName = filePath.split('/').pop();
        this.filename=fileName
         let path = filePath.substring(0, filePath.lastIndexOf("/") + 1);
         this.file1.readAsDataURL(path, fileName)
         .then(base64File => {
          this.base64_Model={
                   'Base64String':  base64File.split(",")[1],
                   'Extension':"."+ex
                 }
                
         })
         .catch(() => {
         
         })
      })
      .catch(err =>   {})

    })
    .catch(e =>  {})
  }

}

 