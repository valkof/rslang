import { Component } from "../../../Abstract/component";
import { TServices } from "../../../Interfaces/Types";

export class AudioCallGame extends Component {
  
  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['audiocall__game']);

    const divGame = new Component(this.root, 'div', ['game__process']);
    
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

    const divAudio = new Component(divGame.root, 'div', ['process__audio']);
    const spanAudio = new Component(divAudio.root, 'span', ['audio__sound']);
    this.services.audioGame.addListener('audio', (sound) => {
      const audio = new Audio(sound as string);
      audio.play();
      spanAudio.root.onclick = () => audio.play();
    })

    const divVersions = new Component(divGame.root, 'div', ['process_versions']);
    [0, 1, 2, 3, 4].forEach(el => {
      const button = new Component(divVersions.root, 'button', ['button_version']);
      this.services.audioGame.addListener('vesrsion', (words) => {
        const word = (words as string[])[el];
        button.root.innerText = word;
        button.root.onclick = () => this.services.audioGame.vereficationStageGame(word);
      })
    })
    
    this.services.audioGame.addListener('audioCallGame', (stage) => {
      if (stage === 'start') {
        this.render();
      } else {
        this.remove();
      }
    })
  }
}