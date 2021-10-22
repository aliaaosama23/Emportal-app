import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController,Events,App,PopoverController, IonicPage, Tabs, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  rootPage: any = '';
  language:any=''
  mySide:string=""
  emp_frist_name:string=""
  emp_second_name:string=""
  emp_code:number
  Emp_PhotoPath:string=""
  pages: Array<{title: string, component: any,icon:string}>;

  tab1Root ='HomePage';
  tab2Root = 'NotificationsPage';
  tab3Root = 'ProfilePage';
  // tab4Root = 'MenuPage';

  constructor(public events: Events,public app:App,public alertCtrl: AlertController,
    public menuCtrl:MenuController,private translate: TranslateService,private nav :NavController,
    private storage: Storage,public platform: Platform,public popoverCtrl: PopoverController,
    public statusBar: StatusBar, public splashScreen: SplashScreen) {

  }

  togglemenu(){
    console.log("ppp")
   // this.presentPopover($event)
    this.menuCtrl.toggle()
  }

  
}