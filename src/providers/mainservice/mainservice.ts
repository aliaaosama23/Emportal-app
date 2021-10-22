import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelperProvider } from '../helper/helper';
import { ToastController } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MainserviceProvider {

  constructor( private translate: TranslateService, public toastCtrl:ToastController, public http: HttpClient,public helper:HelperProvider) {
  }


  //-------------------------------  login  ------------------------------//

  // get cerdintials username and password

  login(params,PlayerID){ //ok
      let body={
        "Username":params.Username,
        "Password":params.Password,
        "PlayerID":PlayerID
      }
      if(navigator.onLine){
        return   this.http.post(this.helper.base_url+'MultiLogin/Login',body)
      }
      else{
        this.presentToastConnection()
      }
  }

  //-------------------------  dashboard ---------------------------------//
  EmployeeDashboard(Emp_ID){ //ok
    if(navigator.onLine){

      // /40762
      return   this.http.get(this.helper.base_url+'EmployeeOptions/GetOptions?Emp_ID='+Emp_ID)
    }
    else{
     this.presentToastConnection()
    }
  }

  //-------------------------- Profile  --------------------------------//

  GetEmployeeData(user_id){ //ok
    if(navigator.onLine){
    return   this.http.get(this.helper.base_url+'EmployeeProfile/GetEmployeeData?User_Id='+user_id)
    }
    else{
    this.presentToastConnection()
    }
  }

  GetEmployeeContacts(Emp_Id:any){ //ok
    if(navigator.onLine){
    return   this.http.get(this.helper.base_url+'EmployeeProfile/GetEmployeeContacts?Emp_Id='+Emp_Id)
    }
    else{
    this.presentToastConnection()
    }
  }

  GetEmployeeAddress(Emp_Id:any){ //ok
    if(navigator.onLine){
    return   this.http.get(this.helper.base_url+'EmployeeProfile/GetEmployeeAddress?Emp_Id='+Emp_Id)
    }
    else{
    this.presentToastConnection()
    }
  }

  GetEmployeePostion(Emp_Id:any){ //ok
    if(navigator.onLine){
    return   this.http.get(this.helper.base_url+'EmployeeProfile/GetEmployeePostion?Emp_Id='+Emp_Id)
    }
    else{
    this.presentToastConnection()
    }
  }

 //------------------------------------- UpdateEmpPassword  ----------------------------------------------//
  change_password(User_ID,params){//ok
    let body={
      "User_ID":User_ID,
      "OldPassword":params.OldPassword,
      "NewPassword":params.NewPassword
    }
      if(navigator.onLine){
    return   this.http.post(this.helper.base_url+'EmployeeProfile/UpdateEmpPassword',body)
    }
    else{
    this.presentToastConnection()
    }
  }

//--------------------------------------  requests  ---------------------------------------------------//
        طلباتي
    PG_allRequests(Emp_ID){   //ok      all my requests
      if(navigator.onLine){
      return   this.http.get(this.helper.base_url+'MyRequestStatus/AllRequests?Emp_ID='+Emp_ID)
      }
      else{
      this.presentToastConnection()
      }
    }

    //---- requests types  ---//
    get_requests_types(Emp_ID){   //ok
      if(navigator.onLine){
      return   this.http.get(this.helper.base_url+'MyRequestStatus/AllRequestTypes?Emp_ID='+Emp_ID)
    }
    else{
    this.presentToastConnection()
    }
    }

    RequestValueByID(Req_ID){   //ok    عرض الطلب
      if(navigator.onLine){
      return   this.http.get(this.helper.base_url+'MyRequestStatus/RequestValueByID?Req_ID='+Req_ID)
    }
    else{
    this.presentToastConnection()
    }
    }

    RequestTraceByID(Req_ID){//ok  حالة الطلب,عرض حالة الطلب
      if(navigator.onLine){
      return   this.http.get(this.helper.base_url+'MyRequestStatus/RequestTraceByID?Req_ID='+Req_ID)
      }
      else{
      this.presentToastConnection()
      }
    }

    // get attributes od this request type
    GetRequestAttributes(Req_Type_ID){//ok
      if(navigator.onLine){
      return   this.http.get(this.helper.base_url+'MyRequestStatus/GetRequestAttributes?Req_Type_ID='+Req_Type_ID)
      }
      else{
      this.presentToastConnection()
      }
    }


//------------------------------------------------  AddRequest  --------------------------------------------//

AddRequest(params){
   var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');


 if(navigator.onLine){
  return   this.http.post(this.helper.base_url+'MyRequestStatus/AddRequest',params,{headers:headers})
}
else{
this.presentToastConnection()
}
}

      //--------------- PendingRequest ---------------//
  PG_PendingRequest(Emp_ID){//ok     all pending requests
 // debugger;
    if(navigator.onLine){
        return   this.http.get(this.helper.base_url+'PendingRequests/SelectAllPendingReq?Emp_ID='+Emp_ID)
      }
      else{
      this.presentToastConnection()
      }
  }

  RequestDetails(Emp_Req_ID){  //ok    عرض الطلب
    if(navigator.onLine){
    return   this.http.get(this.helper.base_url+'PendingRequests/RequestDetails?Emp_Req_ID='+Emp_Req_ID)
  }
  else{
  this.presentToastConnection()
  }
  }

 // حالة الطلب,عرض حالة الطلب

 AllRequestTraceByRequestId (Req_ID){
  if(navigator.onLine){
  return   this.http.get(this.helper.base_url+'PendingRequests/AllRequestTraceByRequestId?Req_ID='+Req_ID)
  }
  else{
  this.presentToastConnection()
  }
}

 Accept_RejectRequest_Request (Emp_ID,Branch_ID,Emp_Req_ID,Reason,action){
   let body={
     "ExecuteRequestRequireConfirming" :"",
     "ConfirmCode" :"",
     "Emp_Req_ID" :Emp_Req_ID,
     "Branch_ID":Branch_ID,
     "Emp_ID" :Emp_ID,
     "Reason":Reason
   }
   if(action=="Accept"){
      if(navigator.onLine){
        return   this.http.post(this.helper.base_url+'PendingRequests/AcceptRequest',body)
      }
      else{
      this.presentToastConnection()
      }
   }
   if(action=="Reject"){
    if(navigator.onLine){
       return   this.http.post(this.helper.base_url+'PendingRequests/RejectRequest',body)
      }
      else{
      this.presentToastConnection()
      }
   }
 }


 ViewAll_Requests(Emp_ID){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+'/PendingRequests/ViewAll_Requests?Emp_ID='+Emp_ID)
    }
    else{
    this.presentToastConnection()
    }
 }


 Search_Requests(Emp_ID,ExcutionStatus){
  if(navigator.onLine){
    return   this.http.get(this.helper.base_url+'/PendingRequests/Search_Requests?Emp_ID='+Emp_ID+'&ExcutionStatus='+ExcutionStatus)
  }
  else{
  this.presentToastConnection()
  }
 }
  //------------------------------------------- ExecuteRequest ------------------------------------//
  //ViewAll-
  ExecuteRequest(Emp_ID){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+'ExecuteRequest/ViewAll?Emp_ID='+Emp_ID)
    }
    else{
    this.presentToastConnection()
    }
  }
  //SearchRequest
  SearchRequest(Emp_ID){
    let body={
      'ReqType_ID':"",
      'ExcutionStatus_ID':"",
      'Emp_Req_Date':"",
      'RequestTitle':"",
      'Emp_ID':""
    }
    if(navigator.onLine){
    return   this.http.post(this.helper.base_url+'ExecuteRequest/SearchRequest',body)
    }
    else{
    this.presentToastConnection()
    }
  }

  //---------------------------------------------------- my files ---------------------------------------------------------//

    //--------------- all my files ---------------//
    GetAllFileType(){//ok
      if(navigator.onLine){
      return   this.http.get(this.helper.base_url+'EmployeeFilesView/GetAllFileType')
      }
      else{
      this.presentToastConnection()
      }
    }

    //--------------- file_type ---------------//
    SearchFiles(FileType_ID ,Emp_ID ){//ok
      if(navigator.onLine){
      return   this.http.get(this.helper.base_url+'EmployeeFilesView/SearchFiles?FileType_ID='+FileType_ID+'&Emp_ID='+Emp_ID)
      }
      else{
      this.presentToastConnection()
      }
    }

    download_file(File_ID,Branch_ID){
      if(navigator.onLine){
      return   this.http.get(this.helper.base_url+'EmployeeFilesView/Preview?File_ID='+File_ID+'&Branch_ID='+Branch_ID)
      }
      else{
      this.presentToastConnection()
      }
    }

   //----------------------------------------------------- Complaints  -------------------------------------------------------//
              //-------------- get all Complaints  ------------//
      GetComplaintsByEmpID(Emp_ID){//ok
        if(navigator.onLine){
        return   this.http.get(this.helper.base_url+'EmployeeComplaints/GetComplaintsByEmpID?Emp_ID='+Emp_ID)
      }
      else{
      this.presentToastConnection()
      }
      }
              //-------------- send Complaint //update or new Complaint ------------//
      SaveComplaints(Emp_ID,formdata,flag,Emp_Comp_ID){//ok

        if(flag=='1'){
          let body={
            'Emp_ID':Emp_ID,
            'Emp_Comp_ID':Emp_Comp_ID ,
            'Complaint_Title' :formdata.Complaint_Title,
            'Complaint_Message':formdata.Complaint_Message,
            'Emp_Comp_Date':"",
            'Emp_Comp_Status':"",
            'Flag':flag
          }
           if(navigator.onLine){
          return   this.http.post(this.helper.base_url+'EmployeeComplaints/SaveComplaints', body)
        }
        else{
        this.presentToastConnection()
        }
        }
            else if(flag=='0'){
              let body={
                'Emp_ID':Emp_ID,
                'Emp_Comp_ID':'0',
                'Complaint_Title' :formdata.Complaint_Title,
                'Complaint_Message':formdata.Complaint_Message,
                'Emp_Comp_Date':"",
                'Emp_Comp_Status':"",
                'Flag':flag
              }
               if(navigator.onLine){
              return   this.http.post(this.helper.base_url+'EmployeeComplaints/SaveComplaints', body)
            }
            else{
            this.presentToastConnection()
            }
            }

        }
            //-------------- update Complaint  ------------//
        GetComplainByIDToEdit(Com_ID){
          if(navigator.onLine){
        return   this.http.get(this.helper.base_url+'EmployeeComplaints/GetComplainByIDToEdit?Com_ID='+Com_ID)
      }
      else{
      this.presentToastConnection()
      }
      }

            //-------------- delete Complaint  ------------//
      delete_Complaint(Com_ID){//ok
             if(navigator.onLine){
          return   this.http.post(this.helper.base_url+'EmployeeComplaints/DeleteComplaint?Com_ID='+Com_ID,{})
        }
        else{
        this.presentToastConnection()
        }
        }

      //-----------------------------------------------Warnings -----------------------------------------------------//
        SearchWarnings(DateFrom,DateTo,UserID,FK_Org_ID){
          let body={
            'DateFrom':DateFrom,
            'DateTo':DateTo,
            'UserID':UserID,
            'FK_Org_ID':FK_Org_ID
          }
          if(navigator.onLine){
          return   this.http.post(this.helper.base_url+"EmployeeWarningSearch/SearchWarnings",body)
        }
        else{
        this.presentToastConnection()
        }
        }


      CheckBoxChange(params){
        if(navigator.onLine){
      return   this.http.post(this.helper.base_url+"EmployeeWarningSearch/CheckBoxChange",params)
    }
    else{
    this.presentToastConnection()
    }
    }


      //----------------------- ----------------------messages --------------------------------------------//

     // inbox
      InBox(Emp_ID){//ok
        if(navigator.onLine){
        return   this.http.get(this.helper.base_url+'InBox/ViewAll?Emp_ID='+Emp_ID)
      }
      else{
      this.presentToastConnection()
      }
      }


      ReadBody(Msg_ID){
        if(navigator.onLine){
        return   this.http.get(this.helper.base_url+'InBox/ReadBody?Msg_ID='+Msg_ID)
      }
      else{
      this.presentToastConnection()
      }
      }


      SearchInbox(Emp_ID,EntryDateFrom,EndDateTo,Msg_IsRead){//ok
        let body={
          'EntryDateFrom':EntryDateFrom,
          'EndDateTo':EndDateTo,
          'Emp_ID':Emp_ID,
          'Msg_IsRead':Msg_IsRead
        }
        if(navigator.onLine){
        return   this.http.post(this.helper.base_url+'InBox/SearchInbox', body)
      }
      else{
      this.presentToastConnection()
      }
      }

      DeleteMessage(Msg_ID){
        if(navigator.onLine){
        return   this.http. post(this.helper.base_url+'InBox/DeleteMessage?Msg_ID='+Msg_ID,{})
      }
      else{
      this.presentToastConnection()
      }
      }

      connection_list(Org_ID){//ok
        if(navigator.onLine){
        return   this.http.get(this.helper.base_url+'OutBox/FillEmpGrid?Org_ID='+Org_ID)
      }
      else{
      this.presentToastConnection()
      }
      }

      OutBox(Emp_ID){//ok
        if(navigator.onLine){
        return   this.http.get(this.helper.base_url+'OutBox/BindMessageGrid?Emp_ID='+Emp_ID)
      }
      else{
      this.presentToastConnection()
      }
      }

      viewFile(msg_ID){
        if(navigator.onLine){
        return   this.http.get(this.helper.base_url+'OutBox/viewFile?msg_ID='+msg_ID)
      }
      else{
      this.presentToastConnection()
      }
      }

      DownloadFile(msg_ID,Org_ID,Branch_ID){
        if(navigator.onLine){
        return   this.http.get(this.helper.base_url+'OutBox/DownloadFile?msg_ID='+msg_ID+'&Org_ID='+Org_ID+'&Branch_ID='+Branch_ID)
      }
      else{
      this.presentToastConnection()
      }
      }

      DeleteMsg(msg_ID){
        if(navigator.onLine){
        return   this.http. get(this.helper.base_url+'OutBox/DeleteMsg?msg_ID='+msg_ID)
      }
      else{
      this.presentToastConnection()
      }
      }

      SendMessage(Emp_ID,Emps_IDs_Send_To,Msg_Subject,Msg_Body,Message_AttachmentsModel){
        let body={
          'Msg_ID':'',
          'Emp_ID':Emp_ID,
          'Emp_ID_List':'',
          'Msg_Subject' :Msg_Subject,
          'Msg_Body':Msg_Body,
          'Emp_FullName' :'',
          'Msg_From':'',
          'Msg_IsRead':'',
          'Msg_Date':'',
          'Msg_In_Status' :'',
          'Msg_Out_Status':'',
          'Emps_IDs_Send_To':Emps_IDs_Send_To,
          'Message_Attachments':null,
          'Message_AttachmentsModel':Message_AttachmentsModel
        }
        if(navigator.onLine){
          return   this.http.post(this.helper.base_url+'OutBox/SendMessage',body)
        }
        else{
        this.presentToastConnection()
        }
      }
      // ---------------------------- notices -------------------------------------//

      LoadGrid(Emp_ID)
      {
        if(navigator.onLine){
          return   this.http.get(this.helper.base_url+'EmployeeNotifications/LoadGrid?Emp_ID='+Emp_ID)
        }
        else{
        this.presentToastConnection()
        }
      }
     //----------------------- ----------------------InternalRegulation --------------------------------------------//
      PG_InternalRegulation(){
        if(navigator.onLine){
        return   this.http.get('domain/EmpPortal/HR/ PG_InternalRegulation')
      }
      else{
      this.presentToastConnection()
      }
      }
      //------------------------------------------------Appointment -------------------------------------------------//

      PG_EmpAppointment(){
        if(navigator.onLine){
        return   this.http.get('domain/EmpPortal/HR/PG_EmpAppointment')
      }
      else{
      this.presentToastConnection()
      }
      }

      //------------------------------------------------Notifications -------------------------------------------------//

        PG_EmployeeNotifications(){
          if(navigator.onLine){
          return   this.http.get('domain/EmpPortal/HR/PG_EmployeeNotifications')
        }
        else{
        this.presentToastConnection()
        }
        }

         //------------------------------------------------Salaries -------------------------------------------------//

         BindPayrollSlip(Emp_ID,yearToSearch){
          if(navigator.onLine){
            return   this.http.get( this.helper.base_url+'EmployeeInqueries/BindPayrollSlip?Emp_ID='+Emp_ID+"&yearToSearch="+yearToSearch )
          }
          else{
          this.presentToastConnection()
          }
         }

        BindPayrollSlipGrid(Emp_ID){
          if(navigator.onLine){
          return   this.http.get( this.helper.base_url+'EmployeeInqueries/BindPayrollSlipGrid?Emp_ID='+Emp_ID)
        }
        else{
        this.presentToastConnection()
        }
        }

        BindVacations(Emp_ID){
          if(navigator.onLine){
          return   this.http.get( this.helper.base_url+'EmployeeInqueries/BindVacations?Emp_ID='+Emp_ID)
        }
        else{
        this.presentToastConnection()
        }
        }

        GetEmpVacationBalanceCount(Emp_ID){   //عدد ابام الاجازات
          if(navigator.onLine){
            return   this.http.get( this.helper.base_url+'EmployeeInqueries/GetEmpVacationBalanceCount?Emp_ID='+Emp_ID)
          }
          else{
          this.presentToastConnection()
          }
        }

