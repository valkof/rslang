export const aboutUs: IAboutUs[] = [
  {
    src: 'assets/about-us/learn.png',
    title: 'Изучай новое',
    text: 'В учебнике собраны 3600 самых используемых в повседневной жизни слов, есть его определение и пример как на русском так и на английском! Наш учебник позволяет балансировать сложность и темп обучения для каждого пользователя индивидуально!',
  },

  {
    src: 'assets/about-us/play.png',
    title: 'Практикуй изученное',
    text: 'Регулярная практика изученного материала поможет развить письменную и усную речь. В усвоении материала тебе помогут наши забавные задания. С нашим игровым подходом ежедневные занятия входят в привычку.',
  },

  {
    src: 'assets/about-us/5.png',
    title: 'Отслеживай свой прогресс',
    text: 'В личном кабинете ты можешь следить за своим прогрессом: сколько слов ты уже выучил всего и за каждый день. Увеличение твоего прогресса будет лучшим стимулом для дальнейшего изучения английского языка.',
  },
];

export interface IAboutUs {
  src: string;
  title: string;
  text: string;
}
