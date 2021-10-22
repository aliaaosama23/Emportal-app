import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform} from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';

@IonicPage()
@Component({
  selector: 'page-cal-details',
  templateUrl: 'cal-details.html',
})
export class CalDetailsPage {
calname:any
events:any[]=[]
  constructor(private calendar: Calendar,public navCtrl: NavController,private plt:Platform,  public navParams: NavParams) {
    console.log()

    this.calname=this.navParams.get('name')


    if(this.plt.is('ios')){
      this.calendar.findAllEventsInNamedCalendar(this.calname).then(data=>{
       this.events=data
      })
    }else if(this.plt.is('android')){
      let start=new Date()
      let end=new Date()

      end.setDate(end.getDate() +31)

      this.calendar.listEventsInRange(start,end).then(data=>{
        this.events=data
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalDetailsPage');
  }

}
