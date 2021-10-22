import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllMessagesPage } from './all-messages';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AllMessagesPage,
  ],
  imports: [
    TranslateModule.forChild(),
    IonicPageModule.forChild(AllMessagesPage),
  ],
})
export class AllMessagesPageModule {}
