import { Language } from 'src/app/modules/core/enums/language';

export const environment = {
  production: true,

  apiUrl: 'http://52.15.72.219:5050/api',
  langKey: 'b4f31e1d-9643-4043-a98a-f0eab53d0751',
  tokenKey: '0617d017-1e4c-4796-815a-1bbf0c600e68',
  loginProviderKey: '52ac43de-e146-482c-828f-1f9406bf883e',
  defaultLanguage: Language.Arabic
};

export const loading = {
  showLoading: false,
};
