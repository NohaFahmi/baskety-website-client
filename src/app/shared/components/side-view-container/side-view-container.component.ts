import { Component } from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-side-view-container',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule
  ],
  templateUrl: './side-view-container.component.html',
  styleUrl: './side-view-container.component.scss'
})
export class SideViewContainerComponent {
  sidebarVisible = true;
}
