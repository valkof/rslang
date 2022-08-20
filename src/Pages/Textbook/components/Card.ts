import { Component } from "../../../Abstract/component";
import { HOST } from "../../../config";
import { TWord } from "../../../Interfaces/Types";

export class Card extends Component {
    word: Component;
    wordTranscript: Component;
    wordRus: Component;
    audio: Component;
    wordExample: Component;
    exampleTranslate: Component;
    wordBlock: Component;

    constructor(parent: HTMLElement, private data: TWord ) {
        super(parent, 'div', ['card']);
               
        this.wordBlock = new Component(this.root, 'div', ['word-block']);
        this.wordBlock.root.style.backgroundImage = `url(${HOST}/${this.data.image})`;
        
        this.word = new Component(this.wordBlock.root, 'h2', [], data.word);
        this.wordTranscript = new Component(this.wordBlock.root, 'div', ['word'], data.wordTranslate);
        this.wordRus = new Component(this.wordTranscript.root, 'p', [], data.transcription);
        this.audio = new Component(this.wordTranscript.root, 'div', ['audio'], '🔈');
        this.audio.root.onclick = () => this.playAudio();

        this.wordExample = new Component(this.root, 'div', ['text-example']);
        new Component(this.wordExample.root, 'p', ['text-example-one'], data.textMeaning);
        new Component(this.wordExample.root, 'p', ['text-example-two'], data.textExample);
        

        this.exampleTranslate = new Component(this.root, 'div', ['example-translate']);
         new Component(this.exampleTranslate.root, 'p', ['example-translate-one'], data.textMeaningTranslate);
        new Component(this.exampleTranslate.root, 'p', ['example-translate-two'], data.textExampleTranslate);
       
    }

    playAudio() {
        const tracks = [this.data.audio, this.data.audioMeaning, this.data.audioExample].map(audio => `${HOST}/${audio}`);
        const audio = new Audio();
        let current = 0
        audio.src = tracks[current];
        audio.play()

        audio.onended = () => {
            current++;
            if (current >= tracks.length) return;
            audio.src = tracks[current];
            audio.play()
        }
    }
}