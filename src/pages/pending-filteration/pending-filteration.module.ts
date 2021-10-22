import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendingFilterationPage } from './pending-filteration';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PendingFilterationPage,
  ],
  imports: [
    IonicPageModule.forChild(PendingFilterationPage),
    TranslateModule.forChild()
  ],
})
export class PendingFilterationPageModule {}
