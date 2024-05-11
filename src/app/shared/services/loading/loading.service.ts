import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = signal<boolean>(false);
  constructor() { }
  setLoading(value: boolean): void {
    this.isLoading.set(value);
    console.log('here', this.isLoading());
  }
  getLoading(): boolean {
    return this.isLoading();
  }
}
