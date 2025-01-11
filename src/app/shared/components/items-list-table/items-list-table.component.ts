import {Component, inject, signal} from '@angular/core';
import {ItemService} from "../../../core/services/item/item.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {from} from "rxjs";
import {TableModule} from "primeng/table";
import {DatePipe, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-items-list-table',
  standalone: true,
  imports: [
    TableModule,
    DatePipe,
    NgOptimizedImage
  ],
  templateUrl: './items-list-table.component.html',
  styleUrl: './items-list-table.component.scss'
})
export class ItemsListTableComponent {
  private itemsService = inject(ItemService);
  itemsList = toSignal(from(this.itemsService.getAllItems()));
  columns  = signal([
    { name: "Item Name", value: "name" },
    { name: "Item Image", value: "imgUrl" },
    {
      name: "Item Category", value: "categoryId"
    },
    {
      name: "Item Price", value: "price"
    },
    {
      name: "Item qty unit", value: "qtyUnit"
    },
    {
      name: "Created Time",
      value: "createdAt",
    },
  ]);
}
