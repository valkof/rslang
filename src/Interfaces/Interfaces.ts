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