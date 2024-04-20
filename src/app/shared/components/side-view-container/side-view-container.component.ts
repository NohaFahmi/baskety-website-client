import { Component } from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {ShoppingListComponent} from "../shopping-list/shopping-list.component";
import {AddEditItemFormComponent} from "../add-edit-item-form/add-edit-item-form.component";
import {ItemDetailsComponent} from "../item-details/item-details.component";
import {SIDENAV_VIEWS} from "../../interfaces/common.interface";
import {NgSwitch, NgSwitchCase} from "@angular/common";

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
    NgSwitchCase
  ],
  templateUrl: './side-view-container.component.html',
  styleUrl: './side-view-container.component.scss'
})
export class SideViewContainerComponent {
  sidebarVisible = true;
  currentView: SIDENAV_VIEWS = SIDENAV_VIEWS.ADD_EDIT_ITEM;
  protected readonly SIDENAV_VIEWS = SIDENAV_VIEWS;
}
