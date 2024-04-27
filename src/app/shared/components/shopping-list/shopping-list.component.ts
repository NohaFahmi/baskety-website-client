import {Component, EventEmitter, Output} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {ItemsListSectionComponent} from "../items-list-section/items-list-section.component";
import {InputGroupModule} from "primeng/inputgroup";
import {InputTextModule} from "primeng/inputtext";
import {ITEM_CARD_MODES} from "../item-card/item-card.component";
import {SIDENAV_VIEWS} from "../../interfaces/common.interface";
import {SideViewsService} from "../../services/side-views/side-views.service";

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ButtonModule,
    ItemsListSectionComponent,
    InputGroupModule,
    InputTextModule,
    NgIf
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})
export class ShoppingListComponent {
  protected readonly ITEM_CARD_MODES = ITEM_CARD_MODES;
  itemsList = [
    // {
    //   "Fruits": [
    //     {
    //       "itemName": "Apples",
    //       "itemCount": "10",
    //       "itemPrice": "2.99",
    //       "itemCompleted": true
    //     },
    //     {
    //       "itemName": "Oranges",
    //       "itemCount": "8",
    //       "itemPrice": "1.99",
    //       "itemCompleted": false
    //     }
    //   ]
    // },
    // {
    //   "Vegetables": [
    //     {
    //       "itemName": "Carrots",
    //       "itemCount": "5",
    //       "itemPrice": "0.99",
    //       "itemCompleted": true
    //     },
    //     {
    //       "itemName": "Broccoli",
    //       "itemCount": "2",
    //       "itemPrice": "1.50",
    //       "itemCompleted": false
    //     }
    //   ]
    // }
  ]
  constructor(public sideViewsService: SideViewsService) {
  }
  navigateToAddingItemView() {
    this.sideViewsService.updateCurrentSideView(SIDENAV_VIEWS.ADD_EDIT_ITEM);
  }
}
