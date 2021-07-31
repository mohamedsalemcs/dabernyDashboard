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
}
