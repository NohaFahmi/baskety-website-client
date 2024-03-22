import {Component, Input} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FileUploadModule} from "primeng/fileupload";
import {DropdownModule} from "primeng/dropdown";

@Component({
  selector: 'app-add-edit-item-form',
  standalone: true,
  imports: [
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
    DropdownModule
  ],
  templateUrl: './add-edit-item-form.component.html',
  styleUrl: './add-edit-item-form.component.scss'
})
export class AddEditItemFormComponent {
  @Input() isEdit = false;
}
