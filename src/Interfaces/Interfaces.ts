export interface IBaseInterface {
  render: () => void;
}

export interface IAgrQery {
  group?: string,
  page?: string,
  wordsPerPage?: string,
  filter?: string
}
