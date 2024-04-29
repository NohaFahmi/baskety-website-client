import {Component, OnInit, signal} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SideNavigationComponent} from "../../shared/components/side-navigation/side-navigation.component";
import {SideViewContainerComponent} from "../../shared/components/side-view-container/side-view-container.component";
import {NgClass} from "@angular/common";
import {AuthService} from "../../core/services/auth/auth.service";
import {UserService} from "../../core/services/user/user.service";
import {SideViewsService} from "../../shared/services/side-views/side-views.service";
import {ShoppingListService} from "../../shared/services/shopping-list/shopping-list.service";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SideNavigationComponent,
    SideViewContainerComponent,
    NgClass
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  isOpen = true;
  constructor(private shoppingListService: ShoppingListService, public sideViewsService: SideViewsService) {
  }
  ngOnInit() {
    this.shoppingListService.getCurrentShoppingList();
  }
}
