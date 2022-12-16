
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

// TODO Добавь предзагрузку значения UAH

const curSelectOptions = document.querySelectorAll(`.${CLASS_LIST.curSelectOptions}`);
const curInputs = document.querySelectorAll(`.${CLASS_LIST.curOutputs}`);
const resultOutputs = document.querySelectorAll(".result-item__value");
const curRateNames = Object.keys(CUR_RATE);

let selectedCur = document.querySelector(".select__value").textContent;
let curAttrName = "data-value";
let resultMask = "0000.00";

function changeCurrency(className, curOption, attrName, curName) {
    const outputs = document.querySelectorAll(`.${className}`);

    if (curOption.getAttribute(attrName) === curName) {
        for (let curOption of outputs) {
            curOption.textContent = curName;
        }
    }

    let curOptionValue = curOption.getAttribute(attrName);
    let rateName = `${selectedCur}_${curOptionValue}`;
    selectedCur = curOptionValue;

    for (const inp of curInputs) {
        if (+inp.value !== 0 && !Number.isNaN(+inp.value)) {
            inp.value = (+inp.value * CUR_RATE[rateName]).toFixed(2);
            selectedCur = curOptionValue;
        }
    }
    for (const resultItem of resultOutputs) {
        if (resultItem.textContent !== resultMask) {
            resultItem.textContent = (+resultItem.textContent * CUR_RATE[rateName]).toFixed(2);
        }
    }

}

if (curSelectOptions) {
    for (let curOption of curSelectOptions) {
        curOption.addEventListener("click", (e) => {
            let target = e.target;
            if (target.getAttribute("data-value") == CUR_DEF.ukrainianHryvnya) {
                changeCurrency(CLASS_LIST.curOutputs, curOption, curAttrName, CUR_DEF.ukrainianHryvnya);
            } else if (target.getAttribute("data-value") == CUR_DEF.dollarUSA) {
                changeCurrency(CLASS_LIST.curOutputs, curOption, curAttrName, CUR_DEF.dollarUSA);
            } else if (target.getAttribute("data-value") == CUR_DEF.euro) {
                changeCurrency(CLASS_LIST.curOutputs, curOption, curAttrName, CUR_DEF.euro);
            }
        });
    }
}