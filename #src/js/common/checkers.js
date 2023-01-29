// * Check _success class in all form controllers
export function controllerClassCheck(nodeList) {
    let nodeArr, bool;
    Array.isArray(nodeList) ? nodeArr = nodeList : nodeArr = Array.from(nodeList);

    nodeArr.every((item) => item.parentElement.classList.contains("_success")) ? bool = true : bool = false;
    return bool;
}

// * Check the existence of form elements
export function formElemCheck(nodeList) {
    let nodeArr, bool;
    Array.isArray(nodeList) ? nodeArr = nodeList : nodeArr = Array.from(nodeList);

    for (const item of nodeArr) {
        item != "undefined" || item != "null" ? bool = true : bool = false;
        return bool;
    }
}

// * Checkers for currencies values (before convertation in currency-swither.js)
export const CHECK_LIST_VAL = {
    curInp: (nodeList) => {
        let bool;
        for (const item of nodeList) {
            item.value != "" && !Number.isNaN(+item.value) ? bool = true : bool = false;
            return bool;
        }
    },
    curResult: (nodeList, mask) => {
        let bool;
        for (const item of nodeList) {
            item.textContent != mask ? bool = true : bool = false;
        }
        return bool;
    },
    curTr: () => {
        return true;
    },
}

// * Check internet connection
export function checkConnect(apiLink, popup) {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", apiLink, true);
    xhr.onload = () => {
        if (xhr.status == 200 && xhr.status < 300) {
            popup.classList.remove("_active");
            return true;
        }
    }
    xhr.onerror = () => {
        popup.classList.add("_active");
        return false;
    }
    xhr.send();
}