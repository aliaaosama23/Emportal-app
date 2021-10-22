import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilesPage } from './files';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    FilesPage,
  ],
  imports: [
    IonicPageModule.forChild(FilesPage),
    TranslateModule.forChild()
  ],
})
export class FilesPageModule {}
