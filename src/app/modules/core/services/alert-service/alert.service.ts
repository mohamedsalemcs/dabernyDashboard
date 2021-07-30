import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private translate: TranslateService
  ) { }

  errorMessage(message: string, title?: string, onClose?: () => void) {

  }
}
