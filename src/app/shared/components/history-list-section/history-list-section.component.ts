import {Component, Input} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {IList, ShoppingListStatus} from "../../interfaces/list.interface";
import {DatePipe, KeyValuePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ListStatusComponent} from "../list-status/list-status.component";

@Component({
  selector: 'app-history-list-section',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    NgIf,
    KeyValuePipe,
    NgForOf,
    DatePipe,
    NgClass,
    RouterLink,
    ListStatusComponent
  ],
  templateUrl: './history-list-section.component.html',
  styleUrl: './history-list-section.component.scss'
})
export class HistoryListSectionComponent {
  @Input() listGroupItem: {[key: string]: IList[]} | null = null;
  protected readonly ShoppingListStatus = ShoppingListStatus;
}
