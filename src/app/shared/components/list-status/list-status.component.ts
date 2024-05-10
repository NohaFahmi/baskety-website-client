import {Component, Input} from '@angular/core';
import {ShoppingListStatus} from "../../interfaces/list.interface";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-list-status',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './list-status.component.html',
  styleUrl: './list-status.component.scss'
})
export class ListStatusComponent {

  @Input() status?: ShoppingListStatus;

    protected readonly ShoppingListStatus = ShoppingListStatus;
}
