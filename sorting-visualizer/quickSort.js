const sleep = ms => new Promise(r => setTimeout(r, ms));

function getPivot(array, start, end){

    const middle = Math.floor((start + end + 1)/2)
    const first = array[start]
    const second = array[middle]
    const third = array[end]

    if((first > second && first < third) || (first < second && first > third)){
        return start;
    }else if((second > first && second < third) || (second < first && second > third)){
        return middle
    }
    return end;
}

async function quickSort(array, left = 0, right = array.length - 1){
    const bars = document.querySelectorAll(".bar");
    const time = 2 + (3.5 * 1000/ (array.length * Math.log2(array.length)))
    //console.log(time)

    if(left > right){
        return;
    }

    //middle element index as pivot
    let pivotIndex = Math.floor((left + right + 1)/2);
    //let pivotIndex = getPivot(array, left, right);
    let pivot = array[pivotIndex];

    //left pointer
    let i = left

    //right pointer
    let j = right 

    while(i < j){
        bars[pivotIndex].classList.add("sorted")

        //move pointer to the right
        if(array[i] < pivot){
            i++;
        }

        //move pointer to the left
        if(array[j] > pivot){
            j--;
        }

        bars[i].classList.add("selected")
        bars[j].classList.add("selected")
        await sleep(time)
        bars[i].classList.remove("selected")
        bars[j].classList.remove("selected")

        //when both pointers find a corresponding value swap
        if(!(array[i] < pivot) && !(array[j] > pivot) && i < j){

            bars[i].classList.add("bigger")
            bars[j].classList.add("bigger") 

            await sleep(time);
            [array[i], array[j]] = [array[j], array[i]];
            [bars[i].style.height, bars[j].style.height] = [bars[j].style.height, bars[i].style.height]

            bars[i].classList.remove("bigger")
            bars[j].classList.remove("bigger")
 
            if(i == pivotIndex){
                bars[pivotIndex].classList.remove("sorted")
                pivotIndex = j
                i++;
            }else if(j == pivotIndex){
                bars[pivotIndex].classList.remove("sorted")
                pivotIndex = i
                j--;
            } else {
                i++;
                j--;
            }
        }
        bars[pivotIndex].classList.remove("sorted")
    }

    bars[pivotIndex].classList.add("sorted");
    await sleep(time)

    await quickSort(array, left, i-1);
    await quickSort(array, i+1, right);
}



