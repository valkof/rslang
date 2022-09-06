import { Component } from '../../../Abstract/component';
import { EGames } from '../../../Interfaces/Types';
import APIService from '../../../Services/APIService';
import { createDate, validateNum } from '../../../utils';

export class GamesStatistic extends Component {
  game: EGames;

  numberPercent: Component;

  rightAnswersPercent: Component;

  bestGameCount: Component;

  constructor(parent: HTMLElement, title: string, game: EGames) {
    super(parent, 'div', ['games-statistic-wrapper']);

    this.game = game;

    new Component(this.root, 'h3', [], title);

    const statistiFromGames = new Component(this.root, 'div', ['statistic-games']);
    const learnedWords = new Component(statistiFromGames.root, 'div', ['learned-words']);
    const countWords = new Component(learnedWords.root, 'div', ['count-words']);
    new Component(countWords.root, 'p', [], 'Количество новых слов');
    this.numberPercent = new Component(countWords.root, 'p', [], '0');

    const rightAnswers = new Component(statistiFromGames.root, 'div', ['right-answers']);
    const percetnrigrhtAnswers = new Component(rightAnswers.root, 'div', ['percent-right-ancwers']);
    new Component(percetnrigrhtAnswers.root, 'p', [], 'Процент правильных ответов');
    this.rightAnswersPercent = new Component(percetnrigrhtAnswers.root, 'p', [], ` %`);

    const bestGameBlock = new Component(statistiFromGames.root, 'div', ['best-game-block']);
    const bestGame = new Component(bestGameBlock.root, 'div', ['best-game']);
    new Component(bestGame.root, 'p', [], 'Лучшая игра');
    this.bestGameCount = new Component(bestGame.root, 'p', [], '0');

    this.getStatistic();

    window.addEventListener('hashchange', () => {
      if (document.location.hash === '#statistic') this.getStatistic();
    });
  }

  private async getStatistic() {
    const stat = await APIService.getUserSetting();
    if (stat) {
      if (stat.data.optional.date === createDate()) {
        const percent =
          stat.data.optional[this.game].answersCount === 0
            ? 0
            : Math.floor(
              (stat.data.optional[this.game].correctAnswers / stat.data.optional[this.game].answersCount) * 100,
            );
        this.numberPercent!.root.textContent = validateNum(stat.data.optional[this.game].newWords);
        this.rightAnswersPercent!.root.textContent = `${validateNum(percent)} %`;
        this.bestGameCount!.root.textContent = validateNum(stat.data.optional[this.game].streak);
      } else {
        this.zeroStat();
      }
    } else this.zeroStat();
  }

  private zeroStat() {
    this.numberPercent!.root.textContent = '0';
    this.rightAnswersPercent!.root.textContent = '0';
    this.bestGameCount!.root.textContent = '0';
  }
}
