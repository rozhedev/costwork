
export function multNumPercent(num, percent) {
    return +(num * (percent / 100)).toFixed(2);
}

export function sumNodeListValues(inpList) {
    let inpArr = [...inpList];
    let result = 0;
    for (let inpItem of inpArr) {
        result += +inpItem.value;
    }
    return +result.toFixed(2);
}

export function multNodeListValues(inpList) {
    let inpArr = [...inpList];
    let result = 1;
    for (let inpItem of inpArr) {
        result *= +inpItem.value;
    }
    return +result.toFixed(2);
}

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
