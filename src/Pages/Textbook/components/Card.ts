import { Component } from "../../../Abstract/component";
import { HOST } from "../../../config";
import { TWord } from "../../../Interfaces/Types";
import { HardWord } from "./Hard-word";


export class Card extends Component {
    word: Component;
    wordTranscript: Component;
    wordRus: Component;
    audio: Component;
    wordExample: Component;
    exampleTranslate: Component;
    wordBlock: Component;
    wordDiv: Component;
    exampleBlock: Component;
    wordBlockRgba:Component;
    wordTitle: Component;
    hardWord: HardWord;

    constructor(parent: HTMLElement, public data: TWord) {
        super(parent, 'div', ['card']);
        //console.log(data)
               
        this.wordBlock = new Component(this.root, 'div', ['word-block']);
        this.wordBlock.root.style.backgroundImage = `url(${HOST}/${this.data?.image})`;
        
        this.wordBlockRgba = new Component(this.wordBlock.root, 'div', ['word-block-rgba']);
        this.wordTitle = new Component(this.wordBlockRgba.root, 'div', ['word-title'])
        this.word = new Component(this.wordTitle.root, 'h2', [], data.word);
        this.wordDiv = new Component(this.wordBlockRgba.root, 'div', ['word']);
        this.wordTranscript = new Component(this.wordDiv.root, 'p', [], data.wordTranslate);
        this.wordRus = new Component(this.wordDiv.root, 'p', [], data.transcription);
        
        this.audio = new Component(this.wordDiv.root, 'div', ['audio'], '🔈');
        this.audio.root.onclick = () => this.playAudio();

        this.exampleBlock = new Component (this.root, 'div', ['example-block'])
        this.wordExample = new Component(this.exampleBlock.root, 'div', ['text-example']);
        new Component(this.wordExample.root, 'p', ['text-example-one'], data.textMeaning);
        new Component(this.wordExample.root, 'p', ['text-example-two'], data.textExample);
        
        this.exampleTranslate = new Component(this.exampleBlock.root, 'div', ['example-translate']);
        new Component(this.exampleTranslate.root, 'p', ['example-translate-one'], data.textMeaningTranslate);
        new Component(this.exampleTranslate.root, 'p', ['example-translate-two'], data.textExampleTranslate);
       
        this.hardWord = new HardWord(this.root, data);
       
    }

    playAudio() {
        const tracks = [this.data.audio, this.data.audioMeaning, this.data.audioExample].map(audio => `${HOST}/${audio}`);
        const audio = new Audio();
        let current = 0;
        audio.src = tracks[current];
        audio.play();

        audio.onended = () => {
            current++;
            if (current >= tracks.length) return;
            audio.src = tracks[current];
            audio.play();
        }
    }

    removeInputs() {
        this.hardWord.remove()
    }

    renderInputs() {
        this.hardWord.render();
    }
    
}