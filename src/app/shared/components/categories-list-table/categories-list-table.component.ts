import {Component, effect, inject, Input, signal} from '@angular/core';
import {TableModule} from "primeng/table";
import {toSignal} from "@angular/core/rxjs-interop";
import {CategoryService} from "../../../core/services/category/category.service";
import {from} from "rxjs";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-categories-list-table',
  standalone: true,
  imports: [
    TableModule,
    DatePipe
  ],
  templateUrl: './categories-list-table.component.html',
  styleUrl: './categories-list-table.component.scss'
})
export class CategoriesListTableComponent {
  private categoryService = inject(CategoryService)
  categoriesList = toSignal(from(this.categoryService.gatAllCategories()));
  columns  = signal([
    { name: "Category Name", value: "name" },

    {
      name: "Created Time",
      value: "createdAt",
    },
  ]);
}
