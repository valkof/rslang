import { TUserStatistic, TUserWord } from '../Interfaces/Types';

export const HOST = 'https://app-rsslang.herokuapp.com';
export const PAGES_COUNT = 29;
export const SPRINT_DURATION = 60;
export const GROUP = 6;
export const PAGES_COUNT_IN_GAME = 3;

export const INIT_GAME_SETTING = {
  newWords: 0,
  answersCount: 0,
  correctAnswers: 0,
  streak: 0,
};
Object.freeze(INIT_GAME_SETTING);

export const INIT_USER_SETTING = {
  wordsPerDay: 1,
  optional: {
    date: '0',
    learnedWords: 0,
    audioCall: INIT_GAME_SETTING,
    sprint: INIT_GAME_SETTING,
  },
};
Object.freeze(INIT_USER_SETTING);

export const INIT_USER_WORD_OPTIONAL = {
  guessed: 0,
  count: 0,
  maxCount: 3 as 3 | 5,
  shown: 1,
};
Object.freeze(INIT_USER_SETTING);

export const INIT_USER_WORD: TUserWord = {
  difficulty: 'easy',
  optional: INIT_USER_WORD_OPTIONAL,
};
Object.freeze(INIT_USER_WORD);

export const INIT_USER_STATISTIC: TUserStatistic = {
  learnedWords: 0,
  optional: {
    data: {
      dataPerDay: [
        {
          date: '',
          newWords: 0,
          learnedWords: 0,
        },
      ],
    },
  },
};
Object.freeze(INIT_USER_STATISTIC);
