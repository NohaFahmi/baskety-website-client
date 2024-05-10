import { Component } from '@angular/core';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";
import {ListService} from "../../core/services/list/list.service";
import {IList} from "../../shared/interfaces/list.interface";
import {DatePipe, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {HistoryListSectionComponent} from "../../shared/components/history-list-section/history-list-section.component";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    RouterLink,
    NgIf,
    NgForOf,
    KeyValuePipe,
    DatePipe,
    HistoryListSectionComponent
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {

  listsHistory: {[key: string]: IList[]} | null = null;
  constructor(private listService: ListService) {
  }

  ngOnInit(): void {
    this.listService.getUserListsHistory().then((lists) => {
      console.log('res', lists);
      console.log('grouped', this.groupByDate(lists));
      this.listsHistory = this.groupByDate(lists)
    }).catch((error) => console.log(error));
  }

  groupByDate = (inputList: IList[]) => {
    const groupedObject = inputList.reduce((acc: any, item: any) => {
      const date = new Date(item.createdAt);
      const month = date.getMonth() + 1;
      const yearMonth = `${month <= 9 ? ('0'+month) : month}/01/${date.getFullYear()}`;
      if (!acc[yearMonth]) {
        acc[yearMonth] = [];
      }
      acc[yearMonth].push(item);

      return acc;
    }, {});
    return groupedObject;
  }
}
