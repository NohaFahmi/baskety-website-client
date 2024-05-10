import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {ITEM_CARD_MODES} from "../../../shared/components/item-card/item-card.component";
import {ItemsListSectionComponent} from "../../../shared/components/items-list-section/items-list-section.component";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {IList} from "../../../shared/interfaces/list.interface";
import {ListService} from "../../../core/services/list/list.service";
import {Subscription} from "rxjs";
import {DatePipe, NgIf} from "@angular/common";
import {IItem, IItemList} from "../../../shared/interfaces/item.interface";
import {CategoryService} from "../../../core/services/category/category.service";
import {group} from "@angular/animations";
import {ListStatusComponent} from "../../../shared/components/list-status/list-status.component";

@Component({
  selector: 'app-history-list-details',
  standalone: true,
  imports: [
    ButtonModule,
    ItemsListSectionComponent,
    RouterLink,
    NgIf,
    DatePipe,
    ListStatusComponent
  ],
  templateUrl: './history-list-details.component.html',
  styleUrl: './history-list-details.component.scss'
})
export class HistoryListDetailsComponent {

  protected readonly ITEM_CARD_MODES = ITEM_CARD_MODES;
  listDetails?: IList;
  subscriptions: Subscription[] = [];
  constructor(private listService: ListService,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    const listIdSub = this.activatedRoute.paramMap.subscribe((params) => {
      const listId = params.get('id') ?? '';
      console.log(listId);
      Promise.all([this.categoryService.gatAllCategories(), this.listService.getListDetailsById(listId)]).then((data) => {
        this.listDetails = data[1];
        const listItems = this.groupListItemsByCategoryId(this.listDetails.items || []);
        console.log('items', listItems);
        this.listDetails = {
          ...data[1],
          items: listItems
        }
      })
    });
    this.subscriptions.push(listIdSub);
  }

  getCategoryNameById(id: string): string {
    if (this.categoryService.categoriesList()) {
      const category = this.categoryService.categoriesList().find((category) => category._id === id);
      return category?.name || '';
    }
    return '';
  }
  groupListItemsByCategoryId(items: IItem[]): any {
    const grouped: {categoryName: string; items: IItem[]}[] = [];
    items.forEach((item) => {
      const categoryName = this.getCategoryNameById(item.categoryId ?? '');
      let existingGroup = grouped.find((g) => g.categoryName === categoryName);
      if (existingGroup) {
        existingGroup.items.push(item);
      } else {
        grouped.push({ categoryName, items: [item] });
      }
    });
    return grouped;
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
