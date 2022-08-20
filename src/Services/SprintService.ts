import { TWord } from "../Interfaces/Types";
import { shuffle } from "../utils";
import APIService from "./APIService";

const pagesCount = 29;
type TDifficulty = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export default class SprintService {
  currentWords = [];

  correctAnswers =[];

  incorrectAnswers =[];

  rightChoise = true;

  async generateWords(difficulty: TDifficulty): Promise<TWord[]> {
    const pages = this.generateRandomNums();
    let array: TWord[] = [];
    for (let i = 0; i < pages.length; i++) {
      const words = await APIService.getWords(pages[i], difficulty);
      array = words ? [...array, ...words.data] : array;
    }
    shuffle(array);
    return array
  }

  generateRandomNums(): number[] {
    const arr: number[] = [];
    while (arr.length < 5) {
      const num = Math.floor(Math.random() * pagesCount)
      if (!arr.includes(num)) {
        arr.push(num)
      }
    }
    return arr;
  }

}