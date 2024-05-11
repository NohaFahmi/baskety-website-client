import { Component } from '@angular/core';
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
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected readonly ITEM_CARD_MODES = ITEM_CARD_MODES;

  constructor(protected itemService: ItemService) {

  }

  ngOnInit(): void {
    this.loadItemsList()
  }

  loadItemsList(): void {
    this.itemService.getAllItemsGroupedByCategories().then((items) => {
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
    })
  }

}
