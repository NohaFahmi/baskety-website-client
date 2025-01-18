import {Component, inject, signal} from '@angular/core';
import {TabMenuModule} from "primeng/tabmenu";
import {MenuItem} from "primeng/api";
import {ItemsListTableComponent} from "../../../shared/components/items-list-table/items-list-table.component";
import {
  CategoriesListTableComponent
} from "../../../shared/components/categories-list-table/categories-list-table.component";
import {ButtonModule} from "primeng/button";
import {Router} from "@angular/router";
import {DialogsService, DynamicDialogService} from "../../../shared/services/dialogs/dialogs.service";
import {AddCategoryFormComponent} from "../../../shared/components/forms/add-category-form/add-category-form.component";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-system-items-categories-list',
  standalone: true,
  imports: [
    TabMenuModule,
    ItemsListTableComponent,
    CategoriesListTableComponent,
    ButtonModule
  ],
  providers: [DialogsService, DynamicDialogService],
  templateUrl: './system-items-categories-list.component.html',
  styleUrl: './system-items-categories-list.component.scss'
})
export class SystemItemsCategoriesListComponent {
  private router = inject(Router);
  items = signal<MenuItem[]>([
    {
      label: 'Items', command: () => {
        this.activeTabIndex.set(0);
      }
    },
    {label: 'Categories',  command: () => {
        this.activeTabIndex.set(1);
      }},
  ])
  activeTabIndex = signal<number>(0);

  navigateToAddItems() {
    this.router.navigate(['app/admin/items/new'])
  }
}
