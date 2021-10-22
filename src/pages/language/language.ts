import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events, MenuController } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-language',
  templateUrl: 'language.html',
})
export class LanguagePage {
  language:any=""
  constructor(public menuCtrl:MenuController, private storage:Storage,public events:Events, public platform:Platform,private translate: TranslateService, public helper:HelperProvider, public navCtrl: NavController, public navParams: NavParams) {
  this.language=this.helper.language
  }
  toggle(){
    this.menuCtrl.toggle()
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LanguagePage');
  }

  changeLanguage(event){
    // this.helper.language=this.language
    console.log("changeLanguage...."+JSON.stringify(event))
      if(this.language=='ar'){
      
        this.helper.changeLanguage('ar')
        this.platform.setDir('rtl',true)
        this.events.publish('Language','ar')
        this.storage.set('language','ar')
        this.events.subscribe('Language')
        this.storage.set('mySide','right')
      }else{
        this.helper.changeLanguage('en')
        this.platform.setDir('ltr',true)
        this.events.publish('Language','en')
        this.storage.set('language','en')
        this.events.subscribe('Language')
        this.storage.set('mySide','left')
      }
    
  }
}
