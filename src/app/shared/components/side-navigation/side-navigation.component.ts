import {Component, inject, Input} from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {NgOptimizedImage} from "@angular/common";
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {toSignal} from "@angular/core/rxjs-interop";
import {AuthService} from "../../../core/services/auth/auth.service";
import {from} from "rxjs";
import {IUser} from "../../interfaces/user.interface";

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [
    SidebarModule,
    NgOptimizedImage,
    AvatarModule,
    ButtonModule
  ],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss'
})
export class SideNavigationComponent {
  private authService = inject(AuthService);
  userInfo = toSignal<IUser | null>(from(this.authService.userInfo$));

  onLogout() {
    this.authService.logoutUser();
  }
}
