import { PAGES_COUNT } from '../config';
import { IResponse } from '../Interfaces/Interfaces';
import { TAggregatedWord, TAggregatedWords } from '../Interfaces/Types';
import APIService from '../Services/APIService';

export function logError(message: string, error: unknown) {
  const errMessage = error instanceof Error ? error.message : 'Unknown Error';
  console.error(`[${message}]: ${errMessage}`);
}

// Функция перемешивания массивов https://en.wikipedia.org/wiki/Fisher–Yates_shuffle
export function shuffle<T>(arr: Array<T>) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

export function createDate(): string {
  return new Date().toLocaleDateString().split('.').reverse().join('-');
}

export function generateRandomNums(count: number): number[] {
  const arr: number[] = [];
  while (arr.length < count) {
    const num = getRandomNumber(PAGES_COUNT);
    if (!arr.includes(num)) {
      arr.push(num);
    }
  }
  return arr;
}

export async function getWordsFromDict(group: number, page: number): Promise<TAggregatedWord[]> {
  if (group >= 0 && group < 6) {
    const qerry = `{"$and": [{ "$or": [{ "userWord.difficulty":"easy" },{ "userWord.difficulty":"hard" },{"userWord":null}] },{ "group": ${group} }, { "$or": [{"page": ${page}}] }]}`;
    let wordsRaw = await APIService.getAgrWords({
      wordsPerPage: '40',
      filter: qerry,
    });
    if (!wordsRaw) return [];
    if (wordsRaw && wordsRaw.data[0].paginatedResults.length >= 2) {
      return wordsRaw.data[0].paginatedResults;
    } else {
      if (page === 0) return [];
      const template = [];
      for (let i = 0; i < page; i++) {
        template.push(`{"page": ${i}}`);
      }
      const qerry2 = `{"$and": [{ "$or": [{ "userWord.difficulty":"easy" },{ "userWord.difficulty":"hard" },{"userWord":null}] },{ "group": ${group} }, { "$or": [${template.join(
        ',',
      )}] }]}`;
      wordsRaw = await APIService.getAgrWords({
        wordsPerPage: '40',
        filter: qerry2,
      });
      return wordsRaw!.data[0].paginatedResults;
    }
  } else if (group === 6) {
    const qerry = `{"$and":  [{ "userWord.difficulty":"hard" }] } `;
    const wordsRaw = await APIService.getAgrWords({
      wordsPerPage: '40',
      filter: qerry,
    });
    return wordsRaw!.data[0].paginatedResults;
  }
  return [];
}

export function validateNum(number: number): string {
  if (!Number.isFinite(number) || Number.isNaN(number)) {
    return '0';
  } else return number.toString();
}
