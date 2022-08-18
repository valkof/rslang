import { Observer } from "../Abstract/Observer";
import { IResponse } from "../Interfaces/Interfaces";
import { TWord } from "../Interfaces/Types";
import  APIService  from "./APIService";


export class LangService extends Observer {
  async getWordsOfBD(page = 0, group = 0): Promise<IResponse<TWord[]> | null> {
    return APIService.getWords(page, group);
  }
}
