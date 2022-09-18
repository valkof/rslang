import { Component } from "../../../Abstract/component";
import { Birds } from "../../../Components/Birds/Birds";
import { TServices } from "../../../Interfaces/Types";

export class AudioCallGame extends Component {

  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['audiocall__game']);

    const divGame = new Component(this.root, 'div', ['game__process']);

    const divCriteria = new Component(divGame.root, 'div', ['process__criteria']);

    const divTime = new Component(divCriteria.root, 'div', ['process__time']);
    new Component(divTime.root, 'span', ['time-text'], 'Время:');
    const spanTime = new Component(divTime.root, 'span', ['time'], '60');
    this.services.audioGame.addListener('time', (time) => {
      spanTime.root.innerText = time as string;
    });

    const divScore = new Component(divCriteria.root, 'div', ['process__score']);
    const spanScore = new Component(divScore.root, 'span', ['score'], '0');
    new Component(divScore.root, 'span', ['score-text'], 'Очков');
    this.services.audioGame.addListener('score', (score) => {
      spanScore.root.innerText = score as string;
    });

    const divBirds = new Birds(divGame.root, 'progress');
    this.services.audioGame.addListener('birds', (multiBonus) => divBirds.show(multiBonus as number - 1));


    const divBonus = new Component(divGame.root, 'div', ['process__bonus']);
    [1, 2, 3].forEach(el => {
      const span = new Component(divBonus.root, 'span', ['bonus__score']);
      this.services.audioGame.addListener('bonus', (countBonus) => {
        if (countBonus as number >= el) {
          span.root.classList.add('fill_backgroud_bonus');
        } else {
          span.root.classList.remove('fill_backgroud_bonus');
        }
      })
    })

    const divAudio = new Component(divGame.root, 'div', ['process__audio']);
    const spanAudio = new Component(divAudio.root, 'span', ['audio__sound']);
    this.services.audioGame.addListener('audio', (sound) => {
      const audio = new Audio(sound as string);
      audio.play();
      spanAudio.root.onclick = () => audio.play();
    })


    const divStatus = new Component(divGame.root, 'div', ['process__status']);
    [1, 2, 3, 4, 5].forEach(el => {
      const span = new Component(divStatus.root, 'span', ['status__error']);
      this.services.audioGame.addListener('status', (countError) => {
        if (countError as number >= el) {
          span.root.classList.add('fill_backgroud');
        } else {
          span.root.classList.remove('fill_backgroud');
        }
      })
    })

    const divVersions = new Component(divGame.root, 'div', ['process_versions']);
    [0, 1, 2, 3, 4].forEach(el => {
      const divButton = new Component(divVersions.root, 'div', ['container_version']);
      const button = new Component(divButton.root, 'button', ['button_version']);
      new Component(divButton.root, 'span', ['span_version'], `${el + 1}`);
      
      this.services.audioGame.addListener('vesrsion', (words) => {
        const word = (words as string[])[el];
        button.root.innerText = word;
        button.root.onclick = () => this.services.audioGame.vereficationStageGame(word);
      });
      
      document.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.code === `Digit${el + 1}` && document.location.hash === '#audiocall'
        && this.services.audioGame.getIsStartGame()) button.root.click();
      });
      
      this.services.audioGame.addListener('result', () => {
        button.root.onclick = null;
      });
    })
    
    this.services.audioGame.addListener('audioCallGame', (stage) => {
      if (stage === 'start') {
        spanTime.root.innerText = '60';
        spanScore.root.innerText = '0';
        divBirds.show(0);
        this.render();
      } else {
        this.remove();
      }
    })
  }
}