import { Component } from '@angular/core';
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {ITEM_CARD_MODES, ItemCardComponent} from "../../shared/components/item-card/item-card.component";
import {NgForOf} from "@angular/common";
import {ItemsListSectionComponent} from "../../shared/components/items-list-section/items-list-section.component";

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
    ItemsListSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

    protected readonly ITEM_CARD_MODES = ITEM_CARD_MODES;
}
