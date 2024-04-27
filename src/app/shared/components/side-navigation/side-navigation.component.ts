import {Component, EventEmitter, Output, signal} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TooltipModule} from "primeng/tooltip";
import {BadgeModule} from "primeng/badge";
import {AuthService} from "../../../core/services/auth/auth.service";

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ButtonModule,
    RouterLink,
    RouterLinkActive,
    TooltipModule,
    BadgeModule
  ],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss'
})
export class SideNavigationComponent {
  @Output() toggleSideView: EventEmitter<boolean> = new EventEmitter<boolean>();
  isSideViewOpened = true;

  constructor(private authService: AuthService) {
  }

  onLogout(): void {
    this.authService.logoutUser();
  }

  openSideView(isSideViewOpened: boolean): void {
    this.isSideViewOpened = isSideViewOpened;
    this.toggleSideView.emit(this.isSideViewOpened)
  }
}
