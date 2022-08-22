
import { AudioGameService } from "../Services/AudioGameService";
import { LangService } from "../Services/LangService";


export type TServices = {
  lang: LangService,
  audioGame: AudioGameService
};

export type TWord = {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
};

export type TUser = {
  email: string;
  password: string;
  name?: string;
};

export type TAuthResponse = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

export type TUserStatistic = {
  learnedWords: number;
  optional: object;
};

export type TUserSetting = {
  wordsPerDay: number;
  optional: object;
};

export type TUserWord= {
  difficulty: string;
  optional: object;
}

export type TLearnWords = {
  learn: boolean;
  word: TWord;
}