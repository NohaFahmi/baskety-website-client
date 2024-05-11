import { Component } from '@angular/core';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {LoadingService} from "../../services/loading/loading.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-app-loading',
  standalone: true,
  imports: [
    ProgressSpinnerModule,
    NgIf
  ],
  templateUrl: './app-loader.component.html',
  styleUrl: './app-loader.component.scss'
})
export class AppLoaderComponent {
  constructor(protected loadingService: LoadingService) {
  }

}
