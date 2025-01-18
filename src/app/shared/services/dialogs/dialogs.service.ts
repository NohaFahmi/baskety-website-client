import {inject, Injectable, Type} from '@angular/core';
import {DialogService, DynamicDialogModule, DynamicDialogRef} from "primeng/dynamicdialog";
import {DefaultDialogComponent} from "../../components/default-dialog/default-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogsService {
  private dialogService = inject(DialogService);

  openFormDialog<T>(
    title: string,
    content: Type<T>,
    dialogInfo?: object,
  ) {
    return this.dialogService.open(content, {
      modal: true,
      showHeader: true,
      resizable: false,
      keepInViewport: false,
      focusOnShow: false,
      closable: false,
      dismissableMask: false,
      closeOnEscape: false,
      width: "45vw",
      breakpoints: {
        "991px": "65vw",
        "600px": "80vw",
      },
      data: { title, ...dialogInfo },
      contentStyle: {
        padding: "30px 30px",
        marginTop: "-1px",
      },
      styleClass: "form-dialog",
    });
  }

}
export const DynamicDialog = DynamicDialogModule;
export const DynamicDialogService = DialogService;
