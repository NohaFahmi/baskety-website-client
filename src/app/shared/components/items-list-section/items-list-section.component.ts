import {Component, Input} from '@angular/core';
import {ITEM_CARD_MODES, ItemCardComponent} from "../item-card/item-card.component";
import {NgClass, NgForOf, NgOptimizedImage} from "@angular/common";
import {IItem, IItemList} from "../../interfaces/item.interface";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-items-list-section',
  standalone: true,
  imports: [
    ItemCardComponent,
    NgForOf,
    NgClass,
    NgOptimizedImage,
    ButtonModule
  ],
  templateUrl: './items-list-section.component.html',
  styleUrl: './items-list-section.component.scss'
})
export class ItemsListSectionComponent {
  @Input() itemBtnMode?: ITEM_CARD_MODES;
  @Input() items?: IItem[];
  @Input() inHome: boolean = true;
  protected readonly ITEM_CARD_MODES = ITEM_CARD_MODES;
}
