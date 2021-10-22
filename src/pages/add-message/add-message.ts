import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperProvider } from '../../providers/helper/helper';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-add-message',
  templateUrl: 'add-message.html',
})
export class AddMessagePage {
  base64_Model:any={'Base64String':'','ex':''}
  filename:string=""
  myform:FormGroup
  language:string=""
  toppings:any
  Emps_IDs_Send_To:any[]=[]
  connections:any[]=[]
  Message_AttachmentsModel=null
//   [{
//       'MsgAtt_ID' :"",
//       'MsgAtt_Name':"",
//       'MsgAtt_Path' :"",
//        "MsgAtt_Status" :"",
//        'Fk_Msg_ID':"",
//        'base64String':"",
//        'Org_ID':"",
//        'Emp_ID' :"",
//        'Extension':""
// }]
  constructor(private fileChooser: FileChooser, private file1:File,public toastCtrl:ToastController,
     private filePath: FilePath,public modalCtrl:ModalController,
     public viewCtrl:ViewController,public service:MainserviceProvider,public helper:HelperProvider,
     public translate: TranslateService,public formBuilder: FormBuilder,public navCtrl: NavController,
     public navParams: NavParams) {

      this.language=this.helper.language
      console.log(this.language)
      this.myform =  this.formBuilder.group({
        message_subject:['', Validators.compose([Validators.required])],
        message_body:['', Validators.compose([Validators.required])],
        message_to:['', Validators.compose([Validators.required])]
      });

  }

  ionViewDidLoad() {
       console.log("AddMessagePage ionViewDidLoad ")
  }

  logForm(){
    console.log("myform...."+JSON.stringify(this.myform.value))
     this.service. SendMessage(this.helper.Emp_ID, this.Emps_IDs_Send_To,
      this.myform.value.message_subject,
      this.myform.value.message_body,this.Message_AttachmentsModel)
     .subscribe(
          (res:any)=>{
          },(err:any)=>{
           // console.log( "SendMessage err  :"+ JSON.stringify(err))
              let toast = this.toastCtrl.create({
                message:err.error.Message,
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
              toast.onDidDismiss(()=>{
                this.viewCtrl.dismiss()
              })
            }
       )
  }

  add_attachment(){
    this.fileChooser.open()
    .then(uri =>{
    
      this.filePath.resolveNativePath(uri)
      .then(filePath => {
          let ex=filePath.split('.').pop();
       
         let fileName = filePath.split('/').pop();
        this.filename=fileName
         let path = filePath.substring(0, filePath.lastIndexOf("/") + 1);
         this.file1.readAsDataURL(path, fileName)
         .then(base64File => {
          this.Message_AttachmentsModel=[{
            'MsgAtt_ID' :"",
            'MsgAtt_Name':"",
            'MsgAtt_Path' :"",
            "MsgAtt_Status" :"",
            'Fk_Msg_ID':"",
            'Org_ID':this.helper.Org_ID,
            'Emp_ID' :this.helper.Emp_ID,
            'base64String':  base64File.split(",")[1],
            'Extension':"."+ex
           }]
                
         })
         .catch(() => {
         
         })
      })
      .catch(err =>{})

    })
    .catch(e =>  {})
  }

  contact_list(){
      const modal = this.modalCtrl.create('ContactsPage');
      modal.present();
      modal.onDidDismiss((data:any[]) => {
        this.connections=data
      for(let i=0;i< this.connections.length;i++){
        this.Emps_IDs_Send_To.push(this.connections[i].Emp_ID)
        }
      })
  }

  goback(){
    this.viewCtrl.dismiss()
 }

}
