import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {AppLoaderComponent} from "./shared/components/app-loader/app-loader.component";
import {LoadingService} from "./shared/services/loading/loading.service";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AppLoaderComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'basket-client';
  constructor(protected loadingService: LoadingService) {
  }
}
