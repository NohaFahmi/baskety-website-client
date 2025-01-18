import {Component, inject, OnInit, signal} from '@angular/core';
import {DialogService, DynamicDialogComponent, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ItemService} from "../../../../core/services/item/item.service";
import {ButtonModule} from "primeng/button";
import {IItem} from "../../../interfaces/item.interface";
import {DropdownModule} from "primeng/dropdown";
import {toSignal} from "@angular/core/rxjs-interop";
import {from} from "rxjs";
import {CategoryService} from "../../../../core/services/category/category.service";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-edit-item-form',
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  templateUrl: './edit-item-form.component.html',
  styleUrl: './edit-item-form.component.scss'
})
export class EditItemFormComponent implements OnInit{
  protected readonly Object = Object;
  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private dialogService: DialogService = inject(DialogService);
  private readonly instance: DynamicDialogComponent;
  private itemService  = inject(ItemService)
  private categoryService  = inject(CategoryService);
  private formBuilder = inject(FormBuilder);
  itemId = signal<number | null>(null);
  title = signal<string>("");
  categoriesList = toSignal(from(this.categoryService.gatAllCategories()));
  editItemForm = this.formBuilder.group({
   name: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required]),
    imgUrl: new FormControl("", [Validators.required]),
    qtyUnit: new FormControl("", [Validators.required]),
    categoryId: new FormControl(null, [Validators.required]),
  });
  constructor() {
    this.instance = this.dialogService.getInstance(this.ref);
  }

  ngOnInit(): void {
    if (this.instance && this.instance?.data) {
      this.itemId.set(this.instance?.data.itemId);
      this.title.set(this.instance?.data.title);
      this.getItemInfo();
    }
  }

  getItemInfo() {
    const itemId = this.itemId();
    if (itemId) {
      this.itemService.getItemById(itemId).then((item) => {
        this.editItemForm.patchValue({
          name: item.name ?? "",
          price: item.price as any,
          imgUrl: item.imgUrl ?? "",
          qtyUnit: item.qtyUnit ?? "",
          categoryId: item.categoryId as any
        })
      });
    }
  }

  onCancel() {
    this.editItemForm.reset();
    this.closeDialog();
  }

  onSubmit() {
    this.editItemForm.markAllAsTouched();
    const itemId = this.itemId();
    if (this.editItemForm.valid && itemId) {
      this.itemService.updateItem(itemId, this.editItemForm.value  as IItem).then((item) => {
        this.closeDialog(true);
      })
    }
  }

  private closeDialog(isSuccess?: boolean) {
    this.ref.close(isSuccess);
  }
}
