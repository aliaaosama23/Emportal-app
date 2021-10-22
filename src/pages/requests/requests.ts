import { Component } from '@angular/core';
import { IonicPage,PopoverController, NavController, NavParams, ModalController, AlertController, LoadingController,  MenuController, Platform } from 'ionic-angular';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { HelperProvider } from '../../providers/helper/helper';
import { TranslateService } from '@ngx-translate/core';
import { Printer ,PrintOptions} from '@ionic-native/printer';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
@IonicPage()
@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html',
})
export class RequestsPage {
  ViewAll_Pending_Requests:any[]=[]
  show_pending:boolean=true;
  show_execute:boolean=false;
  show_all:boolean=false;

  request_type:string
  request_details:any
  request_types:any[]=[]
  Attributes:any[]=[]
  items:any[]=[]
  Req_Attrib_Lable:any
  select_request_type:boolean=false
  pending:boolean=false
  err_message:string=""
  type:string=""
  all_requests:any[]=[]
  pending_requests:any[]=[]
  execute_requests:any[]=[]
  RequestTrace:any={}
  language:string=""
  choose_status:any
  dir:boolean
  constructor(public popoverCtrl: PopoverController,private printer: Printer, private storage: Storage,
    public loadingtCtrl:LoadingController,private translate: TranslateService,
    public alertCtrl:AlertController,public menCtrl:MenuController,public platform:Platform,
    public modalCtrl:ModalController, public helper:HelperProvider,
    public service:MainserviceProvider, public navCtrl: NavController,
    public navParams: NavParams) {
      this.dir=this.platform.isRTL
      this.language=this.helper.language

      let loading=this.loadingtCtrl.create({})
      loading.present()
      //-----------  pending requests ---------------//
      this.service.PG_PendingRequest(this.helper.Emp_ID)
      .subscribe(
        (res:any)=>{
          loading.dismiss()
          this.pending_requests=res
          this.pending=false
          for(let i=0;i< this.pending_requests.length;i++)
            {
              this.pending_requests[i].Emp_Req_Date= moment(this.pending_requests[i].Emp_Req_Date).format('L');
            }
        },
        (err:any)=>{
          loading.dismiss()
         this.service.toast_service(err.error,3000)
            if(err.status=='404'){
                this.err_message=err.error
                this.pending=true
            }
        }
      )
  }

  search(){
    // show
    console.log("search.....choose status...."+this.choose_status)
    const modal = this.modalCtrl.create('PendingFilterationPage',{'status':this.choose_status});
    modal.present();
  }

  view_All(){
    const modal = this.modalCtrl.create('PendingFilterationPage');
    modal.present();
  }

  all_request(){
    this.show_pending=false;
    this.show_execute=false;
    this.show_all=true;
    console.log("--------------------all_request----------------------")
    let loading=this.loadingtCtrl.create({})
    loading.present()
        //---------------- all requests -------------------//
        this.service.PG_allRequests(this.helper.Emp_ID)
        .subscribe(
          (res:any)=>{
            loading.dismiss()
            this.all_requests=res
            for(let i=0;i< this.all_requests.length;i++)
              {
                this.all_requests[i].Emp_Req_Date= moment(this.all_requests[i].Emp_Req_Date).format('L');
              }
          },err=>{
            loading.dismiss()
            this.service.toast_service(err.error,3000)
          }
        )
  }

  Execute_request(){
    this.show_pending=false;
    this.show_execute=true;
    this.show_all=false
  //  console.log("--------------------Execute_request----------------------")
    // call all Execute requests
    this.service.ExecuteRequest(this.helper.Emp_ID)
    .subscribe(
      (res:any)=>{
        this.execute_requests=res
        for(let i=0;i< this.execute_requests.length;i++)
          {
            this.execute_requests[i].Emp_Req_Date= moment(this.execute_requests[i].Emp_Req_Date).format('L');
          }
      },
      (err:any)=>{
       this.service.toast_service(err.error,3000)

      }
    )
  }

