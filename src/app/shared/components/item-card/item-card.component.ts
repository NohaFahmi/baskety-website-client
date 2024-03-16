import { Component } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss'
})
export class ItemCardComponent {

}
