
export const developers: IDeveloper[] = [
  {
    src: 'assets/developers/KofanovVA.jpg',
    name: 'Valery Kofanov',
    description: 'Тимлид. Разработал архитектуру приложения и руководил командой. Разработал страницу "Авторизация". Разработал игру "Аудиовызов"'
  },
    
  {
    src: 'assets/developers/VickyCova.jpg',
    name: 'Victoria Belova',
    description: 'Разработчик. Участвовала в разработке архитектуры приложения. Разработала главную страницу приложения, страницы "Наша команда", "Наши приемущества", "Учебник".'
  },
   
  {
    src: 'assets/developers/KalinovS.jpg',
    name: 'Alexandr Kalinov',
    description: 'Разработчик. Реализовал ..... Создал запросы к базе данных API. Разработал игру "Спринт"'
  },
]

export interface IDeveloper {
  src: string;
  name: string;
  description: string;
}
