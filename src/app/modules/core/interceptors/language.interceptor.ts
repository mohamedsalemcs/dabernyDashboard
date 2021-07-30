import { Language } from './../enums/language';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {

  constructor(
  ) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Accept-Language': 'ar-sa'
    };
    const lang = localStorage.getItem(environment.langKey) as Language;
    if (lang === Language.Arabic) {
      return next.handle(req.clone({ setHeaders: headersConfig }));
    } else {
      return next.handle(req);
    }
  }
}
