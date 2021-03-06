import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import * as toastr from 'toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private translate: TranslateService
  ) { }

  successMsg(msg: string) {
    toastr.success(this.translate.instant(msg));
  }

  errorMsg(msg: string) {
    toastr.error(this.translate.instant(msg));
  }
  error(error) {
    if (error && error.error) {
      if (error.error.message) {
        this.errorMsg(error.error.message);
      } else if (error.error.messages && error.error.messages.length > 0) {
        this.errorMsg(error.error.messages.join(' \n ') || 'errors.errorOccured');
      }
    } else {
      this.errorMsg('errors.errorOccured');
    }
  }
  public confirmMessage(title: string, onConfirm: Function, confirmButtonText?: string, cancelButtonText?: string) {
    Swal.fire({
      title: this.translate.instant(title),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmButtonText ? this.translate.instant(confirmButtonText) : this.translate.instant('buttons.ok'),
      cancelButtonText: cancelButtonText ? this.translate.instant(cancelButtonText) : this.translate.instant('buttons.cancel')
    }).then(result => {
      if (result.value) {
        onConfirm();
      }
    });
  }
}
