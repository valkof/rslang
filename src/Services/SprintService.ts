import { PAGESCOUNT } from '../config';
import { TDifficulty, TWord } from '../Interfaces/Types';
import { shuffle } from '../utils';
import APIService from './APIService';
import { Observer } from './../Abstract/Observer';

export enum ESprintEvents {
  timerTick = 'timerTick',
  score = 'score',
  startGame = 'start',
  trueBtn = 'true',
  falseBtn = 'false',
}

export default class SprintService extends Observer {
  currentWords: TWord[] = [];

  correctAnswers = [];

  incorrectAnswers = [];

  rightChoise = true;

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
      const num = Math.floor(Math.random() * PAGESCOUNT);
      if (!arr.includes(num)) {
        arr.push(num);
      }
    }
    return arr;
  }

  startGame() {
    this.dispatch(ESprintEvents.startGame);
  }
}
