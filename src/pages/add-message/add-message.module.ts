import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMessagePage } from './add-message';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(AddMessagePage),
    TranslateModule.forChild()
  ],
})
export class AddMessagePageModule {}
