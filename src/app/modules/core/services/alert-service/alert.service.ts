import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import * as toastr from 'toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private translate: TranslateService
  ) { }

  errorMessage(message: string, title?: string, isSwal?: boolean, onClose?: () => void) {
    // if (isSwal) {
    //   Swal({
    //     icon: 'error',
    //     title: message
    //   });
    // } else {
    //   toastr.error(this.translate.instant(message));
    // }
    toastr.error(this.translate.instant(message));
  }
  showSuccessMsg(msg: string) {
    toastr.success(this.translate.instant(msg));
    //this.messageService.add({ severity: 'success', summary: '', detail: this.translate.instant(msg) });
  }

  showErrorMsg(msg: string) {
    toastr.error(this.translate.instant(msg));
    //this.messageService.add({ severity: 'error', summary: '', detail: this.translate.instant(msg) });
  }
}
