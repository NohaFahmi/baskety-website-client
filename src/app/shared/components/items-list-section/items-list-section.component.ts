import {Component, Input} from '@angular/core';
import {ITEM_CARD_MODES, ItemCardComponent} from "../item-card/item-card.component";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-items-list-section',
  standalone: true,
  imports: [
    ItemCardComponent,
    NgForOf,
    NgClass
  ],
  templateUrl: './items-list-section.component.html',
  styleUrl: './items-list-section.component.scss'
})
export class ItemsListSectionComponent {
  @Input() itemBtnMode?: ITEM_CARD_MODES;
  @Input() items?: any[];
  protected readonly ITEM_CARD_MODES = ITEM_CARD_MODES;
  protected readonly Object = Object;
}
