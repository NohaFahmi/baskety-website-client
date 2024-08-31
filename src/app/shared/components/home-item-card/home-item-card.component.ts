import {Component, Input} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {NgOptimizedImage} from "@angular/common";
import {IItem} from "../../interfaces/item.interface";

@Component({
  selector: 'app-home-item-card',
  standalone: true,
  imports: [
    ButtonModule,
    NgOptimizedImage
  ],
  templateUrl: './home-item-card.component.html',
  styleUrl: './home-item-card.component.scss'
})
export class HomeItemCardComponent {
  @Input() item: IItem;
  addItemToList(item: IItem) {
    // TODO: update this logic
  }
}
