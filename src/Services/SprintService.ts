import { PAGES_COUNT, SPRINT_DURATION } from '../config';
import { TDifficulty, TWord, TUserWord, TUserSetting } from '../Interfaces/Types';
import { getRandomNumber, getUserInfo, isAuthorizated, shuffle } from '../utils';
import APIService from './APIService';
import { Observer } from './../Abstract/Observer';

export enum ESprintEvents {
  timerTick = 'timerTick',
  score = 'score',
  startGame = 'start',
  changeWord = 'changeWord',
  changeTranslate = 'changeTranslate',
  changeCombo = 'changeCombo',
  changeReward = 'changeReward',
  renderStatistic = 'statistic',
}

export default class SprintService extends Observer {
  private currentWords: TWord[] = [];

  private currentWord: TWord | null = null;

  private incorrectVariants: string[] = [];

  private correctAnswers: Array<TWord | null> = [];

  private incorrectAnswers: Array<TWord | null> = [];

  private rightChoise = true;

  private timer = SPRINT_DURATION;

  private score = 0;

  private bonusScore = 0;

  private combo = 0;

  private isGame = false;

  private interval: NodeJS.Timer | null = null;

  async generateWords(difficulty: TDifficulty) {
    const pages = this.generateRandomNums();
    let array: TWord[] = [];
    for (let i = 0; i < pages.length; i++) {
      const words = await APIService.getWords(pages[i], difficulty);
      array = words ? [...array, ...words.data] : array;
    }
    shuffle(array);
    this.currentWords = array ? array : [];
  }

  generateRandomNums(): number[] {
    const arr: number[] = [];
    while (arr.length < 5) {
      const num = getRandomNumber(PAGES_COUNT);
      if (!arr.includes(num)) {
        arr.push(num);
      }
    }
    return arr;
  }

  startGame() {
    this.incorrectVariants = this.currentWords.map(el => el.wordTranslate) as string[];
    this.incorrectVariants.reverse();
    this.isGame = true;
    this.reset();

    this.changeWord();
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

  refreshGame() {
    this.currentWords = [
      ...this.currentWords,
      ...(this.correctAnswers as TWord[]),
      ...(this.incorrectAnswers as TWord[]),
    ];
    this.incorrectVariants = this.currentWords.map(el => el.wordTranslate) as string[];
    this.incorrectVariants.reverse();
    this.isGame = true;
    this.reset();

    this.changeWord();
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
        const incorectWord = this.incorrectVariants[this.currentWords.length];
        this.dispatch(ESprintEvents.changeTranslate, JSON.stringify(incorectWord));
      }
    } else this.stopGame();
  }

  stopGame() {
    this.isGame = false;
    const dataObj = {
      correct: this.correctAnswers,
      incorrect: this.incorrectAnswers,
    };
    this.dispatch(ESprintEvents.renderStatistic, dataObj);
  }

  answer(answer: boolean) {
    if (this.isGame) {
      if (answer === this.rightChoise) {
        this.correctAnswers.push(this.currentWord);
        if (this.combo < 3) {
          this.combo++;
        } else {
          this.combo = 0;
          this.bonusScore = this.bonusScore < 40 ? (this.bonusScore += 10) : this.bonusScore;
        }
        this.score += 20 + this.bonusScore;
      } else {
        this.incorrectAnswers.push(this.currentWord);
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
    this.correctAnswers = [];
    this.incorrectAnswers = [];

    this.dispatch(ESprintEvents.startGame);
    this.dispatch(ESprintEvents.timerTick, SPRINT_DURATION.toString());
    this.dispatch(ESprintEvents.score, '0');
    this.dispatch(ESprintEvents.score, this.score.toString());
    this.dispatch(ESprintEvents.changeCombo, this.combo.toString());
    this.dispatch(ESprintEvents.changeReward, this.bonusScore.toString());

    if (this.interval) clearInterval(this.interval);
  }
}
