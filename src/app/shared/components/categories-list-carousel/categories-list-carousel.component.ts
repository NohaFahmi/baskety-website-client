import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {ICategory} from "../../interfaces/category.interface";
import {TagModule} from "primeng/tag";

@Component({
  selector: 'app-categories-list-carousel',
  standalone: true,
  imports: [
    CarouselModule,
    TagModule
  ],
  templateUrl: './categories-list-carousel.component.html',
  styleUrl: './categories-list-carousel.component.scss'
})
export class CategoriesListCarouselComponent {
  @Input() categories?: ICategory[];
  @Input() title?: string;
  @Output() categoryClicked: EventEmitter<ICategory> = new EventEmitter();

  onCategoryClicked(category: ICategory) {
    this.categoryClicked.emit(category);
  }
}
