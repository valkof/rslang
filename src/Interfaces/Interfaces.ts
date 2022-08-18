export interface IBaseInterface {
  render: () => void;
}

export interface IAgrParams {
  group?: string,
  page?: string,
  wordsPerPage?: string,
  filter?: string
}
