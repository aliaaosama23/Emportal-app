import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, MenuController } from 'ionic-angular';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';

import { TranslateService } from '@ngx-translate/core';
import { HelperProvider } from '../../providers/helper/helper';

@IonicPage()
@Component({
  selector: 'page-warning',
  templateUrl: 'warning.html',
})
export class WarningPage {
  status:string="collapse"
  status1:string="collapse"
  language:any=""
  flag1:Boolean=false 
  flag2:boolean=false
  flag3:boolean=false

  flag4:Boolean=false
  flag5:boolean=false
  flag6:boolean=false

  flag7:Boolean=false
  flag8:boolean=false
  flag9:boolean=false

  flag10:Boolean=false
  flag11:boolean=false
  flag12:boolean=false

  year_from:any
  month_from:any
  day_from:any

  year_to:any
  month_to:any
  day_to:any

  higri_year_from:any
  higri_month_from:any
  higri_day_from:any

  higri_year_to:any
  higri_month_to:any
  higri_day_to:any
  year_values:any=[{}]
  month_values:any=[{}]
  day_values:any=[{}]

  higri_year_values:any=[{}]
  higri_month_values:any=[{}]
  higri_day_values:any=[{}]

warnings:any[]=[]
DateFrom:string=""
DateFrom_higri:string=""
DateTo:string=""
DateTo_higri:string=""
nodata:boolean=false
  constructor(private translate: TranslateService,public helper:HelperProvider,
    public loadingCtrl:LoadingController,public menuCtrl:MenuController,
    public modalCtrl:ModalController,public service:MainserviceProvider,
    public navCtrl: NavController, public navParams: NavParams) {
      this.language=this.helper.language
       //       1900   --->     2042
       this.year_values=[
        {'value':'1991','name':'1991'}, {'value':'1992','name':'1992'},  {'value':'1993','name':'1993'},
        {'value':'1994','name':'1994'}, {'value':'1995','name':'1995'},  {'value':'1996','name':'1996'},
        {'value':'1997','name':'1997'}, {'value':'1998','name':'1998'},  {'value':'1999','name':'1999'},
        {'value':'2000','name':'2000'}, {'value':'2001','name':'2001'},  {'value':'2002','name':'2002'},
        {'value':'2003','name':'2003'},  {'value':'2004','name':'2004'},  {'value':'2005','name':'2005'},
        {'value':'2006','name':'2006'},  {'value':'2007','name':'2007'},  {'value':'2008','name':'2008'},
        {'value':'2009','name':'2009'},  {'value':'2010','name':'2010'},  {'value':'2011','name':'2011'},
        {'value':'2012','name':'2012'},  {'value':'2013','name':'2013'},  {'value':'2014','name':'2014'},
        {'value':'2015','name':'2015'},  {'value':'2016','name':'2016'},  {'value':'2017','name':'2017'},
        {'value':'2018','name':'2018'},  {'value':'2019','name':'2019'},  {'value':'2020','name':'2020'},
        {'value':'2021','name':'2021'}, {'value':'2022','name':'2022'},  {'value':'2023','name':'2023'},
        {'value':'2024','name':'2024'},  {'value':'2025','name':'2025'},  {'value':'2026','name':'2026'},
        {'value':'2033','name':'2033'},  {'value':'2034','name':'2034'},  {'value':'2035','name':'2035'},
        {'value':'2036','name':'2036'},  {'value':'2037','name':'2037'},  {'value':'2038','name':'2038'},
        {'value':'2039','name':'2039'},  {'value':'2040','name':'2040'},  {'value':'2041','name':'2041'},
        {'value':'2042','name':'2042'},  {'value':'2043','name':'2043'},  {'value':'2044','name':'2044'},
        {'value':'2045','name':'2045'},  {'value':'2046','name':'2046'},  {'value':'2047','name':'2047'}]
      //   1318  --->  1463
      this. higri_year_values=[
        {'value':'1411','name':'1411'},{'value':'1412','name':'1412'}, {'value':'1413','name':'1413'},
        {'value':'1414','name':'1414'},{'value':'1415','name':'1415'}, {'value':'1416','name':'1416'},
        {'value':'1417','name':'1417'},{'value':'1418','name':'1418'}, {'value':'1420','name':'1420'},
        {'value':'1421','name':'1421'}, {'value':'1422','name':'1422'}, {'value':'1423','name':'1423'},
        {'value':'1424','name':'1424'}, {'value':'1425','name':'1425'}, {'value':'1426','name':'1426'},
        {'value':'1427','name':'1427'}, {'value':'1428','name':'1428'}, {'value':'1429','name':'1429'},
        {'value':'1430','name':'1430'}, {'value':'1431','name':'1431'},{'value':'1432','name':'1432'},
        {'value':'1433','name':'1433'}, {'value':'1434','name':'1434'}, {'value':'1435','name':'1435'},
        {'value':'1436','name':'1436'}, {'value':'1437','name':'1437'}, {'value':'1438','name':'1438'},
        {'value':'1439','name':'1439'},{'value':'1440','name':'1440'}, {'value':'1441','name':'1441'},
        {'value':'1442','name':'1442'}]
      this. month_values=[{'value':'01','name':'1'}, {'value':'02','name':'2'}, {'value':'03','name':'3'},
      {'value':'04','name':'4'}, {'value':'05','name':'5'}, {'value':'06','name':'6'},{'value':'07','name':'7'},
      {'value':'08','name':'8'},  {'value':'09','name':'9'}, {'value':'10','name':'10'}, {'value':'11','name':'11'},  {'value':'12','name':'12'}]

      this. day_values=[{'value':'01','name':'1'},  {'value':'02','name':'2'},  {'value':'03','name':'3'},
      {'value':'04','name':'4'},  {'value':'05','name':'5'},  {'value':'06','name':'6'},   {'value':'07','name':'7'},
      {'value':'08','name':'8'},   {'value':'09','name':'9'},   {'value':'10','name':'10'},   {'value':'11','name':'11'},
      {'value':'12','name':'12'},    {'value':'13','name':'13'},{'value':'14','name':'14'},    {'value':'15','name':'15'},
      {'value':'16','name':'16'},    {'value':'17','name':'17'},{'value':'18','name':'18'},    {'value':'19','name':'19'},
      {'value':'20','name':'20'},    {'value':'21','name':'21'},{'value':'22','name':'22'},    {'value':'23','name':'23'},
      {'value':'24','name':'24'},    {'value':'25','name':'25'},{'value':'26','name':'26'},    {'value':'27','name':'27'},
      {'value':'28','name':'28'},    {'value':'29','name':'29'},{'value':'30','name':'30'},    {'value':'31','name':'31'},  ]

      //  console.log(this.helper.language)

  }


set_georgian_year(){
    console.log(  "georgian_year...."+ this.year_from)
    this.flag1=true
    if(this.flag1 && this.flag2 && this.flag3){
      console.log("1111 georgian_year ...."+ this.year_from +"georgian_month...."+ this.month_from +"georgian_day...."+ this.day_from)
  let date=this.day_from+'/'+this.month_from+'/'+this.year_from
      this.service. get_higri_date(date.toString()).subscribe(
    (res:any)=>{
      this.higri_year_from=res.split('/')[2]
      this.higri_month_from=res.split('/')[1]
      this.higri_day_from=res.split('/')[0]
      console.log(  "year:"+   this.higri_year_from + "    month:"+  this.higri_month_from+ "    day:"+   this.higri_day_from)
      console.log(  "get_higri_date res  "+  JSON.stringify(res))
    },(err:any)=>{
      console.log(  "get_higri_date err  "+  JSON.stringify(err))
    } )
    }

}
set_georgian_month(){
    console.log(  "georgian_month...."+ this.month_from)
    this.flag2=true
    if(this.flag1 && this.flag2 && this.flag3){
      console.log("1111 georgian_year ...."+ this.year_from +"georgian_month...."+ this.month_from +"georgian_day...."+ this.day_from)
    let date=this.day_from+'/'+this.month_from+'/'+this.year_from
      this.service.get_higri_date(date.toString()).subscribe(
        (res:string)=>{
          this.higri_year_from=res.split('/')[2]
          this.higri_month_from=res.split('/')[1]
          this.higri_day_from=res.split('/')[0]
          console.log(  "year:"+   this.higri_year_from + "    month:"+  this.higri_month_from+ "    day:"+   this.higri_day_from)
        console.log(  "get_higri_date res  "+  JSON.stringify(res))
        },(err:any)=>{
        console.log(  "get_higri_date err  "+  JSON.stringify(err))
        } )
    }
}
set_georgian_day(){
    console.log(  "georgian_day...."+ this.day_from)
    this.flag3=true
    if(this.flag1 && this.flag2 && this.flag3){
      console.log("1111 georgian_year ...."+ this.year_from +"georgian_month...."+ this.month_from +"georgian_day...."+ this.day_from)
    let date=this.day_from+'/'+this.month_from+'/'+this.year_from
      this.service. get_higri_date(date.toString()).subscribe(
        (res:any)=>{
          this.higri_year_from=res.split('/')[2]
          this.higri_month_from=res.split('/')[1]
          this.higri_day_from=res.split('/')[0]
          console.log(  "year:"+   this.higri_year_from + "    month:"+  this.higri_month_from+ "    day:"+   this.higri_day_from)
        console.log(  "get_higri_date res  "+  JSON.stringify(res))
        },(err:any)=>{
        console.log(  "get_higri_date err  "+  JSON.stringify(err))
        } )
    }
}
set_higri_year(){
      this.flag4=true
      if(this.flag4 && this.flag5 && this.flag6){
      console.log("1111 higri_year ...."+ this.higri_year_from +"higri_month...."+ this.higri_month_from +"higri_day...."+ this.higri_day_from)
  let date=this.higri_day_from+'/'+this.higri_month_from+'/'+this.higri_year_from
      this.service. get_Gregorian_date(date.toString()).subscribe(
      (res:any)=>{
      this.year_from=res.split('/')[2]
      this.month_from=res.split('/')[1]
      this.day_from=res.split('/')[0]
      console.log(  "year:"+   this.year_from + "    month:"+  this.month_from+ "    day:"+   this.day_from)
      console.log(  " get_Gregorian_date res  "+  JSON.stringify(res))
      },(err:any)=>{
      console.log(  " get_Gregorian_date err  "+  JSON.stringify(err))
      } )
    }
}
set_higri_month(){
  this.flag5=true
  if(this.flag4 && this.flag5 && this.flag6){
  console.log("1111 higri_year ...."+ this.higri_year_from +"higri_month...."+ this.higri_month_from +"higri_day...."+ this.higri_day_from)
let date=this.higri_day_from+'/'+this.higri_month_from+'/'+this.higri_year_from
  this.service. get_Gregorian_date(date.toString()).subscribe(
  (res:any)=>{
  this.year_from=res.split('/')[2]
  this.month_from=res.split('/')[1]
  this.day_from=res.split('/')[0]
  console.log(  "year:"+   this.year_from + "    month:"+  this.month_from+ "    day:"+   this.day_from)
  console.log(  " get_Gregorian_date res  "+  JSON.stringify(res))
  },(err:any)=>{
  console.log(  " get_Gregorian_date err  "+  JSON.stringify(err))
  } )
}
}
set_higri_day(){
  this.flag6=true
  if(this.flag4 && this.flag5 && this.flag6){
  console.log("1111 higri_year ...."+ this.higri_year_from +"higri_month...."+ this.higri_month_from +"higri_day...."+ this.higri_day_from)
let date=this.higri_day_from+'/'+this.higri_month_from+'/'+this.higri_year_from
  this.service. get_Gregorian_date(date.toString()).subscribe(
  (res:any)=>{
  this.year_from=res.split('/')[2]
  this.month_from=res.split('/')[1]
  this.day_from=res.split('/')[0]
  console.log(  "year:"+   this.year_from + "    month:"+  this.month_from+ "    day:"+   this.day_from)
  console.log(  " get_Gregorian_date res  "+  JSON.stringify(res))
  },(err:any)=>{
  console.log(  " get_Gregorian_date err  "+  JSON.stringify(err))
  } )
}
}
// date to
set_georgian_year_to()
{
  console.log("georgian_year...."+ this.year_to)
  this.flag7=true
  if(this.flag7 && this.flag8 && this.flag9){
      console.log("1111 georgian_year ...."+ this.year_to +"georgian_month...."+ this.month_to +"georgian_day...."+ this.day_to)
    this.service.get_higri_date(this.day_to+'/'+this.month_to+'/'+this.year_to).subscribe(
      (res:any)=>{
      this.higri_year_to=res.split('/')[2]
      this.higri_month_to=res.split('/')[1]
      this.higri_day_to=res.split('/')[0]
      console.log(  "year  :"+    this.higri_year_to + "  month  :  "+  this.higri_month_to+ "  day  :  "+    this.higri_day_to)
      console.log(  "get_higri_date to res  "+  JSON.stringify(res))
      },(err:any)=>{
      console.log(  "get_higri_date to err  "+  JSON.stringify(err))
      } )
    }
}
set_georgian_month_to(){
  console.log("georgian_year...."+ this.year_to)
  this.flag8=true
  if(this.flag7 && this.flag8 && this.flag9){
      console.log("1111 georgian_year ...."+ this.year_to +"georgian_month...."+ this.month_to +"georgian_day...."+ this.day_to)
    this.service.get_higri_date(this.day_to+'/'+this.month_to+'/'+this.year_to).subscribe(
      (res:any)=>{
      this.higri_year_to=res.split('/')[2]
      this.higri_month_to=res.split('/')[1]
      this.higri_day_to=res.split('/')[0]
      console.log(  "year  :"+    this.higri_year_to + "  month  :  "+  this.higri_month_to+ "  day  :  "+    this.higri_day_to)
      console.log(  "get_higri_date to res  "+  JSON.stringify(res))
      },(err:any)=>{
      console.log(  "get_higri_date to err  "+  JSON.stringify(err))
      } )
}
}
set_georgian_day_to(){
  console.log("georgian_year...."+ this.year_to)
  this.flag9=true
  if(this.flag7 && this.flag8 && this.flag9){
      console.log("1111 georgian_year ...."+ this.year_to +"georgian_month...."+ this.month_to +"georgian_day...."+ this.day_to)
    this.service.get_higri_date(this.day_to+'/'+this.month_to+'/'+this.year_to).subscribe(
      (res:any)=>{
      this.higri_year_to=res.split('/')[2]
      this.higri_month_to=res.split('/')[1]
      this.higri_day_to=res.split('/')[0]
      console.log(  "year  :"+    this.higri_year_to + "  month  :  "+  this.higri_month_to+ "  day  :  "+    this.higri_day_to)
      console.log(  "get_higri_date to res  "+  JSON.stringify(res))
      },(err:any)=>{
      console.log(  "get_higri_date to err  "+  JSON.stringify(err))
      } )
}
}
set_higri_year_to(){
  this.flag10=true
  if(this.flag10 && this.flag11 && this.flag12){
  console.log("1111 higri_year ...."+ this.higri_year_from +"higri_month...."+ this.higri_month_from +"higri_day...."+ this.higri_day_from)
let date=this.higri_day_to+'/'+this.higri_month_to+'/'+this.higri_year_to
  this.service. get_Gregorian_date(date.toString()).subscribe(
  (res:any)=>{
  this.year_to=res.split('/')[2]
  this.month_to=res.split('/')[1]
  this.day_to=res.split('/')[0]
  console.log(  "year:"+   this.year_from + "    month:"+  this.month_from+ "    day:"+   this.day_from)
  console.log(  " get_Gregorian_date res  "+  JSON.stringify(res))
  },(err:any)=>{
  console.log(  " get_Gregorian_date err  "+  JSON.stringify(err))
  } )
}
}
set_higri_month_to(){
  this.flag11=true
  if(this.flag10 && this.flag11 && this.flag12){
  console.log("1111 higri_year ...."+ this.higri_year_from +"higri_month...."+ this.higri_month_from +"higri_day...."+ this.higri_day_from)
let date=this.higri_day_to+'/'+this.higri_month_to+'/'+this.higri_year_to
  this.service. get_Gregorian_date(date.toString()).subscribe(
  (res:any)=>{
  this.year_to=res.split('/')[2]
  this.month_to=res.split('/')[1]
  this.day_to=res.split('/')[0]
  console.log(  "year:"+   this.year_from + "    month:"+  this.month_from+ "    day:"+   this.day_from)
  console.log(  " get_Gregorian_date res  "+  JSON.stringify(res))
  },(err:any)=>{
  console.log(  " get_Gregorian_date err  "+  JSON.stringify(err))
  } )
}
}
set_higri_day_to(){
  this.flag12=true
  if(this.flag10 && this.flag11 && this.flag12){
  console.log("1111 higri_year ...."+ this.higri_year_from +"higri_month...."+ this.higri_month_from +"higri_day...."+ this.higri_day_from)
let date=this.higri_day_to+'/'+this.higri_month_to+'/'+this.higri_year_to
  this.service. get_Gregorian_date(date.toString()).subscribe(
  (res:any)=>{
  this.year_to=res.split('/')[2]
  this.month_to=res.split('/')[1]
  this.day_to=res.split('/')[0]
  console.log(  "year:"+   this.year_from + "    month:"+  this.month_from+ "    day:"+   this.day_from)
  console.log(  " get_Gregorian_date res  "+  JSON.stringify(res))
  },(err:any)=>{
  console.log(  " get_Gregorian_date err  "+  JSON.stringify(err))
  } )
}
}


