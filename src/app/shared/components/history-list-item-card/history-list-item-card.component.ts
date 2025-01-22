import {Component, inject, Input} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {Router, RouterLink} from "@angular/router";
import {IList, ShoppingListStatus} from "../../interfaces/list.interface";
import {TagModule} from "primeng/tag";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-history-list-item-card',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    RouterLink,
    TagModule,
    DatePipe
  ],
  templateUrl: './history-list-item-card.component.html',
  styleUrl: './history-list-item-card.component.scss'
})
export class HistoryListItemCardComponent {
  @Input() list?: IList;
  protected readonly ShoppingListStatus = ShoppingListStatus;
  private router = inject(Router);

  onNavigationToListDetails(id: number) {
    this.router.navigate([`app/lists/${id}`]);
  }
}
