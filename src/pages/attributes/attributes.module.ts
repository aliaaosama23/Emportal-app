import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttributesPage } from './attributes';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AttributesPage,
  ],
  imports: [
    IonicPageModule.forChild(AttributesPage),
    TranslateModule.forChild()
  ],
})
export class AttributesPageModule {}
