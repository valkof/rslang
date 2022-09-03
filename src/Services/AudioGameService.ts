import { Observer } from "../Abstract/Observer";
import { HOST, SPRINT_DURATION } from "../config";
import { TAggregatedWord, TGameAnswer, TWord } from "../Interfaces/Types";
import APIService from "./APIService";

export class AudioGameService extends Observer {

  private roundGame = 0;

  private maxRoundGame = 0;

  private isStartGame = false;

  private score = 0;

  private countError = 0;

  private countTrueWords = 0;

  private multiBonus = 1;

  private isAddWords = false;

  private nunberGroup = 0;

  private numberPage = 0;

  private interval: NodeJS.Timer | null = null;

  private timer = SPRINT_DURATION;

  private wordsGame = [] as TWord[][] | TAggregatedWord[][];

  private learnWords = [] as TGameAnswer[];

  private async getWordsByBook(group: number, page: number, place: string): Promise<TWord[][] | null> {
    const randomPage = place === 'textbook' ? page : Math.floor(Math.random() * 30);
    this.numberPage = place === 'app' ? randomPage : page;
    const wordsPage = await APIService.getWords(randomPage, group);
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

  private async getAgrWordsByBook(group: number, page: number, place: string): Promise<TAggregatedWord[][] | null> {
    const randomPage = place === 'textbook' ? page :  Math.floor(Math.random() * 30);
    const response = await Promise.all([
      APIService.getAgrWords({
        filter: `{"$and":[{"group":${group}, "page":${randomPage}}]}`,
        wordsPerPage: '20'
      }),
      APIService.getAgrWords({
        filter: `{"$and":[{"group":${group}}]}`,
        wordsPerPage: '600'
      })
    ]);
    if (response && response[0] && response[1]) {
      const pageWords = response[0].data[0].paginatedResults;
      const groupWords = response[1].data[0].paginatedResults.filter(word => word.page < randomPage);

      const shuffleWords = this.shuffleArray<TAggregatedWord>(pageWords);
      const lengthShuffleWords = shuffleWords.length;
      shuffleWords.push(...shuffleWords.slice(0, 5));
      const setWords = [] as TAggregatedWord[][]
      for (let i = 0; i < lengthShuffleWords; i++) {
        setWords.push(shuffleWords.slice(i, i + 5))
      }

      if (groupWords.length > 0) {
        const shuffleGroupWords = this.shuffleArray<TAggregatedWord>(groupWords);
        const lengthShuffleGroupWords = shuffleGroupWords.length;
        shuffleGroupWords.push(...shuffleGroupWords.slice(0, 5));
        const setGroupWords = [] as TAggregatedWord[][]
        for (let i = 0; i < lengthShuffleGroupWords; i++) {
          setGroupWords.push(shuffleGroupWords.slice(i, i + 5))
        }
        return this.shuffleArray<TAggregatedWord[]>(setWords).concat(
          this.shuffleArray<TAggregatedWord[]>(setGroupWords)
        )
      }

      return this.shuffleArray<TAggregatedWord[]>(setWords);
    }
    return null;
  }

  private async getHardWordsByBook(): Promise<TAggregatedWord[][] | null> {
    const response = await APIService.getAgrWords({
      filter: `{"$and":[{"userWord.difficulty":"hard"}]}`,
      wordsPerPage: '200'
    });
    if (response && response.data[0].paginatedResults.length > 4) {
      const hardWords = response.data[0].paginatedResults;

      const shuffleWords = this.shuffleArray<TAggregatedWord>(hardWords);
      const lengthShuffleWords = shuffleWords.length;
      shuffleWords.push(...shuffleWords.slice(0, 5));
      const setWords = [] as TAggregatedWord[][]
      for (let i = 0; i < lengthShuffleWords; i++) {
        setWords.push(shuffleWords.slice(i, i + 5))
      }
      return this.shuffleArray<TAggregatedWord[]>(setWords);
    }

    return null;
  }

  private shuffleArray<Type>(array: Array<Type>): Array<Type> {
    return array.slice().sort(() => {
      const result = Math.random();
      if (result > 0.5) return 1;
      if (result < 0.5) return -1;
      return 0;
    })
  }

  private resetSettingGame(words: TWord[][] | TAggregatedWord[][]): void {
    this.roundGame = 0;
    this.countError = 0;
    this.score = 0;
    this.countTrueWords = 0;
    this.multiBonus = 1;
    this.dispatch('status', this.countError);
    this.learnWords = [];
    this.wordsGame = words;
    this.timer = SPRINT_DURATION;
    // console.log(words)
    this.stageGame();
    this.isStartGame = true;
    this.dispatch('time', '60');
    this.setInterval();
    this.maxRoundGame = words.length - 1;

    this.dispatch('bonus', 0);
    this.dispatch('status', 0);
    this.dispatch('audioCallGame', 'start');
  }

  selectGame(): void {
    this.isStartGame = false;
    this.dispatch('audioCallGame', 'select');
  }

  startGame(group: number, page: number, place = 'app'): void {
    if (APIService.getAuthUser() && APIService.isAuthorizedUser()) {
      this.isAddWords = false;
      if (group === 6) {
        this.getHardWordsByBook()
          .then(words => {
            if (words) this.resetSettingGame(words);
          })
      } else {
        this.getAgrWordsByBook(group, page, place)
          .then(words => {
            if (words) this.resetSettingGame(words);
          })
      }
    } else {
      this.isAddWords = true;
      this.nunberGroup = group;
      this.getWordsByBook(group, page, place)
        .then(words => {
          if (words) this.resetSettingGame(words);
        })
    }
  }

  stageGame(): void {
    this.dispatch('audio', `${HOST}/${this.wordsGame[this.roundGame][0].audio}`);
    const shuffleVersion = this.shuffleArray<TWord | TAggregatedWord>(this.wordsGame[this.roundGame]);
    console.log(this.wordsGame[this.roundGame][0].wordTranslate);
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

    if (this.countError === 5) return this.resultGame();
    
    if (this.roundGame < this.maxRoundGame) {
      this.roundGame += 1;
      return this.stageGame();
    }

    if (this.isAddWords && this.numberPage > 0) {
      this.numberPage -= 1;
      this.getWordsByBook(this.nunberGroup, this.numberPage, 'textbook')
        .then(words => {
          if (words) {
            this.wordsGame = (this.wordsGame as TWord[][]).concat(words);
            this.maxRoundGame = this.wordsGame.length - 1;
            this.roundGame += 1;
            return this.stageGame();
          }
        })
    } else {
      this.resultGame();
    }
  }

  resultGame(): void {
    this.isStartGame = false;
    this.dispatch('result', this.getResultGame());
    this.dispatch('audioCallGame', 'result');
  }

  getResultGame(): TGameAnswer[] {
    return this.learnWords.length ? this.learnWords : [];
  }

  getIsStartGame(): boolean {
    return this.isStartGame;
  }

  setIsStartGame(start: boolean): void {
    this.isStartGame = start;
  }

  private setInterval() {
    this.interval = setInterval(() => {
      if (!this.isStartGame) {
        if (this.interval) clearInterval(this.interval);
      }
      if (this.timer > 0) {
        this.timer--;
      } else {
        if (this.interval) clearInterval(this.interval);
        this.resultGame();
      }
      this.dispatch('time', this.timer.toString());
    }, 1000);
  }

  resetTimer(): void {
    if (this.interval) clearInterval(this.interval);
  }
}
