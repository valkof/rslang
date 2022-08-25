import { TWord } from "./Types";

export interface IBaseInterface {
  render: () => void;
}

export interface IAgrParams {
  group?: string,
  page?: string,
  wordsPerPage?: string,
  filter?: string
}

export interface IResponse<T> {
  status: number,
  data: T
}

export interface IData {
  id?: string,
  difficulty: string,
  wordId?: string,
  optional: {
    isHardWord: boolean;
    isLearningWord: boolean;
    cardData: TWord
  }
}

export interface IUserWords extends IResponse<IData[]> {}
