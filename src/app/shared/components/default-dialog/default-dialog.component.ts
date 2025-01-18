import {Component, computed, inject, signal, WritableSignal} from '@angular/core';
import {DialogService, DynamicDialogComponent, DynamicDialogRef} from "primeng/dynamicdialog";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-default-dialog',
  standalone: true,
  imports: [
    ButtonModule
  ],
  templateUrl: './default-dialog.component.html',
  styleUrl: './default-dialog.component.scss'
})
export class DefaultDialogComponent {
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  public dialogService: DialogService = inject(DialogService);
  instance: DynamicDialogComponent;
  title: WritableSignal<string> = signal("");
  content: WritableSignal<string> = signal("");

  constructor() {
    this.instance = this.dialogService.getInstance(this.ref);
  }

  ngOnInit(): void {
    if (this.instance && this.instance?.data) {
      this.title.set(this.instance.data.title);
      this.content.set(this.instance.data.content);
      if (this.instance.data) {

      }
    }
  }

  onCloseDialog() {
    this.ref.close();
  }
}
