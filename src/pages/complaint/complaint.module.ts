import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplaintPage } from './complaint';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ComplaintPage,
  ],
  imports: [
    IonicPageModule.forChild(ComplaintPage),
    TranslateModule.forChild()
  ],
})
export class ComplaintPageModule {}
