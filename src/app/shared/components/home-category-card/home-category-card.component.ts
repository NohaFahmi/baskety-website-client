import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ICategory} from "../../interfaces/category.interface";

@Component({
  selector: 'app-home-category-card',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './home-category-card.component.html',
  styleUrl: './home-category-card.component.scss'
})
export class HomeCategoryCardComponent {
  @Output() onCategorySelected = new EventEmitter<number>();
  @Input() category: ICategory;
  onSelectCategoryItem(id: number) {
    this.onCategorySelected.emit(id);
  }
}
