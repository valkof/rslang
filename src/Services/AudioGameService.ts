import { Observer } from "../Abstract/Observer";
import { TWord } from "../Interfaces/Types";
import APIService from "./APIService";

export class AudioGameService extends Observer {
  async getWordsByBook(group: number): Promise<TWord[][] | null> {
    const numberPage = Math.floor(Math.random() * 30);
    const wordsPage = await APIService.getWords(numberPage, group);
    const words = wordsPage && wordsPage.status === 200 ? wordsPage.data : null;
    if (!words) return null;
    const shuffleWords = this.shuffleArray<TWord>(words);
    shuffleWords.push(...shuffleWords.slice(0, 5));
    const setWords = [] as TWord[][]
    for (let i = 0; i < 20; i++) {
      setWords.push(shuffleWords.slice(i, i + 5))
    }
    return this.shuffleArray<TWord[]>(setWords);
  }

  shuffleArray<Type>(array: Array<Type>): Array<Type> {
    return array.sort(() => {
      const result = Math.random();
      if (result > 0.5) return 1; 
      if (result < 0.5) return -1;
      return 0; 
    })
  }

  selectGame(): void {
    this.dispatch('audioCallGame', 'select');
  }

  startGame(): void {
    this.dispatch('audioCallGame', 'start');
  }

  resultGame(): void {
    this.dispatch('audioCallGame', 'result');
  }
}