  pending_request(){
    this.show_pending=true;
    this.show_execute=false;
    this.show_all=false
   // console.log("--------------------pending_request----------------------")
    // call all pending requests
    this.service.PG_PendingRequest(this.helper.Emp_ID)
    .subscribe(
      (res:any)=>{
        this.pending_requests=res
        this.pending=false
        for(let i=0;i< this.pending_requests.length;i++)
          {
            this.pending_requests[i].Emp_Req_Date= moment(this.pending_requests[i].Emp_Req_Date).format('L');
          }
      },
      (err:any)=>{
          if(err.status=='404'){
               this.err_message=err.error
               this.pending=true
          }
      }
    )


  }


  ionViewDidLoad() {
    // call all my requests
    let loading=this.loadingtCtrl.create({})
    loading.present()
    this.service.PG_allRequests(this.helper.Emp_ID)
    .subscribe(
      (res:any)=>{
        loading.dismiss()
        this.all_requests=res
        for(let i=0;i< this.all_requests.length;i++)
          {
            this.all_requests[i].Emp_Req_Date= moment(this.all_requests[i].Emp_Req_Date).format('L');
          }
      },err=>{
        loading.dismiss()
        this.service.toast_service(err.error,3000)
      }
    )
  }

//اجراء

request_action(Emp_Req_ID,type){
  if(type==1){
    this.translate.get("action").subscribe(
      value1 => {
        this.translate.get("reason").subscribe(
          value2 => {
            this.translate.get("take an action1").subscribe(
              value3 => {
                this.translate.get("accept").subscribe(
                  value4 => {

                      const prompt = this.alertCtrl.create({
                        title: value1,
                        message:value3,
                        inputs: [
                          {
                            name: 'Reason',
                            placeholder: value2,
                            type:'text'
                          },
                        ],
                        buttons: [
                          {
                            text:  value4,
                            handler: data => {
                              this.service.Accept_RejectRequest_Request(this.helper.Emp_ID,this.helper.brabch,Emp_Req_ID,data.Reason,"Accept").subscribe(
                                (res:any)=>{
                                  this.service.toast_service(res,3000)
                                },(err:any)=>{
                                }
                              )
                            }
                          }

                        ]
                      });
            prompt.present();
         }) }) }) })
  }else{
    this.translate.get("action").subscribe(
      value1 => {
        this.translate.get("reason").subscribe(
          value2 => {
            this.translate.get("take an action2").subscribe(
              value3 => {

                this.translate.get("reject").subscribe(
                  value5 => {
                        const prompt = this.alertCtrl.create({
                          title: value1,
                          message:value3,
                          inputs: [
                            {
                              name: 'Reason',
                              placeholder: value2,
                              type:'text'
                            },
                          ],
                          buttons: [
                            {
                              text: value5,
                              handler: data => {
                                this.service.Accept_RejectRequest_Request(this.helper.Emp_ID,this.helper.brabch,Emp_Req_ID,data.Reason,"Reject").subscribe(
                                  (res:any)=>{
                                    this.service.toast_service(res,3000)
                                  },(err:any)=>{
                                  }
                                )
                              }
                            }
                          ]
                        });
            prompt.present();
         }) }) }) })
  }

}


  add_request(){
  // call api to add request
      const modal = this.modalCtrl.create('AddRequestPage');
      modal.present();
  }

