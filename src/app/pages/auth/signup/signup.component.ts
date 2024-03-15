import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    NgOptimizedImage,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    ButtonModule,
    RippleModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

}
