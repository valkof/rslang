import { TAuthData } from "../Interfaces/Types";
import APIService from '../Services/APIService';

export function logError(message: string, error: unknown) {
  const errMessage = (error instanceof Error) ? error.message : 'Unknown Error';
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

// Получение токена из локалстора
export function getToken(): string {
  const data = JSON.parse(localStorage.getItem('rslang')!) as TAuthData;
  return data ? data.token : '';
}

// Получение объекта пользователя из локалстора
export function getUserInfo(): TAuthData | null {
  const data = localStorage.getItem('rslang') ?  JSON.parse(localStorage.getItem('rslang')!) as TAuthData : null;
  return data;
}

// Проверка или пользователь авторизирован
export async function isAuthorizated(data: TAuthData | null): Promise<boolean> {
  if(!data) return false;
  const resp =  await APIService.getUser(data.userId!,data.token)
  return (resp?.status === 200) ? true : false;
}

export function createDate(): string {
  return new Date().toLocaleString().split(',')[0];
}