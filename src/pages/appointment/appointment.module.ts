import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentPage } from './appointment';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppointmentPage,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentPage),
    TranslateModule.forChild()
  ],
})
export class AppointmentPageModule {}
