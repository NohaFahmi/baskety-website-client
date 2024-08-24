import {Component, computed, effect, inject, OnInit, signal} from '@angular/core';
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {ITEM_CARD_MODES, ItemCardComponent} from "../../shared/components/item-card/item-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {ItemsListSectionComponent} from "../../shared/components/items-list-section/items-list-section.component";
import {ItemService} from "../../core/services/item/item.service";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {
  CategoriesListCarouselComponent
} from "../../shared/components/categories-list-carousel/categories-list-carousel.component";
import {CategoryService} from "../../core/services/category/category.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {from} from "rxjs";
import {ICategory} from "../../shared/interfaces/category.interface";
import {sign} from "chart.js/helpers";
import {IItem} from "../../shared/interfaces/item.interface";

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
export class HomeComponent implements OnInit{
  protected readonly ITEM_CARD_MODES = ITEM_CARD_MODES;
  itemService = inject(ItemService);
  categoryService = inject(CategoryService);
  categoriesList = toSignal<ICategory[]>(from(this.categoryService.gatAllCategories()));
  itemsListByCategory = signal<IItem[]>([]);

  ngOnInit():void {
    this.loadItemsByCategory(1);
  }
  loadItemsByCategory(categoryId: number):void {
    this.itemService.getAllItemsByCategoryId(categoryId).then((items) => {
      this.itemsListByCategory.set(items);
    }).catch(() => {
      this.itemsListByCategory.set([]);
    })
  }
  onCategoryChange(category: ICategory) {
    this.loadItemsByCategory(category.id);
  }
}
