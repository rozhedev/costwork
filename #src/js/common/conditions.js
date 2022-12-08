
export const COMMON_COND = {
    // * Check _success class in all form controllers
    controllerClassCheck: function (nodeList) {
        let nodeArr, bool;
        Array.isArray(nodeList) ? nodeArr = nodeList : nodeArr = Array.from(nodeList);

        nodeArr.every((item) => item.parentElement.classList.contains("_success")) ? bool = true : bool = false;
        return bool;
    },
    // * Check the existence of form elements
    formElemCheck: function (nodeList) {
        let nodeArr, bool;
        Array.isArray(nodeList) ? nodeArr = nodeList : nodeArr = Array.from(nodeList);

        for (const item of nodeArr) {
            item != "undefined" || item != "null" ? bool = true : bool = false;
            return bool;
        }
    }
}