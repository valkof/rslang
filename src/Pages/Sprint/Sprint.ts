import { Component } from '../../Abstract/component';
import { TServices } from '../../Interfaces/Types';
import { TDifficulty } from '../../Interfaces/Types';
import SprintService from '../../Services/SprintService';
import { DifficultySelector } from './../../Components/DifficultySelector';

enum ESprintEvents  {
  timerTick = 'timerTick',
}

export class Sprint extends Component {
  private service: SprintService;

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

  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['sprint-wrapper']);
    this.service = new SprintService();
    this.dificulty = new DifficultySelector(
      this.root,
      'sprint',
      'Спринт',
      'Тренирует навык быстрого перевода с английского языка на русский. Вам нужно выбрать соответствует ли перевод предложенному слову.',
      this.startGame.bind(this),
    );
    //this.game.remove();
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

    this.service.addListener(ESprintEvents.timerTick, this.setTimer.bind(this))
  }

  startGame(i: number): void {
    const dificulty = i < 7 && i >= 0 ? i : 0;
    this.dificulty.remove();
    this.game.render();
    console.log(this.service.generateWords(dificulty as TDifficulty));
  }

  setTimer(time: string): void {
    this.timerTime.root.textContent = time;
  }
}
