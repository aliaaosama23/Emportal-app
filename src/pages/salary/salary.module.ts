import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalaryPage } from './salary';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SalaryPage,
  ],
  imports: [
    IonicPageModule.forChild(SalaryPage),
    TranslateModule.forChild()
  ],
})
export class SalaryPageModule {}
