import { Observer } from "../Abstract/Observer";
import { HOST } from "../config";
import { TLearnWords, TWord } from "../Interfaces/Types";
import APIService from "./APIService";

export class AudioGameService extends Observer {
  
  roundGame = 0;

  countError = 0;

  wordsGame = [] as TWord[][];

  learnWords = [] as TLearnWords[];
  
  private async getWordsByBook(group: number): Promise<TWord[][] | null> {
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

  private shuffleArray<Type>(array: Array<Type>): Array<Type> {
    return array.slice().sort(() => {
      const result = Math.random();
      if (result > 0.5) return 1; 
      if (result < 0.5) return -1;
      return 0; 
    })
  }

  private resetSettingGame(words: TWord[][]): void {
    this.roundGame = 0;
    this.countError = 0;
    this.dispatch('status', this.countError);
    this.learnWords = [];
    this.wordsGame = words;
  }

  selectGame(): void {
    this.dispatch('audioCallGame', 'select');
  }

  startGame(group: number): void {
    this.getWordsByBook(group)
      .then(words => {
        if (words) {
          this.resetSettingGame(words);
          this.stageGame();
          this.dispatch('audioCallGame', 'start');
        }
      })
  }

  stageGame(): void {
    this.dispatch('audio', `${HOST}/${this.wordsGame[this.roundGame][0].audio}`);
    const shuffleVersion = this.shuffleArray(this.wordsGame[this.roundGame]);
    const shuffleWords = shuffleVersion.map(word => word.wordTranslate);
    this.dispatch('vesrsion', shuffleWords);
  }

  vereficationStageGame(word: string): void {
    const trueWord = this.wordsGame[this.roundGame][0].wordTranslate;
    if (word !== trueWord) {
      this.countError += 1;
      this.dispatch('status', this.countError);
    }
    this.learnWords.push({
      learn: word === trueWord,
      word: this.wordsGame[this.roundGame][0]
    })
    if (this.countError === 5 || this.roundGame === 19) {
      return this.resultGame();
    }
    this.roundGame += 1;
    this.stageGame();
  }

  resultGame(): void {
    this.dispatch('score', this.getResultGame());
    this.dispatch('audioCallGame', 'result');
  }

  getResultGame(): TLearnWords[] | null {
    return this.learnWords.length ? this.learnWords : null;
  }
}
