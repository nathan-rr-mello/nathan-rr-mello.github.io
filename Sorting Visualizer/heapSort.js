async function heapSort(array){

    const bars = document.querySelectorAll(".bar");
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    let length = array.length;
    const time = 1000/ (array.length * Math.log2(array.length))

    async function heapify(index){
        const left = 2*index + 1;
        const right = 2*index + 2;

        bars[index].classList.add("selected");
        if(left < length) bars[left].classList.add("selected");
        if(right < length) bars[right].classList.add("selected");
        await sleep(time)

        let max = index;
        if(left < length && array[left] > array[index]){
            max = left;
        }

        if(right < length && array[right] > array[max]){
            max = right;
        }

        bars[max].classList.add("bigger");
        await sleep(time)

        if(max !== index){
            let temp = array[index];
            array[index] = array[max];
            array[max] = temp;
            bars[index].style.height = bars[max].style.height;
            bars[max].style.height = `${temp}%`;
            await sleep(time)
            bars[index].classList.remove("selected", "bigger");
            if(left < length) bars[left].classList.remove("selected", "bigger");
            if(right < length) bars[right].classList.remove("selected", "bigger");
            await heapify(max);
        }
        bars[index].classList.remove("selected", "bigger");
        if(left < length) bars[left].classList.remove("selected", "bigger");
        if(right < length) bars[right].classList.remove("selected", "bigger");
    }

    for(let i = Math.floor(array.length/2); i >= 0; i--){
        await heapify(i);
    }

    for(let i = array.length - 1; i > 0; i--){
        let temp = array[0];
        array[0] = array[i];
        array[i] = temp;
        bars[0].style.height = bars[i].style.height;
        bars[i].style.height = `${temp}%`;
        length--;
        bars[i].classList.add("sorted");
        await sleep(time)
        await heapify(0);
    }
    bars[0].classList.add("sorted");
}
