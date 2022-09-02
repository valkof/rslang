import { INIT_USER_SETTING, INIT_USER_STATISTIC, INIT_USER_WORD } from "../config";
import { TAggregatedWord, TAuthData, TGameAnswer, TUserSetting, TUserStatistic, TUserWord } from "../Interfaces/Types";
import { createDate } from "../utils";
import APIService from "./APIService";

export default abstract class WriteStatisticService {

  static async writeResults(answers: TGameAnswer[]) {
    const user = APIService.getAuthUser();
    const date = createDate();
    let newWords = 0;
    let learned = 0;
    const answersCount = answers.length;
    let correctAnswers = 0;
    let streak = 0;
    let maxStreak = 0;

    if (user && APIService.isAuthorizedUser()) {
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

  static async writeSetting(
    user: TAuthData,
    date: string,
    newWords: number,
    maxStreak: number,
    answersCount: number,
    correctAnswers: number,
    learned: number,
  ) {
    const rawSetting = await APIService.getUserSetting();
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
    await APIService.upsertUserSetting(setting);
  }

  // Запись статистики в БД
  static async writeStatistic(user: TAuthData, date: string, newWords: number, learned: number) {
    const rawStatistic = await APIService.getUserStatistics();
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
    APIService.upsertUserStatistics(statistic);
  }

  static async writeUserWord(user: TAuthData, word: TAggregatedWord, isTrue: boolean): Promise<number> {
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
            word.userWord.difficulty = word.userWord.optional.maxCount === 3 ? 'easy' : 'hard';
          }

          APIService.updateUserWord(word._id!, word.userWord);
        } else APIService.createUserWord(word._id!, INIT_USER_WORD);
        break;
    }
    return learned;
  }

}