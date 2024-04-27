import {Component, Input, signal} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {IItem} from "../../interfaces/item.interface";
import {SideViewsService} from "../../services/side-views/side-views.service";

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [
    ButtonModule,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss'
})
export class ItemDetailsComponent {


  constructor(public sideViewsService: SideViewsService) {
  }
  addItemToList(): void {
  }
}
