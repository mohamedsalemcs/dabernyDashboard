// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { Language } from "src/app/modules/core/enums/language";

export const environment = {
  production: false,

  dabernyServerUrl: "https://localhost:44358/",
  apiUrl: "https://localhost:44358/api",

  // dabernyServerUrl: "http://52.15.72.219:5050/",
  // apiUrl: "http://52.15.72.219:5050/api",

  // dabernyServerUrl: "http://192.168.1.5:2021/",
  // apiUrl: "http://192.168.1.5:2021/api",

  langKey: "lang",
  tokenKey: "token",
  loginProviderKey: "loginProvider",
  defaultLanguage: Language.Arabic,
  maxImageSize: 1000 * 1000 * 5,
};
export const loading = {
  showLoading: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
