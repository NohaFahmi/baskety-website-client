import {Component, inject} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {FileSelectEvent, FileUploadModule} from "primeng/fileupload";
import {Router} from "@angular/router";
import {CategoryService} from "../../../core/services/category/category.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {from} from "rxjs";
import {ItemService} from "../../../core/services/item/item.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-add-edit-items',
  standalone: true,
  imports: [
    DropdownModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    FileUploadModule
  ],
  templateUrl: './add-edit-items.component.html',
  styleUrl: './add-edit-items.component.scss'
})
export class AddEditItemsComponent {
  private router = inject(Router);
  private formBuilder = new FormBuilder();
  private categoryService  = inject(CategoryService);
  private itemService  = inject(ItemService);
  categoriesList = toSignal(from(this.categoryService.gatAllCategories()));
  itemsForm = this.formBuilder.group({
    categoryId: new FormControl("", [Validators.required]),
    items: this.formBuilder.array([this.createItemGroup()]),
  });

  private createItemGroup(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      qtyUnit: new FormControl("", [Validators.required]),
      imageFile: new FormControl("", [Validators.required]),
    });
  }

  get items(): FormArray {
    return this.itemsForm.get('items') as FormArray;
  }

  addNewItemRow(): void {
    this.items.push(this.createItemGroup());
  }

  async onFileSelected(event: FileSelectEvent, index: number) {
    const file = event.currentFiles[0];
    if (file) {
      const blobURL = await this.blobUrlToFile(URL.createObjectURL(file), file.name);
      this.items.at(index).get('imageFile')?.setValue(blobURL);
    }
  }
  async  blobUrlToFile(blobUrl: string, fileName: string): Promise<File> {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  }
  onSubmit(): void {
    console.log(this.itemsForm)
    if (this.itemsForm.valid) {
      const payload = {
        categoryId: this.itemsForm.value['categoryId'] as string,
        items: this.itemsForm.controls['items'].value

      }
      this.itemService.addManyItems(payload.categoryId, payload.items).then((res) => {
        console.log(res);
      })
    }
  }
  onCancelForm() {
    this.router.navigate(['/app/admin'])
  }

  onRemoveItemRow(i: number) {
    if(this.items.controls.length > 1) {
      this.items.removeAt(i);
    }
  }
}
