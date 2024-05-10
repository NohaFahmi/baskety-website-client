import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {ShoppingListComponent} from "../shopping-list/shopping-list.component";
import {AddEditItemFormComponent} from "../add-edit-item-form/add-edit-item-form.component";
import {ItemDetailsComponent} from "../item-details/item-details.component";
import {SIDENAV_VIEWS} from "../../interfaces/common.interface";
import {NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {SideViewsService} from "../../services/side-views/side-views.service";
import {ShoppingListService} from "../../services/shopping-list/shopping-list.service";

@Component({
  selector: 'app-side-view-container',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    ShoppingListComponent,
    AddEditItemFormComponent,
    ItemDetailsComponent,
    NgSwitch,
    NgSwitchCase,
    NgIf
  ],
  templateUrl: './side-view-container.component.html',
  styleUrl: './side-view-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideViewContainerComponent {
  protected readonly SIDENAV_VIEWS = SIDENAV_VIEWS;
  constructor(public sideViewsService: SideViewsService,
              protected shoppingListService: ShoppingListService) {
  }
  navigateToEditItemView(itemId: string): void {
    this.sideViewsService.navigateToEditItemView(itemId);
  }
}
