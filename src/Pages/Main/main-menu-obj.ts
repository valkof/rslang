export const mainMenu: IMainMenu[] = [
  {
    title: 'Учебник',
    src: 'assets/icon/dictionary.png',
    hash: "textbook",
  },
  {
    title: 'Саванна',
    src: 'assets/icon/savanna.png',
    hash: "savanna",
  },
  {
    title: 'Спринт',
    src: 'assets/icon/3.png',
    hash: "sprint",
  },
  {
    title: 'Аудиовызов',
    src: 'assets/icon/audiocall.png',
    hash: "audiocall",
  },
]
export interface IMainMenu{
  title: string,
  src: string,
  hash: string,
}