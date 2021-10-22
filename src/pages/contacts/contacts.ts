import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { HelperProvider } from '../../providers/helper/helper';

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  myInput:any;
  shouldShowCancel:any;
  searchTerm:any
  connection:any
  relationship:any=""
  isDisabled:boolean=false
  connections:any[]=[]
  dir:boolean
  constructor(public helper:HelperProvider,public service:MainserviceProvider,
      public loadingCtrl:LoadingController,public viewCtrl:ViewController,public platform:Platform,
      public translate: TranslateService,public navCtrl: NavController,
      public navParams: NavParams) {
         this.dir=this.platform.isRTL
        // call api to get list of connections
        let loading=this.loadingCtrl.create({})
        loading.present()
      this.service.connection_list(this.helper.Org_ID).subscribe(
        (res:any[])=>{
          loading.dismiss()


          res.forEach(element=>{
            element.checked=false
          })
          this.connections=res
        },
        (err:any)=>{
          loading.dismiss()
        }
      )



  }

  ionViewDidLoad() {
   //  //  console.log('ionViewDidLoad ContactsPage');
  }


  goback(){
    this.viewCtrl.dismiss(
      this.connections=  this.connections.filter(item=>{
        return (item.checked==true)
      })
    )
      console.log( "connections ...."+  JSON.stringify(this.connections))
 }


 close(){
  console.log(   "connections before...."+ JSON.stringify(this.connections))
  this.viewCtrl.dismiss(
    this.connections=  this.connections.filter(item=>{
      return (item.checked==true)
    })
  )
    console.log(   "connections after...."+ JSON.stringify(this.connections))
 }


 getItems(ev: any) {	
  // Reset items back to all of the items

  // set val to the value of the searchbar
  let val = ev.target.value;
   //  console.log("ppp"+val)
  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
     // //  console.log("get item value..."+val)
    this.connections = this.connections.filter((item) => {
     //  //  console.log("filtered items..."+JSON.stringify(item))
      return (item.Emp_Name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
  else{
    // call api to get list of connections
    let loading=this.loadingCtrl.create({})
    loading.present()
    this.service.connection_list(this.helper.Org_ID).subscribe(
      (res:any)=>{
        loading.dismiss()
        this.connections=res
        this.connections.forEach(element=>{
          element.checked=false
        })
      },
      (err:any)=>{
        loading.dismiss()
      }
    )
  }

 }
}
