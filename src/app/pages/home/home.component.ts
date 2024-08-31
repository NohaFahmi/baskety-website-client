import { Component } from '@angular/core';
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {NgForOf, NgIf} from "@angular/common";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    InputGroupAddonModule,
    InputGroupModule,
    NgForOf,
    ProgressSpinnerModule,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
