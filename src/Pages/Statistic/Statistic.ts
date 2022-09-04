import { Component } from '../../Abstract/component';
import { EGames, TServices } from '../../Interfaces/Types';
import {  GamesStatistic } from './Statistics-block/Games-statistic';
import { Graph } from './Statistics-block/Graph';
import { WordsStatistic } from './Statistics-block/Word-statistic';

export class Statistic extends Component {
  titleStatistic: Component;

  avatarStatisticsBlock: Component;

  avatar: Component;

  imgAvatar: Component;

  formAvatar: Component;

  nameAvatar: Component;

  buttonSaveName: Component;

  nameWrapper: Component;

  exit: Component;

  avatarContent: Component;

  statistic: Component;

  gamesAudiocall: GamesStatistic;

  gamesSprint: GamesStatistic;

  wordsStatistic: WordsStatistic;

  charts: Component;

  graphNewWords: Graph;

  graphLearnedWords: Graph;

  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['statistic-wrapper']);
    this.titleStatistic = new Component(this.root, 'h2', [], 'Статистика');

    this.avatarStatisticsBlock = new Component(this.root, 'div', ['avatar-statistics-block']);
    this.avatar = new Component(this.avatarStatisticsBlock.root, 'div', ['avatar-wrapper']);
    this.avatarContent = new Component(this.avatar.root, 'div', ['avatar-content']);
    this.imgAvatar = new Component(this.avatarContent.root, 'img', [], null, 'src', 'assets/icon/savanna.png');

    this.nameWrapper = new Component(this.avatarContent.root, 'div', ['avatar-name']);
    this.formAvatar = new Component(this.nameWrapper.root, 'form');
    this.nameAvatar = new Component(this.formAvatar.root, 'input', [], null, 'placeholder', 'Имя');
    this.buttonSaveName = new Component(this.nameWrapper.root, 'button', [], 'Сохранить');
    this.exit = new Component(this.avatarContent.root, 'a', [], 'Выйти из аккаунта', 'href', '');

    this.statistic = new Component(this.avatarStatisticsBlock.root, 'div', ['statistics']);

    this.gamesAudiocall = new GamesStatistic(this.statistic.root, 'Аудиовызов', EGames.audioCall);

    this.gamesSprint = new GamesStatistic(this.statistic.root, 'Спринт', EGames.sprint);

    this.wordsStatistic = new WordsStatistic(this.statistic.root);

    this.charts = new Component(this.root, 'div', ['charts-block']);

    this.graphNewWords = new Graph(this.charts.root, services);
    this.graphNewWords.title.root.innerText = 'Динамика появления новых слов';
    this.graphNewWords.myChart.data.datasets[0].label = 'новых словов';

    this.graphLearnedWords = new Graph(this.charts.root, services);
    this.graphLearnedWords.title.root.innerText = 'Динамика изучения слов';
    this.graphLearnedWords.myChart.data.datasets[0].label = 'изученных слов';

    this.exit.root.onclick = () => this.services.lang.userLogout();

    this.buttonSaveName.root.onclick = () => {
      const nameUser = (this.nameAvatar.root as HTMLInputElement).value;
      this.services.lang.updatePropertiesUser(nameUser);
    };

    this.services.lang.addListener('updateName', nameUser => {
      (this.nameAvatar.root as HTMLInputElement).value = nameUser as string;
    });

    this.services.lang.updateStatisticPage();

    this.getUpdateCharts();

    window.addEventListener('hashchange', () => {
      if (document.location.hash === '#statistic') {
        this.getUpdateCharts();
      }
    });
  }

  getUpdateCharts(): void {
    this.services.lang.getStatisticDataChart().then(response => {
      if (response) {
        const labels = [] as Date[];
        const dataNewWords = [] as number[];
        const dataLearnedWords = [] as number[];
        response.optional.data.dataPerDay.forEach(({ date, newWords, learnedWords }) => {
          labels.push(new Date(`${date} 00:00`));
          dataNewWords.push(newWords);
          dataLearnedWords.push(learnedWords);
        });

        this.graphNewWords.myChart.data.labels = labels;
        this.graphNewWords.myChart.data.datasets[0].data = dataNewWords;
        this.graphNewWords.myChart.update();

        this.graphLearnedWords.myChart.data.labels = labels;
        this.graphLearnedWords.myChart.data.datasets[0].data = dataLearnedWords;
        this.graphLearnedWords.myChart.update();
      }
    });
  }

  render(): void {
    super.render();
    this.wordsStatistic.getStat();
  }
}
