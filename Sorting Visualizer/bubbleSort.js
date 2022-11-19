async function bubbleSort(array){

    const bars = document.querySelectorAll(".bar");
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const time = 1000/Math.pow(array.length, 2);

    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array.length - 1 - i; j++){
            bars[j].classList.add("selected");
            bars[j+1].classList.add("selected");
            await sleep(time);
            if(array[j] > array[j+1]){
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
                bars[j].classList.add("bigger");
                await sleep(time);
                bars[j].style.height = bars[j+1].style.height;
                bars[j+1].style.height = `${temp}%`;
            }else{
                bars[j+1].classList.add("bigger");
            }
            await sleep(time);
            bars[j].classList.remove("selected", "bigger");
            bars[j+1].classList.remove("selected", "bigger");
        }
        bars[array.length - 1 - i].classList.add("sorted");
    }
}