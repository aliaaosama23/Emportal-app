import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageDetailsPage } from './message-details';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MessageDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageDetailsPage),
    TranslateModule.forChild()
  ],
})
export class MessageDetailsPageModule {}
