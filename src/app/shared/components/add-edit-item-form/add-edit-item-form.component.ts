import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FileUploadModule} from "primeng/fileupload";
import {DropdownModule} from "primeng/dropdown";
import {CategoryService} from "../../../core/services/category/category.service";
import {ICategory} from "../../interfaces/category.interface";
import {NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {getFormValidationErrors} from "../../helpers/helpers";
import {ItemService} from "../../../core/services/item/item.service";
import {SIDENAV_VIEWS} from "../../interfaces/common.interface";
import {SideViewsService} from "../../services/side-views/side-views.service";

@Component({
  selector: 'app-add-edit-item-form',
  standalone: true,
  imports: [
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
    DropdownModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './add-edit-item-form.component.html',
  styleUrl: './add-edit-item-form.component.scss',
})
export class AddEditItemFormComponent{
  @Output() onBackInView: EventEmitter<SIDENAV_VIEWS> = new EventEmitter<SIDENAV_VIEWS>();
  categoriesList: ICategory[] = [];
  itemForm: FormGroup;
  isLoading = false;
  protected readonly getFormValidationErrors = getFormValidationErrors;

  constructor(private categoriesService: CategoryService,
              private itemService: ItemService,
              private fb: FormBuilder, protected sideViewsService: SideViewsService) {
    this.itemForm = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      // imageURL: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
      quantity: new  FormControl(0, Validators.required),
      categoryId: new FormControl('', Validators.required),
      quantityUnit: new FormControl('', Validators.required)
    })
  }
  ngOnInit() {
      this.loadCategories();
      if (this.sideViewsService.isEditItemMode() && this.sideViewsService.itemDetails()) {
        this.itemForm.setValue({
          name: this.sideViewsService.itemDetails()?.name || '',
          description: this.sideViewsService.itemDetails()?.description || '',
          price: this.sideViewsService.itemDetails()?.price || '',
          quantity: this.sideViewsService.itemDetails()?.quantity || '',
          categoryId: this.sideViewsService.itemDetails()?.categoryId || '',
          quantityUnit: this.sideViewsService.itemDetails()?.quantityUnit || '',
        });
      }
  }

  loadCategories() {
    this.categoriesService.gatAllCategories().then((categories) => {
      this.categoriesList = categories;
    });
  }
  // uploadCategoryImg(event: any): void {
  //   console.log('here', event);
  //   const driveUrl = 'https://www.googleapis.com/drive/v3/files';
  //   let formData = new FormData();
  //   formData.append('metadata', new Blob([JSON.stringify({
  //     'name': event.name,
  //     'mimeType': event.type
  //   })], {type: 'application/json'}));
  //   formData.append('file', event);
  //
  //   let headers = new HttpHeaders({
  //     'Authorization': 'Bearer ' + '[Your OAuth token]',
  //     'Content-Type': ': multipart/related',
  //   });
  //   this.httpService.post(`${driveUrl}?uploadType=multipart`, formData, { headers });
  // }
  onItemCreation(): void {
    this.isLoading = true;
    this.itemService.createItem(this.itemForm.value).then((item) => {
      this.itemForm.reset();
    }).catch((error) => {
      console.log('erer', error);
    }).finally(() => {this.isLoading = false});
  }

  onCancel(): void {
    this.backInView();
  }
  backInView(): void {
    this.onBackInView.emit(SIDENAV_VIEWS.SHOPPING_LIST);
    this.itemForm.reset();
  }
}
