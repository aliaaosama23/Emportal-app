import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { HelperProvider } from '../../providers/helper/helper';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-pending-filteration',
  templateUrl: 'pending-filteration.html',
})
export class PendingFilterationPage {
  ViewAll_Pending_Requests:any[]=[]
  status:any
  language:any
  constructor(public viewCtrl:ViewController, public service:MainserviceProvider,public helper:HelperProvider, 
     public navCtrl: NavController, public navParams: NavParams) {

      this.language=this.helper.language

      this.status=this.navParams.get('status')
       
      console.log(this.status)

      if(this.status==undefined){
        this.service.ViewAll_Requests(this.helper.Emp_ID).subscribe(
          (res:any[])=>{
            for(let i=0;i< res.length;i++)
              {
                if(res[i].Req_Trace_DateTime!=null){
                  res[i].Req_Trace_DateTime= moment(res[i].Req_Trace_DateTime).format('L');
                }else{
                  res[i].Req_Trace_DateTime=null
                }
              }

              this.ViewAll_Pending_Requests=res
          },(err:any)=>{
          }
        )
      }else{
        this.service.Search_Requests(this.helper.Emp_ID, this.status).subscribe(
          (res:any)=>{
            for(let i=0;i< res.length;i++)
            {
              if(res[i].Req_Trace_DateTime!=null){
                res[i].Req_Trace_DateTime= moment(res[i].Req_Trace_DateTime).format('L');
              }else{
                res[i].Req_Trace_DateTime=null
              }
            }
              this.ViewAll_Pending_Requests=res
          },(err:any)=>{
          }
        )
      }
        

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendingFilterationPage');
  }

  goback(){
     this.viewCtrl.dismiss()
  }
}
