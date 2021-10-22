import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-appointment',
  templateUrl: 'appointment.html',
})
export class AppointmentPage {
  calenders:any[]=[]
  constructor( public translate: TranslateService,private plt:Platform, private calendar: Calendar,public navCtrl: NavController, public navParams: NavParams) {
  //   this.calendar.createCalendar('MyCalendar').then(
  //     (msg) => { alert(msg); },
  //     (err) => { console.log(err); }
  //   );
  //   this.calendar.createEvent("", "location"," notes").then((val)=>{
  //      alert(val)
  //   }).catch((err)=>{
  //      alert(err)
  //   })
      this.plt.ready().then(()=>{
            this.calendar.listCalendars().then((listCalendars)=>{
            this.calenders=listCalendars
            })
      })

   }

  ionViewDidLoad() {
    // //  console.log('ionViewDidLoad AppointmentPage');
  }


  addevent(cal){
    let options = {id: cal.id ,calendarName: cal.name, url: 'http://www.nitcotek.com', firstReminderMinutes: 15 };
    this.calendar.createEventInteractivelyWithOptions('معاد جديد', 'Saudi Arabia', "notes", new Date(), new Date(), options).then(res => {
    }, err => {
    });
  }

  opencal(cal){
    this.navCtrl.push('CalDetailsPage',{'name':cal.name})
  }

  listEventsInRange(){
    this.calendar.listEventsInRange(new Date(),new Date()).then((listCalendars)=>{
      console.log(  listCalendars)
    })
  }


}
