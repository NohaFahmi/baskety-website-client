import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {SideNavigationComponent} from "../../shared/components/side-navigation/side-navigation.component";
import {UserService} from "../../core/services/user/user.service";
import {AuthService} from "../../core/services/auth/auth.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {from} from "rxjs";
import {ShoppingListComponent} from "../../shared/components/shopping-list/shopping-list.component";
import {ListService} from "../../core/services/list/list.service";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass,
    NgIf,
    ButtonModule,
    SideNavigationComponent,
    ShoppingListComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  private shoppingListService = inject(ListService);
  currentOpenShoppingList = toSignal(from(this.shoppingListService.currentOpenShoppingList));
  openSideNavigation = signal<boolean>(false);

  toggleSideNavigation() {
    this.openSideNavigation.set(!this.openSideNavigation());
  }
}
