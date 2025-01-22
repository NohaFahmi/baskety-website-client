import {Component, computed, inject, signal} from '@angular/core';
import {TableModule} from "primeng/table";
import {toSignal} from "@angular/core/rxjs-interop";
import {CategoryService} from "../../../core/services/category/category.service";
import {firstValueFrom, from} from "rxjs";
import {DatePipe} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {AddCategoryFormComponent} from "../forms/add-category-form/add-category-form.component";
import {DialogsService} from "../../services/dialogs/dialogs.service";
import {ICategory} from "../../interfaces/category.interface";

@Component({
  selector: 'app-categories-list-table',
  standalone: true,
  imports: [
    TableModule,
    DatePipe,
    ButtonModule
  ],
  templateUrl: './categories-list-table.component.html',
  styleUrl: './categories-list-table.component.scss'
})
export class CategoriesListTableComponent {
  private categoryService = inject(CategoryService);
  private dialogsService = inject(DialogsService);
  private $categoriesList = toSignal(from(this.categoryService.gatAllCategories()));
  categoriesList = computed(() => signal(this.$categoriesList()));
  columns  = signal([
    { name: "Category Name", value: "name" },
    {
      name: "Category Image", value: "image"
    },
    {
      name: "Created Time",
      value: "createdAt",
    },
  ]);
  isLoading = signal(false);
  addNewCategory() {
    const addNewCategoryDialog = this.dialogsService.openFormDialog("Add Category", AddCategoryFormComponent);
    firstValueFrom(addNewCategoryDialog.onClose).then((isSuccess: boolean) => {
      if (isSuccess) {
        this.loadCategories()
      }
    })
  }
  onDeleteCategory(category: ICategory) {
    if(category.id) {
      this.categoryService.deleteCategory(category.id).then(() => {
        this.loadCategories();
      })
    }

  }
  private loadCategories() {
    this.isLoading.set(true);
    this.categoryService.categoriesList.next(null);
    this.categoryService.gatAllCategories().then((categories) => {
      this.categoriesList().set(categories);
    }).finally(() => {
      this.isLoading.set(false);
    })
  }

  onEditCategory(category: ICategory) {
    const editCategoryDialog = this.dialogsService.openFormDialog("Edit Category", AddCategoryFormComponent, {
      category
    });
    firstValueFrom(editCategoryDialog.onClose).then((isSuccess: boolean) => {
      if (isSuccess) {
        this.loadCategories();
      }
    })
  }
}
