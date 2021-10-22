import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddComplaintPage } from './add-complaint';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddComplaintPage,
  ],
  imports: [
    IonicPageModule.forChild(AddComplaintPage),
    TranslateModule.forChild()
  ],
})
export class AddComplaintPageModule {}
