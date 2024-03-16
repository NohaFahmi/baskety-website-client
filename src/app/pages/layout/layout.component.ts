import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SideNavigationComponent} from "../../shared/components/side-navigation/side-navigation.component";
import {SideViewContainerComponent} from "../../shared/components/side-view-container/side-view-container.component";
import {NgClass} from "@angular/common";

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
export class LayoutComponent {
  isOpen = true;
}
