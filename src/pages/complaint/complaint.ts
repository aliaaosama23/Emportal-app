import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController, Events, MenuController, LoadingController } from 'ionic-angular';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { HelperProvider } from '../../providers/helper/helper';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-complaint',
  templateUrl: 'complaint.html',
})
export class ComplaintPage {
  complaints:any[]=[]
  language:string=""
  no_complaints:boolean=false
  constructor(public helper:HelperProvider,public menuCtrl:MenuController,
    public toastCtrl:ToastController,public translate: TranslateService,public loadingCtrl:LoadingController,
    public service:MainserviceProvider, public alertCtrl:AlertController,
     public modalCtrl:ModalController, public navCtrl: NavController,public events: Events,
     public navParams: NavParams) {
      this.language=this.helper.language
      events.subscribe('dismiss', (val) => {
        this.service.GetComplaintsByEmpID(this.helper.Emp_ID).subscribe(
            (res:any[])=>{

                if(res.length==0){
                  this.no_complaints=true
                }else{
                  this.no_complaints=false
                  this.complaints=res
                }

              for(let i=0;i< this.complaints.length;i++)
              {
                if(this.complaints[i].Emp_Comp_Date!=null){
                  this.complaints[i].Emp_Comp_Date= moment(this.complaints[i].Emp_Comp_Date).format('L');
                }else{
                  this.complaints[i].Emp_Comp_Date=null
                }
              }
            },
            (err:any)=>{
            }
        )
      });

  }


  toggle(){
    this.menuCtrl.toggle()
  }
  
  ionViewDidLoad() {
    let loading=this.loadingCtrl.create({})
    loading.present()
    this.service.GetComplaintsByEmpID(this.helper.Emp_ID).subscribe(
      (res:any[])=>{

      loading.dismiss()
          this.complaints=res
        for(let i=0;i< this.complaints.length;i++)
        {

          if(this.complaints[i].Emp_Comp_Date!=null){
            this.complaints[i].Emp_Comp_Date= moment(this.complaints[i].Emp_Comp_Date).format('L');
          }
          else{
            this.complaints[i].Emp_Comp_Date=null
          }
          }
      },
      (err:any)=>{
        loading.dismiss()
      }
    )
  }

  add_complaint(){
    const modal = this.modalCtrl.create('AddComplaintPage',{'comefrom':'add_complaint'});
    modal.present();
  }

  edit_complaint(id){
    const modal = this.modalCtrl.create('AddComplaintPage',{'comefrom':'edit_complaint','com_id':id});
    modal.present();
  }

  delete_complaint(Emp_Comp_ID){

    this.translate.get("do you want to remove this complaint").subscribe(
      value1 => {
        this.translate.get("no").subscribe(
          value2 => {
            this.translate.get("yes").subscribe(
              value3 => {

                  const alert = this.alertCtrl.create({
                    title: value1,
                    buttons: [
                      {
                        text:  value2 ,
                        handler: data => {
                        }
                      },
                      {
                        text: value3 ,
                        handler: data => {
                      
                              this.service.delete_Complaint(Emp_Comp_ID)
                              .subscribe(
                                (res:any)=>{

                                  this.service.GetComplaintsByEmpID(this.helper.Emp_ID).subscribe(
                                    (res:any[])=>{
                                       if(res.length==0){
                                        this.no_complaints=true
                                      }else{
                                        this.no_complaints=false
                                        this.complaints=res
                                      }
                                      for(let i=0;i< this.complaints.length;i++)
                                      {
                                        this.complaints[i].Emp_Comp_Date= moment(this.complaints[i].Emp_Comp_Date).format('L');
                                      }

                                    },
                                    (err:any)=>{
                                    }
                                  )
                                     this.service.GetComplaintsByEmpID(this.helper.Emp_ID).subscribe(
                                      (res:any[])=>{
                                         if(res.length==0){
                                          this.no_complaints=true
                                          this.complaints=[]
                                        }else{
                                          this.no_complaints=false
                                          this.complaints=res
                                        }
                                        for(let i=0;i< this.complaints.length;i++)
                                        {
                                          this.complaints[i].Emp_Comp_Date= moment(this.complaints[i].Emp_Comp_Date).format('L');
                                        }

                                      },
                                      (err:any)=>{
                                      }
                                    )
                                    let toast = this.toastCtrl.create({
                                      message:  res,
                                      duration: 3000,
                                      position: 'bottom'
                                    });

                                    toast.onDidDismiss(() => {
                                       if(this.complaints.length==0){
                                        this.no_complaints=true
                                      }else{
                                        this.no_complaints=false

                                      }
                                    });

                                    toast.present();

                                },err=>{
                                  if( err.error!=null){

                                    this.service.toast_service( err.error.Message,3000)

                                  }

                                }
                              )
                          // on sucess :call the complaints list again
                          this.service.GetComplaintsByEmpID(this.helper.Emp_ID).subscribe()
                        }
                      }
                    ]
                  });
                  alert.present();

            })
          })
        })
  }

  doRefresh(refresher){
    this.service.GetComplaintsByEmpID(this.helper.Emp_ID).subscribe(
      (res:any)=>{
        refresher.complete()
          // console.log("GetComplaintsByEmpID  res ...5"+JSON.stringify(res)  )
        this.complaints=res
        if(this.complaints.length==0){
          this.no_complaints=true
        }else{
          this.no_complaints=false
          this.complaints=res
        }
        for(let i=0;i< this.complaints.length;i++)
        {
          this.complaints[i].Emp_Comp_Date= moment(this.complaints[i].Emp_Comp_Date).format('L');
        }
      },
      (err:any)=>{
        refresher.complete()
      }
    )

  }

}