/// --------------------------AttendanceMachine/SelectMachineNames ------------------------ ///

      AttendanceMachine(Branch_ID){
        if(navigator.onLine){
          return   this.http.get( this.helper.base_url+'AttendanceMachine/SelectMachineNames?Branch_ID='+Branch_ID)
        }
        else{
        this.presentToastConnection()
        }
      }


      BindAttendanceGrid(Machine_ID,Date_From,Date_To,Emp_ID,Branch_ID){
        if(navigator.onLine){
          return   this.http.get(this.helper.base_url+'AttendanceMachine/BindAttendanceGrid?Machine_ID='+Machine_ID+"&Date_From="+Date_From+"&Date_To="+Date_To+"&Emp_ID="+Emp_ID+"&Branch_ID="+Branch_ID)
        }
        else{
        this.presentToastConnection()
        }
      }
//---------------- for printing --------------//
// 1
        GetPayrollEmployeeDeduction(Payroll_ID,Emp_ID){
          if(navigator.onLine){
          return   this.http.get( this.helper.base_url+'EmployeeInqueries/GetPayrollEmployeeDeduction?Payroll_ID='+Payroll_ID+"&Emp_ID="+Emp_ID)
        }
        else{
        this.presentToastConnection()
        }
        }
// 2
        GetPayrollEmployeeAddition(Payroll_ID,Emp_ID){
          if(navigator.onLine){
          return   this.http.get( this.helper.base_url+'EmployeeInqueries/GetPayrollEmployeeAddition?Payroll_ID='+Payroll_ID+"&Emp_ID="+Emp_ID)
        }
        else{
        this.presentToastConnection()
        }
        }
