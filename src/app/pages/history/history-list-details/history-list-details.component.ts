import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {ITEM_CARD_MODES} from "../../../shared/components/item-card/item-card.component";
import {ItemsListSectionComponent} from "../../../shared/components/items-list-section/items-list-section.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-history-list-details',
  standalone: true,
  imports: [
    ButtonModule,
    ItemsListSectionComponent,
    RouterLink
  ],
  templateUrl: './history-list-details.component.html',
  styleUrl: './history-list-details.component.scss'
})
export class HistoryListDetailsComponent {

  protected readonly ITEM_CARD_MODES = ITEM_CARD_MODES;
}