  show_details(Emp_FinalApprove,Emp_Req_ID1,Emp_Req_ID){
    this.service.RequestValueByID(Emp_Req_ID).subscribe(
      (res:any)=>{
      },
      (err:any)=>{
      }
    )

        if(this.language=="ar"){
          if(Emp_FinalApprove==null){
            let alert = this.alertCtrl.create({
              title:" <h4>   الحالة النهائية للطلب </h4>",
              subTitle:"تحت الطلب ",
              buttons: ['تم']
            });
            alert.present();
          }else{
            let alert = this.alertCtrl.create({
              title:"   <h4>  الحالة النهائية للطلب </h4>",
              subTitle:"مقبولة	",
              buttons: ['تم']
            });
            alert.present();
          }
        }
        if(this.language=="en"){
          if(Emp_FinalApprove==null){
            let alert = this.alertCtrl.create({
              title:" <h4>  request final status </h4>",
              subTitle:"under request ",
              buttons: ['ok']
            });
            alert.present();
          }else{
            let alert = this.alertCtrl.create({
              title:"   <h4>  request final status </h4>",
              subTitle:"accepted",
              buttons: ['ok']
            });
            alert.present();
          }
        }
  }

  request_status(Req_ID){
    this.service.RequestTraceByID(Req_ID).subscribe(
      (res:any[])=>{

        if(this.language=="ar"){
          if(res[0].Emp_FinalApprove==true){
            let alert = this.alertCtrl.create({
              title:res[0].Req_Attrib_Lable,
              subTitle:  "<h4 style='text-align: center;font-weight: bold;'> حالة الطلب </h4>" +"مقبولة	" +"   <h5>المسئول عن الموافقة </h5>  	" +res[0].EmpName ,
              buttons: ['تم']
            });
            alert.present();
          }else if(res[0].Emp_FinalApprove==null){
            let alert = this.alertCtrl.create({
              title:res[0].Req_Attrib_Lable,
              subTitle:  "<h4 style='text-align: center;font-weight: bold;'> حالة الطلب </h4>" +"تحت الطلب	" +"   <h5 >المسئول عن الموافقة </h5>  	" +res[0].EmpName ,
              buttons: ['تم']
            });
            alert.present();
          }
        }
        if(this.language=="en"){
          if(res[0].Emp_FinalApprove==true){
            let alert = this.alertCtrl.create({
              title:res[0].Req_Attrib_Lable,
              subTitle:  "<h4 style='text-align: center;font-weight: bold;'> request status </h4>" +"accepted" +"   <h5>Responsible for approval </h5>  	" +res[0].EmpName ,
              buttons: ['ok']
            });
            alert.present();
          }else if(res[0].Emp_FinalApprove==null){
            let alert = this.alertCtrl.create({
              title:res[0].Req_Attrib_Lable,
              subTitle:  "<h4 style='text-align: center;font-weight: bold;'> request status </h4>" +"under request" +"   <h5 >Responsible for approval </h5>  	" +res[0].EmpName ,
              buttons: ['ok']
            });
            alert.present();
          }
        }
      },err=>{
      }
    )
  }
  show_status_report(Emp_Req_ID){
      this.service.RequestTraceByID(Emp_Req_ID).subscribe(
         (res:any)=>{
      //     console.log("RequestTraceByID res...."+JSON.stringify(res))

           res[0].EmpName_Ar
           res[0].Emp_Req_ID
           res[0].Req_Trace_Status
           res[0].Req_Trace_Reason
           res[0].Emp_FinalApprove

           res[0].Emp_Req_Date= moment(res[0].Emp_Req_Date).format('L')

           if(res[0].Emp_FinalApprove==true){
              res[0].Emp_FinalApprove='موافقة'
            }

            let options: PrintOptions = {
              name: 'MyDocument',
              printerId: 'printer007',
              duplex: true,
              landscape: true,
              grayscale: true
            };
            this.storage.get('user_data').then((val:any)=>{

            this.printer.print("<div style='border-style: double;text-align:center;width: 60%; margin: 0px 20%;'><h2 style='border-bottom: 1px solid ;      line-height: 1.6;'> حالة الطلب</h2><h2> Request status</h2></div><div style='text-align:right'><p style='text-align:right'>مقدم الطلب	: "+val.Emp_Full_Name+"</p><p style='text-align:right'>رقم الطلب		: "+res[0].Emp_Req_ID+"</p><p style='text-align:right'>تاريخ الطلب		: "+res[0].Emp_Req_Date+"</p></div><div><table style='width:100%;border: 1px solid black;border-collapse: collapse;'><tr><th style='background-color:#a7a8ab;border: 1px solid black;border-collapse: collapse;'>تاريخ الطلب</th><th style='background-color:#a7a8ab;border: 1px solid black;border-collapse: collapse;'>حالة الموافقة</th><th style='background-color:#a7a8ab;border: 1px solid black;border-collapse: collapse;'>المسؤل عن الموافقة</th><th style='background-color:#a7a8ab;border: 1px solid black;border-collapse: collapse;'>السبب</th></tr><tr><td style='border: 1px solid black;border-collapse: collapse;text-align:right'>"+ res[0].Emp_Req_Date+"</td><td style='border: 1px solid black;border-collapse: collapse;text-align:right'>"+ res[0].Emp_FinalApprove+"	</td><td style='border: 1px solid black;border-collapse: collapse;text-align:right'>"+res[0].EmpName_Ar+"</td><td style='border: 1px solid black;border-collapse: collapse;text-align:right'>"+res[0].Req_Trace_Reason+"</td></tr><tr> </table> </div>", options)
            })
         },
         (err:any)=>{
          console.log("RequestTraceByID err...."+JSON.stringify(err))
        }
      )
  }

