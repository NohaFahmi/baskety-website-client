import {Component, inject, signal} from '@angular/core';
import {ListService} from "../../../core/services/list/list.service";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {EMPTY, from, switchMap, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {IList} from "../../../shared/interfaces/list.interface";

@Component({
  selector: 'app-history-list-details',
  standalone: true,
  imports: [],
  templateUrl: './history-list-details.component.html',
  styleUrl: './history-list-details.component.scss'
})
export class HistoryListDetailsComponent {
  private listService  = inject(ListService);
  private activatedRoute   = inject(ActivatedRoute);
  params = toSignal(this.activatedRoute.params);
  loading = signal(false);
  private listDetails = toSignal<IList>(
    toObservable(this.params).pipe(
      tap(() => this.loading.set(true)),
      switchMap((params) => {
        if(params) {
          return this.getListDetailsById(params['id']);
        }
        return EMPTY;
      }),
      tap(() => this.loading.set(false)),
    ),
  );

  private getListDetailsById(id: number) {
    return this.listService.getListDetailsById(id);
  }
}
