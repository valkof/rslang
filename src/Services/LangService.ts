import { Observer } from "../Abstract/Observer";
import { Word } from "../Interfaces/Types";
import { getWords } from "./APIService";

export class LangService extends Observer {
  async getWordsOfBD(page = 0, group = 0): Promise<Word[]> {
    return getWords(page, group);
  }
}