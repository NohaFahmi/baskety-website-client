import {Component, computed, inject, signal} from '@angular/core';
import {ItemService} from "../../../core/services/item/item.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {firstValueFrom, from} from "rxjs";
import {TableModule} from "primeng/table";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {IItem} from "../../interfaces/item.interface";
import {DialogsService, DynamicDialogService} from "../../services/dialogs/dialogs.service";
import {EditItemFormComponent} from "../forms/edit-item-form/edit-item-form.component";



@Component({
  selector: 'app-items-list-table',
  standalone: true,
  imports: [
    TableModule,
    DatePipe,
    NgOptimizedImage,
    ButtonModule
  ],
  templateUrl: './items-list-table.component.html',
  styleUrl: './items-list-table.component.scss'
})
export class ItemsListTableComponent {
  private itemsService = inject(ItemService);
  private dialogsService = inject(DialogsService);
  $itemsList = toSignal(from(this.itemsService.getAllItems()));
  itemsList = computed(() => signal(this.$itemsList()));
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

  onEditItem(item: IItem) {
    const editItemDialog = this.dialogsService.openFormDialog("Edit item", EditItemFormComponent, {itemId: item.id});
    firstValueFrom(editItemDialog.onClose).then((isSuccess) => {
      if (isSuccess) {
        this.itemsService.getAllItems().then((items) => {
          this.itemsList().set(items);
        })
      }
    })
  }

  onDeleteItem(item: IItem) {
    if(item.id) {
      this.itemsService.deleteItem(item.id).then((isSuccess) => {
        console.log(isSuccess);
      })
    }
  }
}
