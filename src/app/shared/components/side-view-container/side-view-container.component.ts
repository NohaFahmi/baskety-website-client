import { Component } from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {ShoppingListComponent} from "../shopping-list/shopping-list.component";
import {AddEditItemFormComponent} from "../add-edit-item-form/add-edit-item-form.component";
import {ItemDetailsComponent} from "../item-details/item-details.component";

@Component({
  selector: 'app-side-view-container',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    ShoppingListComponent,
    AddEditItemFormComponent,
    ItemDetailsComponent
  ],
  templateUrl: './side-view-container.component.html',
  styleUrl: './side-view-container.component.scss'
})
export class SideViewContainerComponent {
  sidebarVisible = true;
}
