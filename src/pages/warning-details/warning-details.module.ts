import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WarningDetailsPage } from './warning-details';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    WarningDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(WarningDetailsPage),
    TranslateModule.forChild()
  ],
})
export class WarningDetailsPageModule {}
