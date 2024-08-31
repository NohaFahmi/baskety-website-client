import {Component, computed, effect, inject, signal, untracked} from '@angular/core';
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {CarouselModule} from "primeng/carousel";
import {CategoryService} from "../../core/services/category/category.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {from} from "rxjs";
import {ButtonModule} from "primeng/button";
import {ItemService} from "../../core/services/item/item.service";
import {IItem} from "../../shared/interfaces/item.interface";
import {HomeItemCardComponent} from "../../shared/components/home-item-card/home-item-card.component";
import {HomeCategoryCardComponent} from "../../shared/components/home-category-card/home-category-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    InputGroupAddonModule,
    InputGroupModule,
    NgForOf,
    ProgressSpinnerModule,
    NgIf,
    NgOptimizedImage,
    CarouselModule,
    ButtonModule,
    HomeItemCardComponent,
    HomeCategoryCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private categoriesService = inject(CategoryService);
  private itemsService = inject(ItemService);
  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ]
  selectedCategoryId = signal<number | null>(null);
  categoriesList = toSignal(from(this.categoriesService.gatAllCategories()));
  itemsList = computed(() => {
    return this.itemsList$();
  });
  itemsList$ = signal<IItem[]>([]);
  constructor() {
    effect(() => {
      const categories = this.categoriesList();
      untracked(() => {
        if (categories && categories.length > 0) {
          this.selectedCategoryId.set(categories[0]?.id);
          this.loadItemsListInCategory(this.selectedCategoryId() as number);
        }
      })
    });
  }
  loadItemsListInCategory(categoryId: number) {
    this.itemsService.getAllItemsByCategoryId(categoryId).then((list) => {
      this.itemsList$.set(list);
    }).catch(() => {}).finally(() => {})
  }

  onSelectCategoryItem(id: number) {
    this.selectedCategoryId.set(id);
    this.loadItemsListInCategory(this.selectedCategoryId() as number);
  }

  addItemToList(item: IItem) {
    // TODO: update this logic
  }
}
