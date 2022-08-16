import { Observer } from "../Abstract/Observer";
import { TWord } from "../Interfaces/Types";
import { getWords } from "./APIService";

export class LangService extends Observer {
  async getWordsOfBD(page = 0, group = 0): Promise<TWord[]> {
    return getWords(page, group);
  }
}