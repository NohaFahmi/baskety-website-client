import {Component, inject, OnInit, signal} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {DialogService, DynamicDialogComponent, DynamicDialogRef} from "primeng/dynamicdialog";
import {CategoryService} from "../../../../core/services/category/category.service";
import {ICategory} from "../../../interfaces/category.interface";

@Component({
  selector: 'app-add-category-form',
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-category-form.component.html',
  styleUrl: './add-category-form.component.scss'
})
export class AddCategoryFormComponent implements OnInit{
  protected readonly Object = Object;
  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private dialogService: DialogService = inject(DialogService);
  private readonly instance: DynamicDialogComponent;
  private categoryService  = inject(CategoryService);
  private formBuilder = inject(FormBuilder);
  title = signal<string>("");
  category = signal<ICategory | null>(null);
  addNewCategory = this.formBuilder.group({
    name: new FormControl("", [Validators.required]),
    image: new FormControl("", [Validators.required]),
  });
  constructor() {
    this.instance = this.dialogService.getInstance(this.ref);
  }

  ngOnInit(): void {
    if (this.instance && this.instance?.data) {
      this.title.set(this.instance?.data.title);
      this.category.set(this.instance?.data.category);
      if(this.category()?.id) {
        this.addNewCategory.patchValue({
          name: this.category()?.name ?? "",
          image: this.category()?.image ?? "",
        })
      }
    }
  }
  onCancel() {
    this.addNewCategory.reset();
    this.closeDialog();
  }

  onSubmit() {
    this.addNewCategory.markAllAsTouched();
    if (this.addNewCategory.valid) {
      if(this.category()?.id) {
        this.categoryService.updateCategory(this.addNewCategory.value as ICategory).then(() => {
          this.closeDialog(true);
        })
      } else {
        this.categoryService.createCategory(this.addNewCategory.value as ICategory).then(() => {
          this.closeDialog(true);
        })
      }
    }
  }

  private closeDialog(isSuccess?: boolean) {
    this.ref.close(isSuccess);
  }
}
