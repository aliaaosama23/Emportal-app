import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { MainserviceProvider } from '../../providers/mainservice/mainservice';
import { HelperProvider } from '../../providers/helper/helper';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-files',
  templateUrl: 'files.html',
})
export class FilesPage {
  file_type:any
  files:any[]=[]
  file_types:any[]=[]
  no_files:boolean=false
  constructor(public menuCtrl:MenuController,  private iab: InAppBrowser,private transfer: FileTransfer, private file: File, private translate: TranslateService,public helper:HelperProvider, public service:MainserviceProvider,public navCtrl: NavController, public navParams: NavParams) {

    if(this.files.length==0){
          this.no_files=true
      }else{
        this.no_files=false
      }
    this.service.GetAllFileType().subscribe(
      (res:any)=>{
            // //  console.log( "GetAllFileType res..."+   JSON.stringify(res))
            this.file_types=res
      },err=>{
            //  //  console.log("GetAllFileType err..."+ JSON.stringify(err))
      })

  }
  toggle(){
    this.menuCtrl.toggle()
  }
  ionViewDidLoad() {
     //  console.log('ionViewDidLoad FilesPage');
  }

  SearchFiles(){
     this.service.SearchFiles(this.file_type,this.helper.Emp_ID).subscribe(
       (res:any[])=>{
         if(res.length==0){
            this.no_files=true
         }else{
          this. files=res
          this.no_files=false
         }
       },err=>{
       }
     )
  }

  preview(FileType_Name){
    this.service.download_file(FileType_Name,this.helper.brabch).subscribe(
      (res:any)=>{
       this.iab.create(res,'_system','location=yes');

      }, (err:any)=>{
      }
    )

  }

  download(FileType_Name,File_Name){
    this.service.download_file(FileType_Name,this.helper.brabch).subscribe(
      (res:any)=>{
         //  this.iab.create(res,'_system','location=yes');


     const fileTransfer:FileTransferObject=this.transfer.create()
        let path=this.file.externalRootDirectory +'Download/' + File_Name
        const url1 = encodeURI(res)
        fileTransfer.download(url1,path ).then((entry) => {
          console.log('download complete: ' +entry);

          this.translate.get("downloaded successfully").subscribe(
            value=> {
               this.service.toast_service(value,2000)
            })
        })

      }, (err:any)=>{
      }
    )

}

}
