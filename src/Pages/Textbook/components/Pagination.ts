import { Component } from "../../../Abstract/component";

export class Pagination extends Component {
    categories: Component[] = [];
    catWrapper: Component;
    pagesWrapper: Component;
    currentCategory = 0;
    currentPage = 0;
    pageNumber: Component;
    
    changeCategory: (data: {page: number, group: number, glossary?: boolean | undefined}) => void = () => {};
    changeBackg:  (color: string) => void = () => {};
    emitGame: (type: string, cat: number, page: number) => void = () => {};

    constructor(parent: HTMLElement) {
        super(parent, 'div', ['pagination-wrapper']);
        this.catWrapper= new Component(this.root, 'div', ['cat-wrapper']);
        this.pagesWrapper= new Component(this.root, 'div', ['pages-wrapper']);
        this.pageNumber = new Component(this.pagesWrapper.root, 'div', ['page-number'], (this.currentPage + 1).toString());
        this.pageNumber.remove();
        this.createCategories();
        this.createPageControl(); 

    }

    private createCategories() {
        const trening = new Component(this.catWrapper.root, 'div', ['trening']);
        const label = new Component(trening.root, 'label', [], null, 'for', 'tren');
        const selectTrening = new Component(label.root, 'select', [], null, 'name', 'tren');

        const nameSelect = new Component(selectTrening.root, 'option', [], 'Тренировка', 'disabled', '');
        nameSelect.root.setAttribute('selected', '');
        const optionAudioCall = new Component(selectTrening.root, 'option', [], 'Аудиовызов', 'value', 'audiocall');
        const optionSprint = new Component(selectTrening.root, 'option', [], 'Спринт', 'value', 'sprint'); 
        
        selectTrening.root.onchange = (e) => {
            const currentGame = (e.target as HTMLSelectElement).value;
            document.location = '#' + currentGame;
            console.log(e);
            this.emitGame(currentGame, this.currentCategory, this.currentPage);
        };

        const names = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Сложные слова'];
        const backgrColor = ['rgb(237 202 163)', 'rgb(115 177 115)', 'rgb(125 125 167)', 'rgb(225 225 138)', 'rgb(149 110 130)', 'rgb(249 130 130)', 'rgb(114 72 114)'];
        this.categories = names.map((cat, i) => { 
            const category = new Component(this.catWrapper.root, 'div', ['category' + i], cat);
            
            category.root.onclick = () => {
                this.currentCategory = names.indexOf(category.root.textContent!);
                this.currentPage = 0;
                this.pageNumber.root.innerHTML = (this.currentPage + 1).toString();
                if (cat != 'Сложные слова') this.changeCategory({page: this.currentPage, group: this.currentCategory});

                this.categories.forEach(el => { 
                    el.root.classList.remove('active-link');
                });
                category.root.classList.add('active-link'); 

                if (cat == 'Сложные слова') {
                    this.changeCategory({page: this.currentPage, group: this.currentCategory, glossary: true});
                }                 
                
                this.changeBackg(backgrColor[this.currentCategory]);
            }
                        
            if (cat == 'Сложные слова') category.root.remove();
            return category
        });
        }

    private createPageControl() {
        const leftRow = new Component(this.pagesWrapper.root, 'div', ['left-row'], '🡄 ');
        this.pageNumber.render();
        const rightRow = new Component(this.pagesWrapper.root, 'div', ['right-row'], ' 🡆');

        leftRow.root.onclick = () => {
            if (this.currentPage == 0) return;
            this.currentPage -= 1;
            this.changeCategory({page: this.currentPage, group: this.currentCategory});
            this.pageNumber.root.innerHTML = (this.currentPage + 1).toString()
        };

        rightRow.root.onclick = () => {
            if (this.currentPage == 29) return;
            this.currentPage += 1;
            this.changeCategory({page: this.currentPage, group: this.currentCategory});
            this.pageNumber.root.innerHTML = (this.currentPage + 1).toString()
        }
      }
    
    addRemoveGlossary(add = true) {
        const glossary = this.categories.find(el => el.root.textContent == 'Сложные слова');
        if (add) {
            glossary?.render() 
        } else glossary?.remove()
    }
}