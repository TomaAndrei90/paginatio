const pagination = {
  pages: null,
  currentPage: null,
  itemsPerPage: 5,
  buttonsPerPage: 5,
  pageElement: null,
  paginationElement: null,
  pageData: null, 
  init(pageData, pageElementId, paginationElementId) {
    this.currentPage = 1;
    this.pageData = pageData;
    this.pages = Math.ceil(this.pageData.length / this.itemsPerPage);
    this.pageElement = document.getElementById(pageElementId); 
    this.paginationElement = document.getElementById(paginationElementId); 

    this.buildPagination();
  },
  buildData(data, wrapper) {
    while (wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);
  
    data.forEach(element => {
      const item = document.createElement('div');
      item.classList.add('pageItem');
      item.innerHTML = `
          <div class="pageItem__name">Name: ${element.first_name} ${element.last_name}</div>
          <div class="pageItem__rank">Rank: ${element.rank}</div>
      `;
  
      wrapper.appendChild(item);
    });
  },
  buildPagination() {
    const start = this.itemsPerPage * (this.currentPage - 1);
    const end = start + this.itemsPerPage;
    const dataToDisplay = this.pageData.slice(start, end);
  
    this.buildData(dataToDisplay, this.pageElement);
    this.buildButtons(this.paginationElement);
  },
  buildButtons(wrapper) {
    while (wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);
    let start;
    let end;
    let needsFirstLast = false;
  
    if (this.pages < this.buttonsPerPage) {
      start = 1;
      end = this.pages;
    } else {
      needsFirstLast = true;
      switch(true) {
        case (this.currentPage <= 2):
          start = 1;
          end = this.buttonsPerPage;
          break;
        case (this.currentPage > this.pages - 2):
          start = this.pages - 5;
          end = this.pages;
          break;
        default: 
          start = this.currentPage - 2;
          end = this.currentPage + 2;
      }
    }
  
    for (let i = start; i <= end; i++) {
      const pageButton = document.createElement('button');
      pageButton.innerHTML = `${i}`;
      pageButton.classList.add('pageButton');
      if (i === this.currentPage) {
        pageButton.classList.add('pageButton--active');
      }
      wrapper.appendChild(pageButton);
    }
  
    if (needsFirstLast) {
      const firstButton = document.createElement('button');
      firstButton.innerHTML = 'First';
      firstButton.classList.add('pageButton', 'pageButtonFirst');
      if (this.currentPage === 1) {
        firstButton.setAttribute("disabled", "true");
      }
      wrapper.prepend(firstButton);
  
      const lastButton = document.createElement('button');
      lastButton.innerHTML = 'Last';
      lastButton.classList.add('pageButton', 'pageButtonLast');
      if (this.currentPage === this.pages) {
        lastButton.setAttribute("disabled", "true");
      }
      wrapper.append(lastButton);
    }
  
    const pageButtons = document.querySelectorAll('.pageButton');
    pageButtons.forEach(element => {
      element.addEventListener('click', (event) => {
        const buttonValue = event.target.innerText;
        if (buttonValue === 'First') {
          this.currentPage = 1;
        }
  
        if (buttonValue === 'Last') {
          this.currentPage = this.pages;
        }
  
        if(!isNaN(Number(event.target.innerText))) {
          this.currentPage = Number(event.target.innerText);
        }
  
        this.buildPagination();
      })
    });
  }
}

const smallDataBtn = document.querySelector('#js-setSmallData');
const largeDataBtn = document.querySelector('#js-setLargeData');

smallDataBtn.addEventListener('click', () => {
  pagination.init(smallDataSet, 'js-pageWrapper', 'js-paginationWrapper');
})

largeDataBtn.addEventListener('click', () => {
  pagination.init(largeDataSet, 'js-pageWrapper', 'js-paginationWrapper');
})


pagination.init(largeDataSet, 'js-pageWrapper', 'js-paginationWrapper');
