import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [
    ButtonModule,
    NgOptimizedImage
  ],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss'
})
export class ItemDetailsComponent {

}
