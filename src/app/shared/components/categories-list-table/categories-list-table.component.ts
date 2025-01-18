import {Component, computed, effect, inject, Input, signal} from '@angular/core';
import {TableModule} from "primeng/table";
import {toSignal} from "@angular/core/rxjs-interop";
import {CategoryService} from "../../../core/services/category/category.service";
import {firstValueFrom, from} from "rxjs";
import {DatePipe} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {AddCategoryFormComponent} from "../forms/add-category-form/add-category-form.component";
import {DialogsService} from "../../services/dialogs/dialogs.service";

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
      name: "Created Time",
      value: "createdAt",
    },
  ]);

  addNewCategory() {
    const addNewCategoryDialog = this.dialogsService.openFormDialog("Add Category", AddCategoryFormComponent);
    firstValueFrom(addNewCategoryDialog.onClose).then((isSuccess: boolean) => {
      if (isSuccess) {
        this.categoryService.gatAllCategories().then((categories) => {

        })
      }
    })
  }
}
