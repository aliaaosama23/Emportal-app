import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordChangePage } from './password-change';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PasswordChangePage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordChangePage),
    TranslateModule.forChild()
  ],
})
export class PasswordChangePageModule {}
