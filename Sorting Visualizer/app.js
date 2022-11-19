const sortAlgoOptions = document.querySelectorAll("#sort-algo-option");
const arraySizeOptions = document.querySelectorAll("#array-size-option");
const barSection = document.getElementById("bar-container");
const algoHeader = document.getElementById("algo-header");
const sizeHeader = document.getElementById("size-header");
const randBtn = document.getElementById("randomize-btn");
const sortBtn = document.getElementById("sort-button");
const bottomRandBtn = document.getElementById("bottom-rand-button");
const bottomSortBtn = document.getElementById("bottom-sort-button");

const sizes = {
    small: 10,
    medium: 20,
    large: 100,
    xl: 300
}

const algos = {
    bubble: bubbleSort,
    merge: mergeSort,
    quick: quickSort,
    heap: heapSort
}

let darkmode = false;
let array = [];
let size = sizes["small"];
let algo = bubbleSort;

function createRandomArray(){
    let tempArray = [];
    for(let i = 0; i < size; i++){
        tempArray[i] = (Math.random() * 94) + 5;
    }
    array = tempArray;
}

function clearDisplay(){
    while (barSection.firstChild) {
        barSection.removeChild(barSection.firstChild);
    }
}

function updateBarsHeight(){
    const bars = document.querySelectorAll(".bar")
    for(let i = 0; i < size; i++){
        bars[i].style.height = `${array[i]}%`;
        bars[i].classList.remove("sorted");
    }
}

function updateDisplay(){
    createRandomArray();
    clearDisplay();
    for(let i = 0; i < size; i++){
        const bar = document.createElement("div");
        bar.classList.add("bar");
        if(darkmode) bar.classList.add("dark");
        bar.style.width = `${75/size}%`;
        barSection.appendChild(bar);
    }
    updateBarsHeight();
}

const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl))

function toggleButtons(time){
    //const collapseElementList = document.querySelectorAll('.collapse')
    //const collapseList = [...collapseElementList].map(collapseEl => new bootstrap.Collapse(collapseEl))

    sortBtn.disabled = !sortBtn.disabled;
    randBtn.disabled = !randBtn.disabled;
    bottomRandBtn.disabled = !bottomRandBtn.disabled;
    bottomSortBtn.disabled = !bottomSortBtn.disabled;
    algoHeader.classList.toggle("disabled");
    sizeHeader.classList.toggle("disabled");
}

window.addEventListener("DOMContentLoaded", () => {
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        darkmodeBtn.click();
    }
    updateDisplay();
});

for(let option of sortAlgoOptions){
    option.addEventListener("click", () => {
        algo = algos[option.getAttribute("data-option")];
        algoHeader.innerText = option.innerText
        for(let otherOptions of sortAlgoOptions){
            otherOptions.classList.remove("disabled");
        }
        option.classList.add("disabled");
    });
}

for(let option of arraySizeOptions){
    option.addEventListener("click", () => {
        size = sizes[option.getAttribute("data-option")];
        sizeHeader.innerText = option.innerText
        for(let otherOptions of arraySizeOptions){
            otherOptions.classList.remove("disabled");
        }
        option.classList.add("disabled");
        updateDisplay();
    });
}

function randBtnFunc(){
    createRandomArray(); 
    updateBarsHeight();
}

function sortBtnFunc(){
    toggleButtons("start"); 
    algo(array).then(() => {
        toggleButtons("end")
    })
}

randBtn.addEventListener("click", randBtnFunc);
sortBtn.addEventListener("click", () => {
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
    const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl))
    dropdownList.forEach(x => x.hide())
    sortBtnFunc();
})
bottomRandBtn.addEventListener("click", randBtnFunc)
bottomSortBtn.addEventListener("click", () => {
    const collapseElementList = document.querySelectorAll('.collapse')
    const collapseList = [...collapseElementList].map(collapseEl => new bootstrap.Collapse(collapseEl))
    sortBtnFunc();
    collapseList.forEach(x => x.hide())
})

const darkmodeBtn = document.getElementById("dark-mode-btn");
const navbar = document.querySelector("nav");
const dropdowns = document.querySelectorAll(".dropdown-menu");
const moonSvg = document.getElementById("dark-svg-moon")
const sunSvg = document.getElementById("light-svg-sun")

darkmodeBtn.addEventListener("click", () => {

    darkmode = !darkmode;
    darkmodeBtn.classList.toggle("dark")
    bottomRandBtn.classList.toggle("dark")
    bottomSortBtn.classList.toggle("dark")
    moonSvg.classList.toggle("d-none")
    sunSvg.classList.toggle("d-none")
    document.body.classList.toggle("bg-dark");
    navbar.classList.toggle("navbar-dark")
    navbar.classList.toggle("bg-dark")
    dropdowns.forEach(x => x.classList.toggle("dropdown-menu-dark"));
    document.querySelectorAll(".bar").forEach(x=>x.classList.toggle("dark"));
})

