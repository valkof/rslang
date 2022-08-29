import { Component } from '../../../Abstract/component';

export class GamesStatistic extends Component {
 
  selectGame: Component;
 
  selectBtnAudioCall: Component;
 
  selectBtnSprint: Component;
 
  gameStatisticTitle: Component;
 
  statistiFromGames: Component;
 
  learnedWords: Component;
 
  countWords: Component;
 
  countTitle: Component;
 
  numberPercent: Component;
 
  rightAnswers: Component;
 
  percetnrigrhtAnswers: Component;
 
  rightAnswersTitle: Component;
 
  rightAnswersPercent: Component;
 
  bestGame: Component;
 
  bestGameBlock: Component;
 
  bestGameTitle: Component;
 
  bestGameCount: Component;
 
  constructor(parent: HTMLElement) {
    super(parent, 'div', ['games-statistic-wrapper']);
    this.gameStatisticTitle = new Component(this.root, 'h3', [], 'Статистика по мини-играм');
     
    this.statistiFromGames = new Component(this.root, 'div', ['statistic-games']);
    this.learnedWords = new Component(this.statistiFromGames.root, 'div', ['learned-words']);
    this.countWords = new Component(this.learnedWords.root, 'div', ['count-words']);
    this.countTitle = new Component(this.countWords.root, 'p', [], 'Количество новых слов');
    this.numberPercent = new Component(this.countWords.root, 'p', [], '');

    this.rightAnswers = new Component(this.statistiFromGames.root, 'div', ['right-answers']);
    this.percetnrigrhtAnswers = new Component(this.rightAnswers.root, 'div', ['percent-right-ancwers']);
    this.rightAnswersTitle = new Component(this.percetnrigrhtAnswers.root, 'p', [], 'Процент правильных ответов');
    this.rightAnswersPercent = new Component(this.percetnrigrhtAnswers.root, 'p', [], '%');

    this.bestGameBlock = new Component(this.statistiFromGames.root, 'div', ['best-game-block']);
    this.bestGame = new Component(this.bestGameBlock.root, 'div', ['best-game']);
    this.bestGameTitle = new Component(this.bestGame.root, 'p', [], 'Лучшая игра');
    this.bestGameCount = new Component(this.bestGame.root, 'p', [], '');

    this.selectGame = new Component(this.root, 'div', ['select-game']);
    this.selectBtnAudioCall = new Component(this.selectGame.root, 'button', ['select-audio-call'], 'Аудиовызов');
    this.selectBtnSprint = new Component(this.selectGame.root, 'button', ['select-sprint'], 'Спринт');
 }
}
