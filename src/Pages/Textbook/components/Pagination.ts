import { Component } from "../../../Abstract/component";

export class Pagination extends Component {
    categories: Component[] = [];
    catWrapper: Component;
    pagesWrapper: Component;
    currentCategory = 0;
    currentPage = 0;
    pageNumber: Component;
    changeCategory: (data: {page: number, group: number}) => void = () => {};

    constructor(parent: HTMLElement) {
        super(parent, 'div', ['pagination-wrapper']);
        this.catWrapper= new Component(this.root, 'div', ['cat-wrapper']);
        this.pagesWrapper= new Component(this.root, 'div', ['pages-wrapper']);
        this.pageNumber = new Component(this.pagesWrapper.root, 'div', ['page-number'], this.currentPage.toString());
        this.pageNumber.remove();
        this.createCategories();
        this.createPageControl(); 
    }

    private createCategories() {
        const names = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Словарь'];
        this.categories = names.map((cat, i) => { 
            const category = new Component(this.catWrapper.root, 'div', ['category' + i], cat);
            category.root.onclick = () => {
                this.currentCategory = names.indexOf(category.root.textContent!);
                this.currentPage = 0;
                this.pageNumber.root.innerHTML = this.currentPage.toString();
                this.changeCategory({page: this.currentPage, group: this.currentCategory});

                this.categories.forEach(el => { 
                    el.root.classList.remove('active-link')
                });
                category.root.classList.add('active-link'); 
            }        
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
            this.pageNumber.root.innerHTML = this.currentPage.toString()
        };

        rightRow.root.onclick = () => {
            if (this.currentPage == 30) return;
            this.currentPage += 1;
            this.changeCategory({page: this.currentPage, group: this.currentCategory});
            this.pageNumber.root.innerHTML = this.currentPage.toString()
        }
      }
}