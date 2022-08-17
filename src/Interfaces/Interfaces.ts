export interface IBaseInterface {
  render: () => void;
}

export interface IAgrQerry {
  group?: string,
  page?: string,
  wordsPerPage?: string,
  filter?: string
}
