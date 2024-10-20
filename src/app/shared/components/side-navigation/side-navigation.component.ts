import {Component, computed, inject, Input} from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {NgOptimizedImage} from "@angular/common";
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {toSignal} from "@angular/core/rxjs-interop";
import {AuthService} from "../../../core/services/auth/auth.service";
import {from} from "rxjs";
import {IUser} from "../../interfaces/user.interface";
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [
    SidebarModule,
    NgOptimizedImage,
    AvatarModule,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss'
})
export class SideNavigationComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private routerEvent = toSignal(this.router.events);
  userInfo = toSignal<IUser | null>(from(this.authService.userInfo$));
  activeRoute = computed(() => {
    if (this.routerEvent() instanceof NavigationEnd) {
      return (this.routerEvent() as NavigationEnd).urlAfterRedirects;
    }
    return this.router.url;
  })
  onLogout() {
    this.authService.logoutUser();
  }
}
