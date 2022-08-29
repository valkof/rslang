import { Observer } from "../Abstract/Observer";
import { IResponse } from "../Interfaces/Interfaces";
import { TAuthResponse, TWord } from "../Interfaces/Types";
import  APIService  from "./APIService";


export class LangService extends Observer {

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
    if (!userAuthor || userAuthor.status != 200) {
      this.dispatch('authorization', 'error');
      return;
    }  
    this.dispatch('authorization', 'finish');
    document.location = '';
  }
}