  search(){
   console.log("----ViewAllWarning-----")
    let date_from=this.day_from+'/'+this.month_from+'/'+this.year_from
    let date_to=this.day_to+'/'+this.month_to+'/'+this.year_to
    console.log(date_from +"  "+date_to)
      if(date_from=='undefined/undefined/undefined' && date_to=='undefined/undefined/undefined'){
        console.log("---SearchWarnings---")
        this.warnings=[]
        //  console.log("oooo")
        this.service. SearchWarnings("","",this.helper.User_Id,this.helper.Org_ID).subscribe(
          (res:any[])=>{
          if( res.length==0){
            this.nodata=true
          }else{
            this.warnings=res
            this.nodata=false
          }

              console.log(" SearchWarnings   res....."+JSON.stringify(res))
          },
          (err:any)=>{
            this.service.toast_service(err.error.Message,2000)
            //  console.log(" SearchWarnings  err....."+JSON.stringify(err))
          }
        )

        }else{
          console.log("---SearchWarnings---")
          this.warnings=[]
          //  console.log("oooo")
          this.service. SearchWarnings(this.day_from+'/'+this.month_from+'/'+this.year_from,
          this.day_to+'/'+this.month_to+'/'+this.year_to,this.helper.User_Id,this.helper.Org_ID).subscribe(
            (res:any[])=>{
            if( res.length==0){
              this.nodata=true
            }else{
              this.warnings=res
              this.nodata=false
            }

                console.log(" SearchWarnings   res....."+JSON.stringify(res))
            },
            (err:any)=>{
              this.service.toast_service(err.error.Message,2000)
              //  console.log(" SearchWarnings  err....."+JSON.stringify(err))
            }
          )
        }

  }
  toggle(){
    this.menuCtrl.toggle()
  }
  ionViewDidLoad() {
     //  console.log('ionViewDidLoad WarningPage');
  }

  warningSelected(warning){
    const modal = this.modalCtrl.create('WarningDetailsPage',{'details':warning});
      modal.present();
  }
  expand(status){
    if(status=="expand"){
       this.status='collapse'
    }
    if(status=="collapse"){
      this.status='expand'
   }

  }
  expand1(status){
    if(status=="expand"){
       this.status1='collapse'
    }
    if(status=="collapse"){
      this.status1='expand'
   }

  }
}
