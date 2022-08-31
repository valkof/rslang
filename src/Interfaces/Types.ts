
import { AudioGameService } from "../Services/AudioGameService";
import { LangService } from "../Services/LangService";
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
  email?: string;
  password?: string;
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
          date: string;
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
    date: string;
    learnedWords: number;
    audioCall: TGameStatistic;
    sprint: TGameStatistic;
  };
};

export type TUserWord = {
  wordId?: string;
  id?: string;
  difficulty: 'easy' | 'learned' | 'hard';
  optional: {
    count: number;
    maxCount: 3 | 5;
    guessed: number;
    shown: number;
  }
}

export type TLearnWords = {
  learn: boolean;
  word: TWord;
}

export type TDifficulty = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type TSprintAnswers = {
  correct: TWord[];
  incorrect: TWord[];
};

export type TAuthData = {
  message: string;
  name: string;
  refreshToken: string;
  token: string;
  userId: string;
}

export type TParams = string | number | boolean | object | null;

export type TGameAnswer = {
  correct: boolean;
  word: TWord | TAggregatedWord;
};

export type TGameStatistic = {
  newWords: number;
  answersCount: number;
  correctAnswers: number;
  streak: number;
};

export type TAggregatedWord = {
  _id: string;
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
  userWord?: {
    difficulty: 'easy' | 'learned' | 'hard';
    optional: {
      count: number;
      maxCount: 3 | 5;
      guessed: number;
      shown: number;
    }
  }
}

type TCount = {
  count: number;
}

export type TAggregatedWords = {
  paginatedResults: TAggregatedWord[];
  totalCount: TCount[];
}
