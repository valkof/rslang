import { INIT_USER_SETTING, INIT_USER_STATISTIC, INIT_USER_WORD } from '../config';
import {
  EGames,
  TAggregatedWord,
  TGameAnswer,
  TUserSetting,
  TUserStatistic,
  TUserWord,
} from '../Interfaces/Types';
import { createDate } from '../utils';
import APIService from './APIService';

export default abstract class WriteStatisticService {
  static game = EGames.sprint;

  static async writeResults(answers: TGameAnswer[], game: EGames) {
    this.game = game;
    const date = createDate();
    let newWords = 0;
    let learned = 0;
    const answersCount = answers.length;
    let correctAnswers = 0;
    let streak = 0;
    let maxStreak = 0;

    if (APIService.isAuthorizedUser()) {
      for (let i = 0; i < answers.length; i++) {
        const word = answers[i].word as TAggregatedWord;
        if (!word.userWord) {
          newWords++;
        }

        if (answers[i].correct) {
          correctAnswers++;
          streak++;
          maxStreak = maxStreak < streak ? streak : maxStreak;
          learned += await this.writeUserWord(word, true);
        } else {
          streak = 0;
          learned += await this.writeUserWord(word, false);
        }
      }

      await this.writeSetting(date, newWords, maxStreak, answersCount, correctAnswers, learned);
      await this.writeStatistic(date, newWords, learned);
    }
  }

  static async writeSetting(
    date: string,
    newWords: number,
    maxStreak: number,
    answersCount: number,
    correctAnswers: number,
    learned: number,
    textbook = false
  ): Promise<void> {
    const rawSetting = await APIService.getUserSetting();
    let setting: TUserSetting = rawSetting
      ? (rawSetting.data as TUserSetting)
      : JSON.parse(JSON.stringify(INIT_USER_SETTING));
    delete setting.id;
    if (setting.optional.date === date) {
      setting.wordsPerDay += newWords;
      setting.optional[this.game].newWords += textbook ? 0 : newWords;
      setting.optional[this.game].streak =
        setting.optional[this.game].streak < maxStreak ? maxStreak : setting.optional[this.game].streak;
      setting.optional[this.game].correctAnswers += correctAnswers;
      setting.optional[this.game].answersCount += answersCount;
      setting.optional.learnedWords += learned;
    } else {
      setting = JSON.parse(JSON.stringify(INIT_USER_SETTING));
      setting.optional.date = createDate();
      setting.wordsPerDay += newWords;
      setting.optional[this.game].newWords = textbook ? 0 : newWords;
      setting.optional[this.game].streak =
        setting.optional[this.game].streak < maxStreak ? maxStreak : setting.optional[this.game].streak;
      setting.optional[this.game].correctAnswers = correctAnswers;
      setting.optional[this.game].answersCount = answersCount;
      setting.optional.learnedWords = learned;
    }
    await APIService.upsertUserSetting(setting);
  }

  static async writeStatistic(date: string, newWords: number, learned: number) {
    const rawStatistic = await APIService.getUserStatistics();
    let statistic: TUserStatistic = rawStatistic ? rawStatistic.data : JSON.parse(JSON.stringify(INIT_USER_STATISTIC));
    statistic = statistic.optional ? statistic : JSON.parse(JSON.stringify(INIT_USER_STATISTIC));
    statistic.learnedWords += learned;

    if (
      statistic.optional.data.dataPerDay[statistic.optional.data.dataPerDay.length - 1].date === date ||
      statistic.optional.data.dataPerDay[statistic.optional.data.dataPerDay.length - 1].date === ''
    ) {
      const i = statistic.optional.data.dataPerDay.length - 1;
      statistic.optional.data.dataPerDay[i].learnedWords = statistic.learnedWords;
      statistic.optional.data.dataPerDay[i].newWords += newWords;
      statistic.optional.data.dataPerDay[i].date = date;
    } else {
      statistic.optional.data.dataPerDay.push({
        learnedWords: statistic.learnedWords,
        newWords: newWords,
        date: date,
      });
    }
    delete statistic.id;
    APIService.upsertUserStatistics(statistic);
  }

  static async writeUserWord(word: TAggregatedWord, isTrue: boolean): Promise<number> {
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
              word.userWord.optional.count = 3;
              word.userWord.optional.maxCount = 3;
              learned++;
            }
          }

          APIService.updateUserWord(word._id!, word.userWord);
        } else {
          const init = JSON.parse(JSON.stringify(INIT_USER_WORD)) as TUserWord;
          init.optional.guessed = 1;
          init.optional.count = 1;
          APIService.createUserWord(word._id!, init);
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
            if (word.userWord.difficulty === 'learned') {
              word.userWord.optional.maxCount = 3;
              learned -= 1;
            }
            word.userWord.difficulty = word.userWord.optional.maxCount === 3 ? 'easy' : 'hard';
          }

          APIService.updateUserWord(word._id!, word.userWord);
        } else APIService.createUserWord(word._id!, INIT_USER_WORD);
        break;
    }
    return learned;
  }

  static async writeInitialStatistic(): Promise<void> {
    const statistic = {
      learnedWords: 0,
      optional: {
        data: {
          dataPerDay: [
            {
              date: createDate(),
              newWords: 0,
              learnedWords: 0,
            },
          ],
        },
      },
    } as TUserStatistic;

    const settings = {
      wordsPerDay: 1,
      optional: {
        date: createDate(),
        learnedWords: 0,
        audioCall: {
          newWords: 0,
          answersCount: 0,
          correctAnswers: 0,
          streak: 0,
        },
        sprint: {
          newWords: 0,
          answersCount: 0,
          correctAnswers: 0,
          streak: 0,
        },
      },
    } as TUserSetting;

    await APIService.upsertUserStatistics(statistic);
    await APIService.upsertUserSetting(settings);
  }
}