// 3
        GetEmpPayslip(Payroll_ID,Emp_ID){
          if(navigator.onLine){
          return   this.http.get( this.helper.base_url+'EmployeeInqueries/GetEmpPayslip?Payroll_ID='+Payroll_ID+"&Emp_ID="+Emp_ID)
        }
        else{
        this.presentToastConnection()
        }
        }

       //---------------------------------------- Convert from  Hijri to  Gregorian  ----------------------------------------//

       get_Gregorian_date(date){
        if(navigator.onLine){
          return this.http.get(this.helper.base_url+'EmployeeComplaints/GetDate?Date='+date)
        }
        else{
        this.presentToastConnection()
        }
        }

        //---------------------------------------- Convert from Gregorian   to  Hijri ----------------------------------------//

        get_higri_date(date){
          if(navigator.onLine){
          return this.http.get(this.helper.base_url+'EmployeeComplaints/GetHijriDate?Date='+date)
        }
        else{
        this.presentToastConnection()
        }
        }


        upload(file,Org_ID,Emp_ID){
          if(navigator.onLine){
            const endpoint = 'https://esteraha.careofme.net/RestAppAPI/Hostel/UploadImage/1';
            const formData: FormData = new FormData();
            formData.append('ImgPath', file);
            formData.append('HostelID', '7');
            return this.http.post(endpoint, formData)
          }
          else{
          this.presentToastConnection()
          }
        }

        uploadFile(file:string,Org_ID,Emp_ID,Extension){
          let body={
            'base64String':file,
            'Org_ID':Org_ID,
            'Emp_ID':Emp_ID,
            'Extension':Extension
          }
          if(navigator.onLine){
          return   this.http.post(this.helper.base_url+'EmployeeProfile/PostUserImage',body)
        }
        else{
        this.presentToastConnection()
        }
        }

       //-------------------------------------------------toast --------------------------------------------------------//
      toast_service(message,duration){
        let toast = this.toastCtrl.create({
          message:  message,
          duration: duration,
          position: 'bottom'
        });

        toast.onDidDismiss(() => {
        });

        toast.present();
      }


    presentToastConnection(){

      this.translate.get("connection error").subscribe(
        val=>{
          let toast = this.toastCtrl.create({
            message:val,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
      )
    }

}
