export interface IBaseInterface {
  render: () => void;
}

export interface IAgrQerry {
  group?: number | string,
  page?: number | string,
  wordsPerPage?: number | string,
  filter?: string
}