import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController, ToastController } from 'ionic-angular';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { HelperProvider } from '../../providers/helper/helper';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { Printer ,PrintOptions} from '@ionic-native/printer';
import * as moment from 'moment';
@IonicPage()
@Component({
  selector: 'page-salary',
  templateUrl: 'salary.html',
})
export class SalaryPage {
  PYRL_ID:any
  total:any
  allAmount:any
  allDeductions:any
  PayrollEmployeeDeduction:any[]=[]
  GetEmpPayslip:any[]=[]
  Fixed_addition:any
  code:any
  name:any
  daysoff:any
  BindPayrollSlipGrid:any[]=[]
  todaydate:any
  language:any
  years :any[]//=[{'PYRL_Year':"",'PYRL_ID':""}]
  months:any[]
  year:any
  month:any
  constructor(public toastCtrl: ToastController, public menuCtrl:MenuController, public loadingCtrl:LoadingController, private printer: Printer,private translate: TranslateService,  private storage: Storage,public navCtrl: NavController,public helper:HelperProvider, public service:MainserviceProvider, public navParams: NavParams) {
    this.years=[
     
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

    this.language=this.helper.language
      this.todaydate=  moment(new Date()).format('l');
      console.log(  this.todaydate)
    let loading =this.loadingCtrl.create({})
      loading.present()

    this.service.BindPayrollSlip(this.helper.Emp_ID,2017)
    .subscribe(
      (res:any)=>{
      },
      (err:any)=>{
      }
    )

    this.service. BindPayrollSlipGrid(this.helper.Emp_ID).subscribe(
      (res:any[])=>{
        loading.dismiss()
        this.BindPayrollSlipGrid=res
            this.service. BindVacations(this.helper.Emp_ID).subscribe(
              (res:any)=>{
                const toast = this.toastCtrl.create({
                  message: res,
                  duration: 3000
                });
                toast.present();
              },(err:any)=>{
              }
            )
      
        //this.years = res.map(a => a.PYRL_Year);
        this.years= Array.from(new Set(res.map(a => a.PYRL_Year))).sort();
       // this.years=this.years.sort()
       // this.months = res.map(a => a.PYRL_Month);
        this.months= Array.from(new Set(res.map(a => a.PYRL_Month))).sort();
       // this.months=  this.months.sort()

      },(err:any)=>{
        loading.dismiss()
      }
    )

    //عدد ابام الاجازات
      this.service.   GetEmpVacationBalanceCount(this.helper.Emp_ID)
      .subscribe(
        (res:any)=>{
          if(typeof(res)=='string'){
            const toast = this.toastCtrl.create({
              message: res,
              duration: 3000
            });
            toast.present();
          }else{
            this.daysoff=res
          }   
        },
        (err:any)=>{}
      )

  }

  select_yaer(){
    console.log(this.year)

  }

  select_month(){
    console.log(this.month)
  }

  toggle(){
    this.menuCtrl.toggle()
  }
//,Emp_Code,Emp_Name_Ar

print(){
    
  this.storage.get('user_data').then((val:any)=>{
    if(val!=null || val!=undefined){
   
     let Emp_Code=  val.Emp_Code
     let Emp_Name_Ar  =val.Emp_Full_Name
     this.BindPayrollSlipGrid.forEach(elem=>{
      if(elem.PYRL_Month==this.month && elem.PYRL_Year==this.year){
        this.PYRL_ID=elem.PYRL_ID
      }
     })
   let PYRL_ID=this.PYRL_ID


    this.service.GetEmpPayslip( this.PYRL_ID, this.helper.Emp_ID).subscribe(
      (res1:any[])=>{

        let options: PrintOptions = {
          name: 'MyDocument',
          printerId: 'printer007',
          duplex: true,
          landscape: true,
          grayscale: true
        };
        this.GetEmpPayslip=res1

        if(this.GetEmpPayslip.length==4){
          this.allAmount=this.GetEmpPayslip[0].PYRL_Emp_Add_Amount+
          this.GetEmpPayslip[1].PYRL_Emp_Add_Amount+
          this.GetEmpPayslip[2].PYRL_Emp_Add_Amount+
          this.GetEmpPayslip[3].PYRL_Emp_Add_Amount
        }
        else{
            this.allAmount=this.GetEmpPayslip[0].PYRL_Emp_Add_Amount+
            this.GetEmpPayslip[1].PYRL_Emp_Add_Amount+
            this.GetEmpPayslip[2].PYRL_Emp_Add_Amount
        }
        

        this.total= Math.round((this.allAmount-this.allDeductions) * 100) / 100
          if(this.language=="ar"){
                if(this.GetEmpPayslip.length==4){       
                  this.printer.print(" <h2 style='border:1px solid black;text-align:center;width: 60%; margin: 0px 20%;'>    تقرير راتب موظف    </h2>     <p style='text-align:right;font-size:23px'> <span>  كود الموظف:</span>  <span>"+Emp_Code+"</span>  <span style='text-align:left;margin-right:20%' >"+   this.todaydate+"  </span> </p>     <p style='text-align:right;font-size:23px'> <span> اسم الموظف :</span>  <span>"+Emp_Name_Ar+"</span></p>   <h1 style='text-align:right'>العلاوات</h1>  <p>  <div style='display: grid;grid-template-columns: auto auto ;padding: 10px;'> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[3].PYRL_Emp_Add_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>RNW allowance </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[1].PYRL_Emp_Add_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Transportation allowance</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[0].PYRL_Emp_Add_Amount+" </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Fixed addition</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[2].PYRL_Emp_Add_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>الراتب الأساسي </div> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+ this.allAmount+"</div><div style='border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;background-color:#a7a8ab;'>إجمالي العلاوات </div></div> <h1 style='text-align:right'>الاستقطاعات</h1>  <p>  <div style='display: grid;grid-template-columns: auto auto ;padding: 10px;'> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.PayrollEmployeeDeduction[2].PYRL_Emp_Ded_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>kok </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.PayrollEmployeeDeduction[1].PYRL_Emp_Ded_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Social Insurance	</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.PayrollEmployeeDeduction[3].PYRL_Emp_Ded_Amount+" </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Absent/Late	 </div> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+ this.allDeductions+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;background-color:#a7a8ab;'>إجمالي الاستقطاعات </div> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+ this.total+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;background-color:#a7a8ab;'>المستحق </div>", options) 
                }
                else{       
                  this.printer.print(" <h2 style='border:1px solid black;text-align:center;width: 60%; margin: 0px 20%;'>    تقرير راتب موظف    </h2>     <p style='text-align:right;font-size:23px'> <span>  كود الموظف:</span>  <span>"+Emp_Code+"</span>  <span style='text-align:left;margin-right:20%' >"+   this.todaydate+"  </span> </p>     <p style='text-align:right;font-size:23px'> <span> اسم الموظف :</span>  <span>"+Emp_Name_Ar+"</span></p>   <h1 style='text-align:right'>العلاوات</h1>  <p>  <div style='display: grid;grid-template-columns: auto auto ;padding: 10px;'> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[1].PYRL_Emp_Add_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Transportation allowance</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[0].PYRL_Emp_Add_Amount+" </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Fixed addition</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[2].PYRL_Emp_Add_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>الراتب الأساسي </div> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+ this.allAmount+"</div><div style='border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;background-color:#a7a8ab;'>إجمالي العلاوات </div></div> <h1 style='text-align:right'>الاستقطاعات</h1>  <p>  <div style='display: grid;grid-template-columns: auto auto ;padding: 10px;'> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.PayrollEmployeeDeduction[2].PYRL_Emp_Ded_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>kok </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.PayrollEmployeeDeduction[1].PYRL_Emp_Ded_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Social Insurance	</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+ this.allDeductions+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;background-color:#a7a8ab;'>إجمالي الاستقطاعات </div> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+ this.total+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;background-color:#a7a8ab;'>المستحق </div>", options) 
                }
            }
          else{
            if(this.GetEmpPayslip.length==4){
              this.printer.print(" <h2 style='border:1px solid black;text-align:center;width: 60%; margin: 0px 20%;'>    Employee salary report  </h2>     <p style='text-align:right;font-size:23px'> <span> employee code:</span>  <span>"+Emp_Code+"</span>  <span style='text-align:left;margin-right:20%' >"+   this.todaydate+"  </span> </p>     <p style='text-align:right;font-size:23px'> <span> employee name :</span>  <span>"+Emp_Name_Ar+"</span></p>   <h1 style='text-align:right'>Premiums</h1>  <p>  <div style='display: grid;grid-template-columns: auto auto ;padding: 10px;'> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[3].PYRL_Emp_Add_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>RNW allowance </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[1].PYRL_Emp_Add_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Transportation allowance</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[0].PYRL_Emp_Add_Amount+" </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Fixed addition</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[2].PYRL_Emp_Add_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>الراتب الأساسي </div> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+ this.allAmount+"</div><div style='border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;background-color:#a7a8ab;'>total Premiums</div></div> <h1 style='text-align:right'>الاستقطاعات</h1>  <p>  <div style='display: grid;grid-template-columns: auto auto ;padding: 10px;'> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.PayrollEmployeeDeduction[2].PYRL_Emp_Ded_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>kok </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.PayrollEmployeeDeduction[1].PYRL_Emp_Ded_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Social Insurance	</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.PayrollEmployeeDeduction[3].PYRL_Emp_Ded_Amount+" </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Absent/Late	 </div> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+ this.allDeductions+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;background-color:#a7a8ab;'>total deduction</div> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+ this.total+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;background-color:#a7a8ab;'>total </div>", options)
            }
            else{
              this.printer.print(" <h2 style='border:1px solid black;text-align:center;width: 60%; margin: 0px 20%;'>    Employee salary report  </h2>     <p style='text-align:right;font-size:23px'> <span> employee code:</span>  <span>"+Emp_Code+"</span>  <span style='text-align:left;margin-right:20%' >"+   this.todaydate+"  </span> </p>     <p style='text-align:right;font-size:23px'> <span> employee name :</span>  <span>"+Emp_Name_Ar+"</span></p>   <h1 style='text-align:right'>Premiums</h1>  <p>  <div style='display: grid;grid-template-columns: auto auto ;padding: 10px;'> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[3].PYRL_Emp_Add_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>RNW allowance </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[1].PYRL_Emp_Add_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Transportation allowance</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[0].PYRL_Emp_Add_Amount+" </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Fixed addition</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[2].PYRL_Emp_Add_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>الراتب الأساسي </div> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+ this.allAmount+"</div><div style='border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;background-color:#a7a8ab;'>total Premiums</div></div> <h1 style='text-align:right'>الاستقطاعات</h1>  <p>  <div style='display: grid;grid-template-columns: auto auto ;padding: 10px;'> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.PayrollEmployeeDeduction[2].PYRL_Emp_Ded_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>kok </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.PayrollEmployeeDeduction[1].PYRL_Emp_Ded_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Social Insurance	</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+ this.allDeductions+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;background-color:#a7a8ab;'>total deduction</div> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+ this.total+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;background-color:#a7a8ab;'>total </div>", options)
            }
          }

      },(err:any)=>{
      }
    )

    this.service.GetPayrollEmployeeDeduction(PYRL_ID, this.helper.Emp_ID)
    .subscribe(
      (res:any)=>{
        this.PayrollEmployeeDeduction=res
        this.allDeductions=this.PayrollEmployeeDeduction[0].PYRL_Emp_Ded_Amount+this.PayrollEmployeeDeduction[1].PYRL_Emp_Ded_Amount+this.PayrollEmployeeDeduction[2].PYRL_Emp_Ded_Amount
      },(err:any)=>{
        }
      )


    }else{
       
    }
  })
}

  // print1(){
  // console.log("print-----")
  //   this.storage.get('user_data').then((val:any)=>{
  //    // if(val!=null || val!=undefined){
     
  //      let Emp_Code=  val.Emp_Code
  //      let Emp_Name_Ar  =val.Emp_Full_Name
  //      this.BindPayrollSlipGrid.forEach(elem=>{
  //        alert("1"+this.month)
  //       if(elem.PYRL_Month==this.month && elem.PYRL_Year==this.year){
  //         alert("2")

  //         console.log("elem.PYRL_Month====="+ JSON.stringify(elem))
  //         this.PYRL_ID=elem.PYRL_ID
  //       }
  //      })
  //    //let PYRL_ID=this.PYRL_ID
  //    console.log("PYRL_ID..."+this.PYRL_ID)
  //    this.BindPayrollSlipGrid.forEach(element => {
  //      if(element.PYRL_Month== this.month && element.PYRL_Year==this.year)
  //      {
  //       this.PYRL_ID=element.PYRL_ID
  //       this.service.GetEmpPayslip( this.PYRL_ID, this.helper.Emp_ID).subscribe(
  //         (res1:any[])=>{
  
  //           console.log( "   GetEmpPayslip res...."+  JSON.stringify(res1 ))
  //           this.GetEmpPayslip=res1
  //         },(err:any)=>{
  //           console.log( "  GetEmpPayslip err...."+  JSON.stringify(err ))
  //           }
  //         )
  
        
  //      }
  //    });
     
  //    let options: PrintOptions = {
  //     name: 'MyDocument',
  //     printerId: 'printer007',
  //     duplex: true,
  //     landscape: true,
  //     grayscale: true
  //   };
  //    this.GetEmpPayslip.forEach(element => {
  //     this.allAmount+=element.PYRL_Emp_Add_Amount//
    
  //   });
  //             // this.GetEmpPayslip[1].PYRL_Emp_Add_Amount+
  //             // this.GetEmpPayslip[2].PYRL_Emp_Add_Amount+
  //             // this.GetEmpPayslip[3].PYRL_Emp_Add_Amount
  //               console.log("this.allAmount"+this.allAmount)
  //             this.total= Math.round((this.allAmount-this.allDeductions) * 100) / 100
         
  //             let loading=this.loadingCtrl.create({})
  //             loading.present()
  //             this.service.GetPayrollEmployeeDeduction(this.PYRL_ID, this.helper.Emp_ID)
  //             .subscribe(
  //               (res:any)=>{
  //                 loading.dismiss()
  //                 this.PayrollEmployeeDeduction=res
  //                 console.log( "   GetPayrollEmployeeDeduction res...."+  JSON.stringify(res))
  //                 this.PayrollEmployeeDeduction.forEach(element=>{
  //                   alert(element.PYRL_Emp_Ded_Amount)
  //                   this.allDeductions+=element.PYRL_Emp_Ded_Amount
  //                   console.log("allDeductions........."+this.allDeductions)
  //                 })
              
  //               },(err:any)=>{
  //                 loading.dismiss()
  //                 console.log( "  GetPayrollEmployeeDeduction err...."+  JSON.stringify(err ))
  //                 }
  //               )
    
  //           if(this.language=="ar"){
  //             if(this.GetEmpPayslip.length==4)
  //             {
  //               this.printer.print(" <h2 style='border:1px solid black;text-align:center;width: 60%; margin: 0px 20%;'>    تقرير راتب موظف    </h2>     <p style='text-align:right;font-size:23px'> <span>  كود الموظف:</span>  <span>"+Emp_Code+"</span>  <span style='text-align:left;margin-right:20%' >"+   this.todaydate+"  </span> </p>     <p style='text-align:right;font-size:23px'> <span> اسم الموظف :</span>  <span>"+Emp_Name_Ar+"</span></p>   <h1 style='text-align:right'>العلاوات</h1>  <p>  <div style='display: grid;grid-template-columns: auto auto ;padding: 10px;'> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[3].PYRL_Emp_Add_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>RNW allowance </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[1].PYRL_Emp_Add_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Transportation allowance</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[0].PYRL_Emp_Add_Amount+" </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Fixed addition</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[2].PYRL_Emp_Add_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>الراتب الأساسي </div> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+ this.allAmount+"</div><div style='border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;background-color:#a7a8ab;'>إجمالي العلاوات </div></div> <h1 style='text-align:right'>الاستقطاعات</h1>  <p>  <div style='display: grid;grid-template-columns: auto auto ;padding: 10px;'> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.PayrollEmployeeDeduction[2].PYRL_Emp_Ded_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>kok </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.PayrollEmployeeDeduction[1].PYRL_Emp_Ded_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Social Insurance	</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.PayrollEmployeeDeduction[3].PYRL_Emp_Ded_Amount+" </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Absent/Late	 </div> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+ this.allDeductions+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;background-color:#a7a8ab;'>إجمالي الاستقطاعات </div> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+ this.total+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;background-color:#a7a8ab;'>المستحق </div>", options)
  //             }
  //             else
  //             {
  //               console.log(JSON.stringify(this.PayrollEmployeeDeduction))
  //              this.printer.print(" <h2 style='border:1px solid black;text-align:center;width: 60%; margin: 0px 20%;'>    تقرير راتب موظف    </h2>     <p style='text-align:right;font-size:23px'> <span>  كود الموظف:</span>  <span>"+Emp_Code+"</span>  <span style='text-align:left;margin-right:20%' >"+   this.todaydate+"  </span> </p>     <p style='text-align:right;font-size:23px'> <span> اسم الموظف :</span>  <span>"+Emp_Name_Ar+"</span></p>   <h1 style='text-align:right'>العلاوات</h1>  <p>  <div style='display: grid;grid-template-columns: auto auto ;padding: 10px;'> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[1].PYRL_Emp_Add_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Transportation allowance</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[0].PYRL_Emp_Add_Amount+" </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Fixed addition</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[2].PYRL_Emp_Add_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>الراتب الأساسي </div> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+ this.allAmount+"</div><div style='border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;background-color:#a7a8ab;'>إجمالي العلاوات </div></div> <h1 style='text-align:right'>الاستقطاعات</h1>  <p>  <div style='display: grid;grid-template-columns: auto auto ;padding: 10px;'> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.PayrollEmployeeDeduction[2].PYRL_Emp_Ded_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>kok </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.PayrollEmployeeDeduction[1].PYRL_Emp_Ded_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Social Insurance	</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>", options)
    
  //             }
  //           }
  //           else{
  //             if(this.GetEmpPayslip.length==4)
  //                 {
  //                             this.printer.print(" <h2 style='border:1px solid black;text-align:center;width: 60%; margin: 0px 20%;'>    Employee salary report  </h2>     <p style='text-align:right;font-size:23px'> <span> employee code:</span>  <span>"+Emp_Code+"</span>  <span style='text-align:left;margin-right:20%' >"+   this.todaydate+"  </span> </p>     <p style='text-align:right;font-size:23px'> <span> employee name :</span>  <span>"+Emp_Name_Ar+"</span></p>   <h1 style='text-align:right'>Premiums</h1>  <p>  <div style='display: grid;grid-template-columns: auto auto ;padding: 10px;'> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[3].PYRL_Emp_Add_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>RNW allowance </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[1].PYRL_Emp_Add_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Transportation allowance</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[0].PYRL_Emp_Add_Amount+" </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Fixed addition</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[2].PYRL_Emp_Add_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>الراتب الأساسي </div> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+ this.allAmount+"</div><div style='border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;background-color:#a7a8ab;'>total Premiums</div></div> <h1 style='text-align:right'>الاستقطاعات</h1>  <p>  <div style='display: grid;grid-template-columns: auto auto ;padding: 10px;'> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.PayrollEmployeeDeduction[2].PYRL_Emp_Ded_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>kok </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.PayrollEmployeeDeduction[1].PYRL_Emp_Ded_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Social Insurance	</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.PayrollEmployeeDeduction[3].PYRL_Emp_Ded_Amount+" </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Absent/Late	 </div> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+ this.allDeductions+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;background-color:#a7a8ab;'>total deduction</div> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+ this.total+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;background-color:#a7a8ab;'>total </div>", options)
                  
  //                 }
  //                 else
  //                 {
  //                               this.printer.print(" <h2 style='border:1px solid black;text-align:center;width: 60%; margin: 0px 20%;'>    Employee salary report  </h2>     <p style='text-align:right;font-size:23px'> <span> employee code:</span>  <span>"+Emp_Code+"</span>  <span style='text-align:left;margin-right:20%' >"+   this.todaydate+"  </span> </p>     <p style='text-align:right;font-size:23px'> <span> employee name :</span>  <span>"+Emp_Name_Ar+"</span></p>   <h1 style='text-align:right'>Premiums</h1>  <p>  <div style='display: grid;grid-template-columns: auto auto ;padding: 10px;'> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[1].PYRL_Emp_Add_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Transportation allowance</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[0].PYRL_Emp_Add_Amount+" </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Fixed addition</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.GetEmpPayslip[2].PYRL_Emp_Add_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>الراتب الأساسي </div> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+ this.allAmount+"</div><div style='border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;background-color:#a7a8ab;'>total Premiums</div></div> <h1 style='text-align:right'>الاستقطاعات</h1>  <p>  <div style='display: grid;grid-template-columns: auto auto ;padding: 10px;'> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.PayrollEmployeeDeduction[2].PYRL_Emp_Ded_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>kok </div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+this.PayrollEmployeeDeduction[1].PYRL_Emp_Ded_Amount+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>Social Insurance	</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+ this.allDeductions+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;background-color:#a7a8ab;'>total deduction</div> <div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;'>"+ this.total+"</div><div style='background-color: rgba(255, 255, 255);border: 1px solid rgba(0, 0, 0, 0.8);padding: 10px; font-size: 30px; text-align: center;background-color:#a7a8ab;'>total </div>", options)
                  
  //                 }
  //           }
    
     


  //     // }else{
         
  //     // }
  //   })
  // }

  ionViewDidLoad() {

  }
}
