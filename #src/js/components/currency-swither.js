
import { CUR_RATE } from "../common/values";

const CLASS_LIST = {
    curSelectOptions: "select_header-select .select__option",
    curOutputs: "currency",
}

// * Currencies definition
const CUR_DEF = {
    dollarUSA: "USD",
    euro: "EUR",
    ukrainianHryvnya: "UAH",
}

const curSelectOptions = document.querySelectorAll(`${CLASS_LIST.curSelectOptions}`);
let curAttrName = "data-value";

function changeCurrency(className, curItem, attrName, curName) {
    const outputs = document.querySelectorAll(`.${className}`);
    
    if (curItem.getAttribute(attrName) == curName) {
        for (let curItem of outputs) {
            curItem.textContent = curName;
        }
    }
}

if (curSelectOptions) {
    for (let curItem of curSelectOptions) {
        curItem.addEventListener("click", function () {

            changeCurrency(CLASS_LIST.curOutputs, curItem, curAttrName, CUR_DEF.ukrainianHryvnya);
            changeCurrency(CLASS_LIST.curOutputs, curItem, curAttrName, CUR_DEF.dollarUSA);
            changeCurrency(CLASS_LIST.curOutputs, curItem, curAttrName, CUR_DEF.euro);     
        });
    }
}