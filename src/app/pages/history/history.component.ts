import {Component, inject} from '@angular/core';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";
import {ListService} from "../../core/services/list/list.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {from} from "rxjs";
import {IList} from "../../shared/interfaces/list.interface";
import {
  HistoryListItemCardComponent
} from "../../shared/components/history-list-item-card/history-list-item-card.component";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    RouterLink,
    HistoryListItemCardComponent,
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  private listService = inject(ListService);
  userListsHistory = toSignal<IList[]>(from(this.listService.getUserListsHistory()));
}
