import { SPRINT_DURATION } from '../config';
import {
  EGames,
  TAggregatedWord,
  TDifficulty,
  TGameAnswer,
  TWord,
} from '../Interfaces/Types';
import { getWordsFromDict, shuffle } from '../utils';
import APIService from './APIService';
import { Observer } from './../Abstract/Observer';
import WriteStatisticService from './WriteStatisticService';

export enum ESprintEvents {
  timerTick = 'timerTick',
  score = 'score',
  startGame = 'start',
  changeWord = 'changeWord',
  changeTranslate = 'changeTranslate',
  changeCombo = 'changeCombo',
  changeReward = 'changeReward',
  renderStatistic = 'statistic',
  renderStatisticDictionary = 'renderStatisticDictionary'
}

export default class SprintService extends Observer {
  private currentWords: TWord[] | TAggregatedWord[] = [];

  private currentWord: TWord | TAggregatedWord | null = null;

  private incorrectVariants: string[] = [];

  private answers: TGameAnswer[] = [];

  private rightChoise = true;

  private timer = SPRINT_DURATION;

  private score = 0;

  private bonusScore = 0;

  private combo = 0;

  private isGame = false;

  private interval: NodeJS.Timer | null = null;

  private randomPages: number[] = [];

  private pageFromDictionary = 0;

  private difficulty: TDifficulty = 0;

  private isFromDict = false;

  async generateWords(difficulty: TDifficulty, pages: number[]) {
    this.isFromDict = false;
    let array: TAggregatedWord[] | TWord[] = [];
    this.randomPages = [...pages];
    this.difficulty = difficulty;

    if (APIService.isAuthorizedUser()) {
      const qerry = [];
      for (let i = 0; i < pages.length; i++) {
        qerry.push(`{"page": ${pages[i]}}`);
      }
      const qerry2 = `{"$and": [{ "group": ${difficulty} }, { "$or": [${qerry.join(',')}] }]}`;
      //const qerry2 = `{"$and": [{ "group": ${difficulty} }, { "$or": [{"page": 0}] }]}`; // Это для тестов
      const wordsRaw = await APIService.getAgrWords({
        wordsPerPage: '100',
        filter: qerry2,
      });
      array = wordsRaw?.data[0] ? wordsRaw?.data[0].paginatedResults : [];
      this.currentWords = [...array];
    } else {
      for (let i = 0; i < pages.length; i++) {
        const words = await APIService.getWords(pages[i], difficulty);
        array = words ? [...(array as TWord[]), ...words.data] : array;
        this.currentWords = [...array] as TWord[];
      }
    }
  }

  async startGame() {
    this.incorrectVariants = this.currentWords.map(el => el.wordTranslate) as string[];
    shuffle(this.currentWords as TWord[]);
    this.isGame = true;
    this.reset();
    this.dispatch(ESprintEvents.startGame);
    this.changeWord();
    this.setInterval();
  }

  async startFromDict(group: number, page: number) {
    this.isFromDict = true;
    this.difficulty = group as TDifficulty;
    this.pageFromDictionary = page;
    this.currentWords = (await getWordsFromDict(group, page)) as TAggregatedWord[];
    this.startGame();
  }

  async refreshGame() {
    this.reset();
    if (!this.isFromDict) {
      await this.generateWords(this.difficulty, this.randomPages);
    } else {
      this.currentWords = (await getWordsFromDict(this.difficulty, this.pageFromDictionary)) as TAggregatedWord[];
    }
    shuffle(this.currentWords as TWord[]);
    this.isGame = true;
    this.dispatch(ESprintEvents.startGame);
    this.changeWord();
    this.setInterval();
  }

  changeWord() {
    let word: TWord;
    if (this.currentWords.length > 0) {
      word = this.currentWords.pop() as TWord;
      this.currentWord = word;
      this.dispatch(ESprintEvents.changeWord, JSON.stringify(word.word));
      if (Math.random() > 0.5) {
        this.rightChoise = true;
        this.dispatch(ESprintEvents.changeTranslate, JSON.stringify(word.wordTranslate));
      } else {
        this.rightChoise = false;
        const incorectWord= this.getIncorrect(word.wordTranslate);
        this.dispatch(ESprintEvents.changeTranslate, JSON.stringify(incorectWord));
      }
    } else this.stopGame();
  }

  async stopGame() {
    this.isGame = false;
    if(this.isFromDict) {
      this.dispatch(ESprintEvents.renderStatisticDictionary, this.answers);
    } else {
      this.dispatch(ESprintEvents.renderStatistic, this.answers);
    }

    const user = APIService.getAuthUser();
    if (user && APIService.isAuthorizedUser()) {
      WriteStatisticService.writeResults(this.answers, EGames.sprint);
    }
  }

  answer(answer: boolean) {
    if (this.isGame) {
      if (answer === this.rightChoise) {
        this.answers.push({
          correct: true,
          word: this.currentWord as TWord,
        });
        if (this.combo < 3) {
          this.combo++;
        } else {
          this.combo = 0;
          this.bonusScore = this.bonusScore < 40 ? (this.bonusScore += 10) : this.bonusScore;
        }
        this.score += 20 + this.bonusScore;
      } else {
        this.answers.push({
          correct: false,
          word: this.currentWord as TWord,
        });
        this.combo = 0;
        this.bonusScore = 0;
        this.score = this.score >= 20 ? (this.score -= 20) : this.score;
      }
      this.dispatch(ESprintEvents.score, this.score.toString());
      this.dispatch(ESprintEvents.changeCombo, this.combo.toString());
      this.dispatch(ESprintEvents.changeReward, this.bonusScore.toString());
      this.changeWord();
    }
  }

  reset() {
    this.timer = SPRINT_DURATION;
    this.score = 0;
    this.combo = 0;
    this.bonusScore = 0;
    this.answers = [];

    this.dispatch(ESprintEvents.timerTick, SPRINT_DURATION.toString());
    this.dispatch(ESprintEvents.score, '0');
    this.dispatch(ESprintEvents.score, this.score.toString());
    this.dispatch(ESprintEvents.changeCombo, this.combo.toString());
    this.dispatch(ESprintEvents.changeReward, this.bonusScore.toString());

    if (this.interval) clearInterval(this.interval);
  }

  private setInterval() {
    this.interval = setInterval(() => {
      if (!this.isGame) {
        if (this.interval) clearInterval(this.interval);
      }
      if (this.timer > 0) {
        this.timer--;
      } else {
        if (this.interval) clearInterval(this.interval);
        this.stopGame();
      }
      this.dispatch(ESprintEvents.timerTick, this.timer.toString());
    }, 1000);
  }

  private getIncorrect(word:string) {
    const index =  this.incorrectVariants.indexOf(word);
    if(index >= this.incorrectVariants.length - 1) {
      return this.incorrectVariants[0];
    } else return this.incorrectVariants[index+1];
  }
}
