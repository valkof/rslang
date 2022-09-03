
export const developers: IDeveloper[] = [
  {
    src: 'assets/developers/KofanovVA.jpg',
    name: 'Valery Kofanov',
    description: 'Тимлид. Разработал архитектуру приложения и руководил командой. Разработал страницу "Авторизация". Разработал игру "Аудиовызов"'
  },
    
  {
    src: 'assets/developers/VickyCova.jpg',
    name: 'Victoria Belova',
    description: 'Разработала главную страницу приложения, страницы "Наша команда", "Наши приемущества", "Учебник", "Статистика". Участвовала в разработке архитектуры приложения.'
  },
   
  {
    src: 'assets/developers/KalinovS.jpg',
    name: 'Alexandr Kalinov',
    description: 'Создал запросы к базе данных API. Разработал игру "Спринт".'
  },
]

export interface IDeveloper {
  src: string;
  name: string;
  description: string;
}
