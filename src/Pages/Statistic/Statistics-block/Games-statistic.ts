import { Component } from '../../../Abstract/component';

export class GamesStatistic extends Component {
 
    constructor(parent: HTMLElement) {
    super(parent, 'div', ['games-statistic-wrapper']);
    ['Статистика Спринт', 'Статистика Аудиовызов'].forEach(el => {
      let gameStatisticTitle = new Component(this.root, 'h3', [], el);
     
      let statistiFromGames = new Component(this.root, 'div', ['statistic-games']);
      let learnedWords = new Component(statistiFromGames.root, 'div', ['learned-words']);
      let countWords = new Component(learnedWords.root, 'div', ['count-words']);
      let countTitle = new Component(countWords.root, 'p', [], 'Количество новых слов');
      let numberPercent = new Component(countWords.root, 'p', [], '');
  
      let rightAnswers = new Component(statistiFromGames.root, 'div', ['right-answers']);
      let percetnrigrhtAnswers = new Component(rightAnswers.root, 'div', ['percent-right-ancwers']);
      let rightAnswersTitle = new Component(percetnrigrhtAnswers.root, 'p', [], 'Процент правильных ответов');
      let rightAnswersPercent = new Component(percetnrigrhtAnswers.root, 'p', [], '%');
  
      let bestGameBlock = new Component(statistiFromGames.root, 'div', ['best-game-block']);
      let bestGame = new Component(bestGameBlock.root, 'div', ['best-game']);
      let bestGameTitle = new Component(bestGame.root, 'p', [], 'Лучшая игра');
      let bestGameCount = new Component(bestGame.root, 'p', [], '');
    })
    

    
 }
}
