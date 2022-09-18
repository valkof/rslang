
export const developers: IDeveloper[] = [
  {
    src: 'assets/developers/kofanov.jpg',
    name: 'Valery Kofanov',
    description: 'Тимлид. Разработал архитектуру приложения и руководил командой. Разработал страницу "Авторизация". Создал игру "Аудиовызов". Создал диаграммы для визуализации долговременной статистики.'
  },
    
  {
    src: 'assets/developers/VickyCova.jpg',
    name: 'Victoria Belova',
    description: 'Участвовала в разработке архитектуры приложения. Разработала главную страницу приложения, страницы "Наша команда", "Наши приемущества", "Статистика". Создала Учебник и Словарь.'
  },
   
  {
    src: 'assets/developers/KalinovS.jpg',
    name: 'Alexandr Kalinov',
    description: 'Создал запросы к базе данных API. Разработал игру "Спринт". Разработал компоненты для взаимодействия со статистическими данными. Разработал прогресс изучения слов и краткосрочную статистику изученных слов по результатам их угадывания в мини-играх.'
  },
]

export interface IDeveloper {
  src: string;
  name: string;
  description: string;
}