  doRefresh(refresher){
      // all requests
      this.service.PG_allRequests(this.helper.Emp_ID)
      .subscribe(
        (res:any)=>{
          refresher.complete();
          this.all_requests=res
          for(let i=0;i< this.all_requests.length;i++)
            {
              this.all_requests[i].Emp_Req_Date= moment(this.all_requests[i].Emp_Req_Date).format('L');
            }
        },err=>{
          refresher.complete();
        }
      )
      // call all pending requests
      this.service.PG_PendingRequest(this.helper.Emp_ID)
      .subscribe(
        (res:any)=>{
           //  console.log("PG_PendingRequest res..."+  JSON.stringify(res) )
          this.pending_requests=res
          for(let i=0;i< this.pending_requests.length;i++)
            {
              this.pending_requests[i].Emp_Req_Date= moment(this.pending_requests[i].Emp_Req_Date).format('L');
            }
        },
        (err:any)=>{
           //  console.log("PG_PendingRequest err..."+JSON.stringify(err)  )
         this.service.toast_service(err.error,3000)

        }
      )
    // call all Execute requests
    this.service.ExecuteRequest(this.helper.Emp_ID)
    .subscribe(
      (res:any)=>{
      //    console.log("44ExecuteRequest res..."+  JSON.stringify(res) )
        this.execute_requests=res
        for(let i=0;i< this.execute_requests.length;i++)
          {
            this.execute_requests[i].Emp_Req_Date= moment(this.execute_requests[i].Emp_Req_Date).format('L');
          }
      },
      (err:any)=>{
         //  console.log("ExecuteRequest err..."+JSON.stringify(err)  )
      this.service.toast_service(err.error,3000)

      }
    )
  }

  togglemenu(){
    this.menCtrl.toggle()
  }



  // presentPopover(myEvent) {
  //   this.service.get_requests_types(this.helper.Emp_ID)
  //     .subscribe(
  //       (res:any)=>{
  //         this.request_types=res
  //       //   //  console.log(" get_requests_types res "+JSON.stringify(res))
  //       },
  //       (err:any)=>{
  //       //   //  console.log(" get_requests_types err "+JSON.stringify(err))
  //       }
  //     )
  //   this.select_request_type=true
  //   // let popover = this.popoverCtrl.create("AddRequestPage");
  //   // popover.present({
  //   //   ev: myEvent
  //   // });
  // }


  // get_attributes_of_request_type(id){
  //   const modal = this.modalCtrl.create('AttributesPage',{'request_type_id':id});
  //   modal.present();
  // }
}
