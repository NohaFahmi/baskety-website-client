import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {ItemsListSectionComponent} from "../items-list-section/items-list-section.component";
import {InputGroupModule} from "primeng/inputgroup";
import {InputTextModule} from "primeng/inputtext";
import {ITEM_CARD_MODES} from "../item-card/item-card.component";

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ButtonModule,
    ItemsListSectionComponent,
    InputGroupModule,
    InputTextModule
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})
export class ShoppingListComponent {

  protected readonly ITEM_CARD_MODES = ITEM_CARD_MODES;
}
