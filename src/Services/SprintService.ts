import { INIT_USER_SETTING, INIT_USER_STATISTIC, INIT_USER_WORD, SPRINT_DURATION } from '../config';
import {
  TAggregatedWord,
  TAuthData,
  TDifficulty,
  TGameAnswer,
  TUserSetting,
  TUserStatistic,
  TUserWord,
  TWord,
} from '../Interfaces/Types';
import { createDate, getUserInfo, isAuthorizated, shuffle } from '../utils';
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

  private user: TAuthData | null = null;

  private randomPages: number[] = [];

  private difficulty: TDifficulty = 0;

  async generateWords(difficulty: TDifficulty, pages: number[]) {
    this.user = getUserInfo();
    let array: TAggregatedWord[] | TWord[] = [];
    this.randomPages = [...pages];
    this.difficulty = difficulty;

    if (await isAuthorizated(this.user)) {
      const qerry = [];
      for (let i = 0; i < pages.length; i++) {
        qerry.push(`{"page": ${pages[i]}}`);
      }
      const qerry2 = `{"$and": [{ "group": ${difficulty} }, { "$or": [${qerry.join(',')}] }]}`;
      //const qerry2 = `{"$and": [{ "group": ${difficulty} }, { "$or": [{"page": 0}] }]}`; // Это для тестов
      const wordsRaw = await APIService.getAgrWords(this.user?.userId as string, this.user?.token as string, {
        wordsPerPage: '100',
        filter: qerry2,
      });
      array = wordsRaw?.data[0] ? wordsRaw?.data[0].paginatedResults : [];
      shuffle(array as TAggregatedWord[]);
      this.currentWords = [...array];
    } else {
      for (let i = 0; i < pages.length; i++) {
        const words = await APIService.getWords(pages[i], difficulty);
        array = words ? [...(array as TWord[]), ...words.data] : array;
        shuffle(array as TWord[]);
        this.currentWords = [...array] as TWord[];
      }
    }
  }

  async startGame() {
    const user = getUserInfo();
    if (user && (await isAuthorizated(user))) {
      const words = this.currentWords as TAggregatedWord[];
      this.incorrectVariants = words.map(el => el.wordTranslate) as string[];
    } else {
      const words = this.currentWords as TWord[];
      this.incorrectVariants = words.map(el => el.wordTranslate) as string[];
    }

    this.incorrectVariants = this.currentWords.map(el => el.wordTranslate) as string[];
    this.incorrectVariants.reverse();
    this.isGame = true;
    this.reset();
    this.dispatch(ESprintEvents.startGame);

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

  async refreshGame() {
    this.reset();
    await this.generateWords(this.difficulty, this.randomPages);
    this.isGame = true;
    this.dispatch(ESprintEvents.startGame);

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

  async stopGame() {
    this.isGame = false;
    this.dispatch(ESprintEvents.renderStatistic, this.answers);
    const user = getUserInfo();
    if (user && (await isAuthorizated(user))) {
      this.writeResults(this.answers);
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

  private async writeResults(answers: TGameAnswer[]) {
    const user = getUserInfo();
    const date = createDate();
    let newWords = 0;
    let learned = 0;
    const answersCount = answers.length;
    let correctAnswers = 0;
    let streak = 0;
    let maxStreak = 0;

    if (user && (await isAuthorizated(user))) {
      for (let i = 0; i < answers.length; i++) {
        const word = answers[i].word as TAggregatedWord;
        if (!word.userWord) {
          newWords++;
        }

        if (answers[i].correct) {
          correctAnswers++;
          streak++;
          maxStreak = maxStreak < streak ? streak : maxStreak;
          learned += await this.writeUserWord(user, word, true);
        } else {
          streak = 0;
          await this.writeUserWord(user, word, false);
        }
      }

      await this.writeSetting(user, date, newWords, maxStreak, answersCount, correctAnswers, learned);
      await this.writeStatistic(user, date, newWords, learned);
    }
  }

  private async writeSetting(
    user: TAuthData,
    date: string,
    newWords: number,
    maxStreak: number,
    answersCount: number,
    correctAnswers: number,
    learned: number,
  ) {
    const rawSetting = await APIService.getUserSetting(user!.userId, user!.token);
    const setting: TUserSetting = rawSetting
      ? (rawSetting.data as TUserSetting)
      : JSON.parse(JSON.stringify(INIT_USER_SETTING));
    delete setting.id;
    if (setting.optional.date === date) {
      setting.wordsPerDay += newWords;
      setting.optional.sprint.newWords += newWords;
      setting.optional.sprint.streak =
        setting.optional.sprint.streak < maxStreak ? maxStreak : setting.optional.sprint.streak;
      setting.optional.sprint.correctAnswers += correctAnswers;
      setting.optional.sprint.answersCount += answersCount;
      setting.optional.learnedWords += learned;
    } else {
      setting.optional.date = createDate();
      setting.wordsPerDay = newWords;
      setting.optional.sprint.newWords = newWords;
      setting.optional.sprint.streak =
        setting.optional.sprint.streak < maxStreak ? maxStreak : setting.optional.sprint.streak;
      setting.optional.sprint.correctAnswers = correctAnswers;
      setting.optional.sprint.answersCount = answersCount;
      setting.optional.learnedWords = learned;
    }
    await APIService.upsertUserSetting(this.user!.userId, setting, this.user!.token);
  }

  // Запись статистики в БД
  private async writeStatistic(user: TAuthData, date: string, newWords: number, learned: number) {
    const rawStatistic = await APIService.getUserStatistics(user.userId, user.token);
    let statistic: TUserStatistic = rawStatistic ? rawStatistic.data : JSON.parse(JSON.stringify(INIT_USER_STATISTIC));
    statistic = statistic.optional ? statistic : JSON.parse(JSON.stringify(INIT_USER_STATISTIC));
    statistic.learnedWords += learned;

    if (
      statistic.optional.data.dataPerDay[statistic.optional.data.dataPerDay.length - 1].date === date ||
      statistic.optional.data.dataPerDay[statistic.optional.data.dataPerDay.length - 1].date === ''
    ) {
      const i = statistic.optional.data.dataPerDay.length - 1;
      statistic.optional.data.dataPerDay[i].learnedWords += learned;
      statistic.optional.data.dataPerDay[i].newWords += newWords;
      statistic.optional.data.dataPerDay[i].date = date;
    } else {
      statistic.optional.data.dataPerDay.push({
        learnedWords: learned,
        newWords: newWords,
        date: date,
      });
    }
    delete statistic.id;
    APIService.upsertUserStatistics(user.userId, statistic, user.token);
  }

  private async writeUserWord(user: TAuthData, word: TAggregatedWord, isTrue: boolean): Promise<number> {
    let learned = 0;
    switch (isTrue) {
      case true:
        if (word.userWord) {
          if (word.userWord.optional) {
            word.userWord.optional = {
              guessed: word.userWord.optional.guessed + 1,
              count: word.userWord.optional.count + 1,
              maxCount: word.userWord.optional.maxCount,
              shown: word.userWord.optional.shown + 1,
            };
            if (
              word.userWord.optional.count >= word.userWord.optional.maxCount &&
              word.userWord.difficulty !== 'learned'
            ) {
              word.userWord.difficulty = 'learned';
              learned++;
            }
          }

          APIService.updateUserWord(user.userId!, word._id!, word.userWord, user.token);
        } else {
          const init = JSON.parse(JSON.stringify(INIT_USER_WORD)) as TUserWord;
          init.optional.guessed = 1;
          init.optional.count = 1;
          APIService.createUserWord(user.userId!, word._id!, init, user.token);
        }
        break;
      case false:
        if (word.userWord) {
          if (word.userWord.optional) {
            word.userWord.optional = {
              guessed: word.userWord.optional.guessed,
              count: 0,
              maxCount: word.userWord.optional.maxCount,
              shown: word.userWord.optional.shown + 1,
            };
            word.userWord.difficulty = word.userWord.optional.maxCount === 3 ? 'easy' : 'hard';
          }

          APIService.updateUserWord(user.userId!, word._id!, word.userWord, user.token);
        } else APIService.createUserWord(user.userId!, word._id!, INIT_USER_WORD, user.token);
        break;
    }
    return learned;
  }
}
