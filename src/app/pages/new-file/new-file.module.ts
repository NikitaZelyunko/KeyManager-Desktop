import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewFileRoutingModule } from './new-file-routing.module';
import { NewFileComponent } from './new-file.component';
// eslint-disable-next-line max-len
import { RecordCreateFormComponent } from './components/record-create-form/record-create-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecordItemComponent } from './components/record-item/record-item.component';
import { RecordsBlockComponent } from './components/records-block/records-block.component';
// eslint-disable-next-line max-len
import { RecordItemDisplayComponent } from './components/record-item-display/record-item-display.component';

@NgModule({
  declarations: [
    NewFileComponent,
    RecordCreateFormComponent,
    RecordItemComponent,
    RecordsBlockComponent,
    RecordItemDisplayComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, NewFileRoutingModule],
})
export class NewFileModule {}
