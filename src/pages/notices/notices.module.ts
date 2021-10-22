import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticesPage } from './notices';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NoticesPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticesPage),
    TranslateModule.forChild()
  ],
})
export class NoticesPageModule {}
