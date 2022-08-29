export const mainMenu: IMainMenu[] = [
  {
    title: 'Учебник',
    src: 'assets/icon/dictionary.png',
    hash: "textbook",
  },
  {
    title: 'Статистика',
    src: 'assets/icon/6.png',
    hash: "statistic",
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