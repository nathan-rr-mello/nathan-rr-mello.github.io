


async function mergeSort(array){

    const bars = document.querySelectorAll(".bar");
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const time = 1000/(array.length * Math.log2(array.length))
    
    //uses start index as parameter to know which bars to interact
    async function mergeDivide(arr, start = 0){
        if(arr.length == 1){
            return arr;
        }

        const half = Math.floor(arr.length/2);
        const firstHalf = await mergeDivide(arr.slice(0, half), start);
        const secondHalf = await mergeDivide(arr.slice(half), start + half);

        return await mergeTogether(firstHalf, secondHalf, start);
    }

    async function mergeTogether(firstHalf, secondHalf, start){

        async function toggleClass(index){
            //bars[index].classList.add("selected", "bigger");
            bars[index].classList.add("selected");
            await sleep(time);
            bars[index].classList.remove("selected", "bigger");
        }

        let mergedArray = [];
        let i = 0, j = 0;
        while(i < firstHalf.length && j < secondHalf.length){
            bars[start + i].classList.add("selected");
            bars[start + firstHalf.length + j].classList.add("selected");
            await sleep(time);
            if(firstHalf[i] < secondHalf[j]){
                mergedArray.push(firstHalf[i]);
                await toggleClass(start + i);
                bars[start + firstHalf.length + j].classList.remove("selected");
                i++;
            }else{
                mergedArray.push(secondHalf[j]);
                await toggleClass(start + firstHalf.length + j);
                bars[start + i].classList.remove("selected");
                j++
            }
        }
        
        while(i < firstHalf.length){
            mergedArray.push(firstHalf[i]);
            await toggleClass(start + i);
            i++;
        }
        
        while(j < secondHalf.length){
            mergedArray.push(secondHalf[j]);
            await toggleClass(start + firstHalf.length + j);
            j++;
        }
        
        for(let k = 0; k < mergedArray.length; k++){
            bars[start + k].style.height = `${mergedArray[k]}%`;
            array[start + k] = mergedArray[k];
            if(mergedArray.length == array.length){
                bars[k].classList.add("sorted");
                await sleep(time)
            }
            await toggleClass(start + k);
        }

        return mergedArray;
    }

    await mergeDivide(array);
}



