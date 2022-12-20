
export const COMMON_COND = {
    // * Check _success class in all form controllers
    controllerClassCheck: (nodeList) => {
        let nodeArr, bool;
        Array.isArray(nodeList) ? nodeArr = nodeList : nodeArr = Array.from(nodeList);

        nodeArr.every((item) => item.parentElement.classList.contains("_success")) ? bool = true : bool = false;
        return bool;
    },
    // * Check the existence of form elements
    formElemCheck: (nodeList) => {
        let nodeArr, bool;
        Array.isArray(nodeList) ? nodeArr = nodeList : nodeArr = Array.from(nodeList);

        for (const item of nodeArr) {
            item != "undefined" || item != "null" ? bool = true : bool = false;
            return bool;
        }
    },
}

export const CHECK_LIST_VAL = {
    // * Checkers for currencies values (before convertation in currency-swither.js)
    checkCurInp: (nodeList) => {
        let bool;
        for (const item of nodeList) {
            item.value != "" && !Number.isNaN(+item.value) ? bool = true : bool = false;
            return bool;
        }
    },
    checkCurResult: (nodeList, mask) => {
        let bool;
        for (const item of nodeList) {
            item.textContent != mask ? bool = true : bool = false;
        }
        return bool;
    },
    checkCurTr: () => {
        return true;
    },
}