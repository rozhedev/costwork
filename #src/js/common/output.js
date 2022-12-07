
export function outputResult(resultObj, outputObj) {
    let resultArr, outputArr;
    Array.isArray(resultObj) ? resultArr = resultObj : resultArr = Object.values(resultObj);
    Array.isArray(outputObj) ? outputArr = outputObj : outputArr = Object.values(outputObj);
    
    for (let i = 0; i < outputArr.length; i++) {
        outputArr[i].textContent = resultArr[i];
    }
}

export function checkScreenWidth(messageBlock, width) {
    if (messageBlock && document.documentElement.clientWidth < width) {
        messageBlock.classList.add("_active");
    }
}
