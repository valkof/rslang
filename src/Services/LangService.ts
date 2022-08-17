import { Observer } from "../Abstract/Observer";
import { TWord } from "../Interfaces/Types";
import  APIService  from "./APIService";


const host = 'https://app-rsslang.herokuapp.com'; // http://localhost:8075/';
export class LangService extends Observer {
  async getWordsOfBD(page = 0, group = 0): Promise<TWord[]> {
    return APIService.getWords(page, group)
  }
}
