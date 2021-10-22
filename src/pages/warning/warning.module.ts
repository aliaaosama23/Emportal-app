import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WarningPage } from './warning';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    WarningPage,
  ],
  imports: [
    IonicPageModule.forChild( WarningPage),
    TranslateModule.forChild()
  ],
})
export class WarningPageModule {}
