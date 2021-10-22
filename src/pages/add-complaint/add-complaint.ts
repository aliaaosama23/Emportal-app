import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { HelperProvider } from '../../providers/helper/helper';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-add-complaint',
  templateUrl: 'add-complaint.html',
})
export class AddComplaintPage {
  myform:FormGroup
  Title:any=""
  Message:any=""
  flag:any
  Emp_Comp_ID:any
  come_from:any=""
  language:any
  constructor( public viewCtrl:ViewController,public toastCtrl:ToastController,
    public service:MainserviceProvider,public helper:HelperProvider,public translate: TranslateService,
    public formBuilder: FormBuilder,public events: Events,public loadingCtrl: LoadingController,
    public navCtrl: NavController, public navParams: NavParams) {

      this.language=this.helper.language
      this.myform =  this.formBuilder.group({
          Complaint_Title:['', Validators.compose([Validators.required])],
          Complaint_Message:['', Validators.compose([Validators.required])]
        });

        this.come_from=this.navParams.get('comefrom')

     if(this.navParams.get('comefrom') =='edit_complaint')
      {
        this.flag='1'
          let loading = this.loadingCtrl.create({
            content: 'Please wait...'
          });
          loading.present();
          this.service.GetComplainByIDToEdit(this.navParams.get('com_id'))
          .subscribe(
              (res:any)=>{
                loading.dismiss();
                  this.Title=res.Emp_Comp_Title
                  this.Message=res.Emp_Comp_Message
                 this.Emp_Comp_ID= res.Emp_Comp_ID
              },err=>{
                loading.dismiss();
              }
        )
      }else{
        this.flag='0'
      }

  }

  ionViewDidLoad() {
  }

  goback(){
    this.viewCtrl.dismiss()
 }

  logForm()
  {
   console.log(JSON.stringify(this.myform.value))
    this.service.SaveComplaints(this.helper.Emp_ID,this.myform.value,this.flag,this.Emp_Comp_ID).subscribe(
      (res:any)=>{

  if(this.come_from=='edit_complaint'){
    this.translate.get("complaint updated successfully").subscribe(
      value => {
        let toast = this.toastCtrl.create({
          message: value,
          duration: 3000,
          position: 'bottom'
        });
        toast.onDidDismiss(() => {
          this.viewCtrl.dismiss()
          this.events.publish('dismiss',"true");
        });
        toast.present();
      }
    )
  }
    else if(this.come_from=='add_complaint'){
      this.translate.get("complaint send successfully").subscribe(
        value => {
          let toast = this.toastCtrl.create({
            message: value,
            duration: 3000,
            position: 'bottom'
          });
          toast.onDidDismiss(() => {
            this.viewCtrl.dismiss()
            this.events.publish('dismiss',"true");
          });
          toast.present();
        }
      )
    }



      })

  }

}
