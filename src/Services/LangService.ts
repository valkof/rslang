import { Observer } from "../Abstract/Observer";
import { IResponse } from "../Interfaces/Interfaces";
import { TAuthResponse, TWord } from "../Interfaces/Types";
import  APIService  from "./APIService";


export class LangService extends Observer {
  async getWordsOfBD(page = 0, group = 0): Promise<IResponse<TWord[]> | null> {
    return APIService.getWords(page, group);
  }

  async userAuthorization(email: string, password: string, registration = false): Promise<void> {
    this.dispatch('authorization', 'start');
    if (registration) {
      const user = await APIService.createUser({ email, password, name: 'игрок'});
      if (!user || user.status === 422) {
        this.dispatch('authorization', 'error');
        return;
      };
    }
    const userAuthor = await APIService.loginUser({ email, password });
    if (userAuthor && userAuthor.status === 200) {
      localStorage.setItem('rslang', JSON.stringify(userAuthor.data));
    } else {
      this.dispatch('authorization', 'error');
      return;
    }  
    this.dispatch('authorization', 'finish');
    document.location = '';
  }

  async isUserToken(): Promise<boolean> {
    const userLocalStorage = localStorage.getItem('rslang');
    if (userLocalStorage) {
      const user = JSON.parse(userLocalStorage) as TAuthResponse;
      if (user.refreshToken && user.userId) {
        const userAuthor = await APIService.getNewToken(user.userId, user.refreshToken);
        if (userAuthor && userAuthor.status === 200) {
          Object.assign(user, userAuthor.data);
          localStorage.setItem('rslang', JSON.stringify(user));
          return true;
        }
      }
      localStorage.removeItem('rslang');
    } 
    return false;
  }
}
