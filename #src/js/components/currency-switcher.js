
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

const curSelectOptions = document.querySelectorAll(`.${CLASS_LIST.curSelectOptions}`);
const curInputs = document.querySelectorAll(`.${CLASS_LIST.curOutputs}`);
const resultOutputs = document.querySelectorAll(".result-item__value");
const curAttrName = "data-value";

let selectedCurDef = document.querySelector(".select__value").textContent;
let resultMask = "0000.00";

function changeCurrency(className, curOption, attrName, curName) {
    const outputs = document.querySelectorAll(`.${className}`);

    if (curOption.getAttribute(attrName) === curName) {
        for (let curOption of outputs) {
            curOption.textContent = curName;
        }
    }
}

function convertValues(curOption, inpList, resultList, mask) {
    const tableOutputList = document.querySelectorAll(".payment-table__item-value span:first-of-type");
    let curOptionValue = curOption.getAttribute(curAttrName);
    let apiKey = "7d03b057637241539a972b22";
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${selectedCurDef}`;

    fetch(url).then((res) => res.json()).then((result) => {
        selectedCurDef = curOptionValue;
        let selectedRate = result.conversion_rates[curOptionValue];

        for (const inp of inpList) {
            if (inp.value != "" && !Number.isNaN(+inp.value)) {
                inp.value = (+inp.value * selectedRate).toFixed(2);
            }
        }
        if (resultList.length > 0) {
            for (const resultItem of resultList) {
                if (resultItem.textContent != mask) {
                    resultItem.textContent = (+resultItem.textContent * selectedRate).toFixed(2);
                }
            }
        }
        if (tableOutputList.length > 0) {
            for (const tableItem of tableOutputList) {
                tableItem.textContent = (+tableItem.textContent * selectedRate).toFixed(2);
            }
        }
    }).catch(() => {
        let rateName = `${selectedCurDef}_${curOptionValue}`;
        selectedCurDef = curOptionValue;

        for (const inp of inpList) {
            if (inp.value != "" && !Number.isNaN(+inp.value)) {
                inp.value = (+inp.value * CUR_RATE[rateName]).toFixed(2);
            }
        }
        for (const resultItem of resultList) {
            if (resultItem.textContent != mask) {
                resultItem.textContent = (+resultItem.textContent * CUR_RATE[rateName]).toFixed(2);
            }
        }
        if (tableOutputList.length > 0) {
            for (const tableItem of tableOutputList) {
                tableItem.textContent = (+tableItem.textContent * CUR_RATE[rateName]).toFixed(2);
            }
        }
        console.log("Exchange rate isn't downloaded");
    })
}

if (curSelectOptions) {
    for (let curOption of curSelectOptions) {
        curOption.addEventListener("click", (e) => {
            let target = e.target;

            if (target.getAttribute("data-value") == CUR_DEF.ukrainianHryvnya) {
                changeCurrency(CLASS_LIST.curOutputs, curOption, curAttrName, CUR_DEF.ukrainianHryvnya);
                convertValues(curOption, curInputs, resultOutputs, resultMask);

            } else if (target.getAttribute("data-value") == CUR_DEF.dollarUSA) {
                changeCurrency(CLASS_LIST.curOutputs, curOption, curAttrName, CUR_DEF.dollarUSA);
                convertValues(curOption, curInputs, resultOutputs, resultMask);

            } else if (target.getAttribute("data-value") == CUR_DEF.euro) {
                changeCurrency(CLASS_LIST.curOutputs, curOption, curAttrName, CUR_DEF.euro);
                convertValues(curOption, curInputs, resultOutputs, resultMask);
            }
        });
    }
}