import { Component } from '../../Abstract/component';
import { TDifficulty, TServices } from '../../Interfaces/Types';
import { ESprintEvents } from '../../Services/SprintService';
import { DifficultySelector } from './../../Components/DifficultySelector';



export class Sprint extends Component {
  private service: TServices;

  private dificulty: Component;

  private game = new Component(this.root, 'div', ['sprint-game-wrapper']);

  private gameHeader = new Component(this.game.root, 'div', ['sprint-game__header']);

  private gameCenter = new Component(this.game.root, 'div', ['sprint-game__center']);

  private gameFooter = new Component(this.game.root, 'div', ['sprint-game__footer']);

  private timerContainer: Component;

  private timerText: Component;

  private timerTime: Component;

  private scoreContainer: Component;

  private scoreText: Component;

  private scoreValue: Component;

  private comboContainer: Component;

  word: Component;

  wordTranslane: Component;

  trueBtn: Component;

  falseBtn: Component;

  buttons: Component;


  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['sprint-wrapper']);
    this.service = services;
    this.dificulty = new DifficultySelector(
      this.root,
      'sprint',
      'Спринт',
      'Тренирует навык быстрого перевода с английского языка на русский. Вам нужно выбрать соответствует ли перевод предложенному слову.',
      this.startGameWithDificulty.bind(this),
    );

    this.timerContainer = new Component(this.gameHeader.root, 'div', ['sprint-game__timer-container']);
    this.timerText = new Component(this.timerContainer.root, 'h3', ['sprint-game__timer-container__text']);
    this.timerText.root.textContent = "Время: "
    this.timerTime = new Component(this.timerContainer.root, 'h3', ['sprint-game__timer-container__text']);
    this.timerTime.root.textContent = '60';
    this.scoreContainer = new Component(this.gameHeader.root, 'div', ['sprint-game__score-container']);
    this.scoreText = new Component(this.scoreContainer.root, 'h3', ['sprint-game__timer-container__text']);
    this.scoreText.root.textContent = "0"
    this.scoreValue = new Component(this.scoreContainer.root, 'h3', ['sprint-game__timer-container__text']);
    this.scoreValue.root.textContent = 'Очков';

    this.comboContainer = new Component(this.gameCenter.root, 'div', ['sprint-game__combo-container']);
    this.word = new Component(this.gameCenter.root, 'h3', ['sprint-game__word']);
    this.word.root.textContent = 'HELLO';
    this.wordTranslane = new Component(this.gameCenter.root, 'h3', ['sprint-game__translate']);
    this.wordTranslane.root.textContent = 'Привет';

    this.buttons =  new Component(this.gameFooter.root, 'div', ['sprint-game__button-container']);
    this.falseBtn = new Component(this.buttons.root, 'div', ['sprint-game__false-btn']);
    this.falseBtn.root.textContent = "Неверно"
    this.trueBtn = new Component(this.buttons.root, 'div', ['sprint-game__true-btn']);
    this.trueBtn.root.textContent = "Верно"

    this.game.remove();
    this.service.sprint.addListener(ESprintEvents.timerTick, this.setTimer.bind(this));
    this.service.sprint.addListener(ESprintEvents.score, this.setScore.bind(this));
    this.service.sprint.addListener(ESprintEvents.startGame, this.start.bind(this));
  }

  startGameWithDificulty(i: number): void {
    const dificultyLevel = i < 7 && i >= 0 ? i : 0;
    this.service.sprint.generateWords(dificultyLevel as TDifficulty);
    this.service.sprint.startGame();
    //const a = this.parent as HTMLElement;
    //a.requestFullscreen();
  }

  start() {
    this.dificulty.remove();
    this.game.render();
  }

  setTimer(time: string): void {
    this.timerTime.root.textContent = time;
  }

  setScore(score: string): void {
    this.scoreText.root.textContent = score;
  }
}
