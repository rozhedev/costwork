
export function outputResult(resultObj, outputObj) {
    let outputArr = Object.values(outputObj);
    let resultArr = Object.values(resultObj);

    for (let i = 0; i < outputArr.length; i++) {
        for (let k = 0; k < resultArr.length; k++) {
            if (i == k) {
                outputArr[i].textContent = resultArr[i];
            }
        }
    }
}

export function checkScreenWidth(messageBlock, width) {
    if (messageBlock && document.documentElement.clientWidth < width) {
        messageBlock.classList.add("_active");
    }
}
