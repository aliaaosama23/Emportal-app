import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, ToastController, ModalController } from 'ionic-angular';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { HelperProvider } from '../../providers/helper/helper';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-add-request',
  templateUrl: 'add-request.html',
})
export class AddRequestPage {
  request_type:string
  request_details:any
  request_types:any[]=[]
  Attributes:any[]=[]
  formGroup:FormGroup
  Req_Attrib_Lable:any
  language:any
  constructor(public translate: TranslateService, public modalCtrl:ModalController,
     public helper:HelperProvider, public formBuilder: FormBuilder,
     public toastCtrl: ToastController,public viewCtrl:ViewController,
     public service:MainserviceProvider,  public navCtrl: NavController) {
this.language=this.helper.language
    this.service.get_requests_types(this.helper.Emp_ID)
      .subscribe(
        (res:any)=>{
          this.request_types=res
         console.log(" get_requests_types res "+JSON.stringify(res))
        },
        (err:any)=>{
        }
      )
  }

  ionViewDidLoad() {
  }



  get_attributes_of_request_type(id){
    const modal = this.modalCtrl.create('AttributesPage',{'request_type_id':id});
    modal.present();
  }

  goback(){
     this.viewCtrl.dismiss()
  }

}
