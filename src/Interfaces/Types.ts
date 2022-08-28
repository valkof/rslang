import { AudioGameService } from '../Services/AudioGameService';
import { LangService } from '../Services/LangService';
import SprintService from './../Services/SprintService';

export type TServices = {
  lang: LangService;
  audioGame: AudioGameService;
  sprint: SprintService;
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
  id?: string;
  learnedWords: number;
  optional: {
    data: {
      dataPerDay: [
        {
          date: Date;
          newWords: number;
          learnedWords: number;
        },
      ];
    };
  };
};

export type TUserSetting = {
  id?: string;
  wordsPerDay: number;
  optional: {
    date: Date;
    learnedWords: number;
    audioCall: TGameStatistic;
    sprint: TGameStatistic;
  };
};


export type TUserWord = {
  wordId?: string;
  id?: string;
  difficulty?: 'easy' | 'learned' | 'hard';
  optional?: {
    count: number;
    maxCount: 3 | 5;
    guessed: number;
    shown: number;
    isHardWord: boolean;
    isLearningWord: boolean;
    cardData: TWord
  };
};

export type TDifficulty = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type TGameAnswer = {
  correct: boolean;
  word: TWord;
};

export type TAuthData = {
  message: string;
  name: string;
  refreshToken: string;
  token: string;
  userId: string;
};

export type TParams = string | number | boolean | object | null;

export type TGameStatistic = {
  newWords: number;
  answersCount: number;
  correctAnswers: number;
  streak: number;
};
