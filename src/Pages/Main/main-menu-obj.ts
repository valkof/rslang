export const mainMenu: IMainMenu[] = [
  {
    title: 'Учебник',
    src: 'assets/icon/dictionary.png',
    hash: "textbook",
  },
  {
    title: 'Аудиовызов',
    src: 'assets/icon/audiocall.png',
    hash: "audiocall",
  },
  {
    title: 'Спринт',
    src: 'assets/icon/3.png',
    hash: "sprint",
  },
]
export interface IMainMenu{
  title: string,
  src: string,
  hash: string,
}