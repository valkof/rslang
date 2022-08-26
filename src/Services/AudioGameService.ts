import { Observer } from "../Abstract/Observer";
import { HOST } from "../config";
import { TGameAnswer, TWord } from "../Interfaces/Types";
import APIService from "./APIService";

export class AudioGameService extends Observer {

  private roundGame = 0;

  private score = 0;

  private countError = 0;

  private countTrueWords = 0;

  private multiBonus = 1;

  private wordsGame = [] as TWord[][];

  private learnWords = [] as TGameAnswer[];

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
    this.score = 0;
    this.countTrueWords = 0;
    this.multiBonus = 1;
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
    // console.log(this.wordsGame[this.roundGame][0].wordTranslate);
    const shuffleWords = shuffleVersion.map(word => word.wordTranslate);
    this.dispatch('vesrsion', shuffleWords);
  }

  vereficationStageGame(word: string): void {
    const trueWord = this.wordsGame[this.roundGame][0].wordTranslate;
    if (word === trueWord) {
      this.score += 10 * this.multiBonus;
      this.countTrueWords += 1;
      if (this.countTrueWords === 4) {
        this.multiBonus = Math.min(this.multiBonus + 1, 5);
        this.countTrueWords = 0;
      }
    } else {
      this.countError += 1;
      this.dispatch('status', this.countError);
      if (this.countTrueWords === 0) {
        this.multiBonus = Math.max(this.multiBonus - 1, 1);
      }
      this.countTrueWords = 0;
    }
    this.learnWords.push({
      correct: word === trueWord,
      word: this.wordsGame[this.roundGame][0]
    });

    this.dispatch('score', this.score);
    this.dispatch('bonus', this.countTrueWords);
    this.dispatch('birds', this.multiBonus);

    if (this.countError === 5 || this.roundGame === 19) {
      return this.resultGame();
    }

    this.roundGame += 1;
    this.stageGame();
  }

  resultGame(): void {
    this.dispatch('result', this.getResultGame());
    this.dispatch('audioCallGame', 'result');
  }

  getResultGame(): TGameAnswer[] | null {
    return this.learnWords.length ? this.learnWords : null;
  }
}
