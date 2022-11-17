
export const COMMON_COND = {

    // * Check _success class in all form controllers
    controllerClassCheck: function (inpArr) {
        if (inpArr.every((item) => item.parentElement.classList.contains("_success"))) {
            return true;
        } else {
            return false;
        }
    },
    // * Check the existence of form elements
    formElemCheck: function (nodeList) {
        const nodeArr = [...nodeList];
        for (const item of nodeArr) {
            if (item != "undefined" || item != "null") {
                return true;
            } else {
                return false;
            }
        }
    }
}