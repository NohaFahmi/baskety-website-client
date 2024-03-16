import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TooltipModule} from "primeng/tooltip";
import {BadgeModule} from "primeng/badge";

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

}
