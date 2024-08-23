import {Component, computed, inject, signal} from '@angular/core';
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {ITEM_CARD_MODES, ItemCardComponent} from "../../shared/components/item-card/item-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {ItemsListSectionComponent} from "../../shared/components/items-list-section/items-list-section.component";
import {ItemService} from "../../core/services/item/item.service";
import {IItem, IItemList} from "../../shared/interfaces/item.interface";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {LoadingService} from "../../shared/services/loading/loading.service";
import {
  CategoriesListCarouselComponent
} from "../../shared/components/categories-list-carousel/categories-list-carousel.component";
import {CategoryService} from "../../core/services/category/category.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {from} from "rxjs";
import {ICategory} from "../../shared/interfaces/category.interface";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    InputGroupAddonModule,
    InputGroupModule,
    ItemCardComponent,
    NgForOf,
    ItemsListSectionComponent,
    ProgressSpinnerModule,
    NgIf,
    CategoriesListCarouselComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected readonly ITEM_CARD_MODES = ITEM_CARD_MODES;
  itemService = inject(ItemService);
  categoryService = inject(CategoryService);
  categoriesList = toSignal<ICategory[]>(from(this.categoryService.gatAllCategories()));
  itemsListByCategory = signal<IItem[]>([
    {
      "id": 4,
      "name": "Eggs",
      "price": 5,
      "imgUrl": "https://firebasestorage.googleapis.com/v0/b/inbound-trilogy-292508.appspot.com/o/images%2FBrown-Cap-Mushroom_Iconic.jpg?alt=media&token=9615ec8d-9c80-4b63-855c-409b304bb0a3",
      "description": "Large eggs",
      "qtyUnit": "dozen",
      "categoryId": 4,
      "createdAt": "2024-08-15 11:10:01",
      "updatedAt": "2024-08-17T21:23:17.000Z"
    }
  ]);
  ngOnInit(): void {
    this.loadItemsList()
  }

  loadItemsList(): void {
    // this.itemService.getAllItemsGroupedByCategories();
  }

  getCategoryItems(category: ICategory) {
    this.itemService.getAllItemsByCategoryId(category.id).then((res) => {
      this.itemsListByCategory.set(res);
    });
  }
}
