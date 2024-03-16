import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {InputTextModule} from "primeng/inputtext";
import {NgOptimizedImage} from "@angular/common";
import {RippleModule} from "primeng/ripple";
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    NgOptimizedImage,
    RippleModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
