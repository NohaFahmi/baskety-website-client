import {Component, Input, signal} from '@angular/core';
import {NgClass, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";

export enum ITEM_CARD_MODES {
  ADD = 'add',
  EDIT = 'edit',
  VIEW = 'view'
}
@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgSwitch,
    NgSwitchCase,
    CheckboxModule,
    FormsModule
  ],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss'
})
export class ItemCardComponent {
  @Input() mode?: ITEM_CARD_MODES = ITEM_CARD_MODES.ADD;
  @Input() item?: {
    itemName: string;
    itemCount: number;
    itemPrice: number;
    itemCompleted: boolean;
  };
  protected readonly ITEM_CARD_MODES = ITEM_CARD_MODES;
  isCountExtended = false;
  checked: any;
  onEditItemCount(): void {
    this.isCountExtended = !this.isCountExtended;
  }
}
