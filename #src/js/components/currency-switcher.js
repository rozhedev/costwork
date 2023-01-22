
import { OFFLINE_RATE, CUR_LIST } from "../data/currencies";
import { API_KEY } from "../data/config";
import { CHECK_LIST_VAL } from "../common/checkers";
import { ERR_CONTENT } from "../data/values";

const CLASS_LIST = {
    curSelectOptions: "select_header-select .select__option",
    curOutputs: "currency",
    resultOutputs: "result-item__value",
    selectValue: "select__value"
}

const curSelectOptions = document.querySelectorAll(`.${CLASS_LIST.curSelectOptions}`);
const curOutputs = document.querySelectorAll(`input.${CLASS_LIST.curOutputs}`);
const resultOutputs = document.querySelectorAll(`.${CLASS_LIST.resultOutputs}`);
const curAttrName = "data-value";
let selectedCurDef = document.querySelector(`.${CLASS_LIST.selectValue}`).textContent;
let resultMask = "0000.00";

function changeCurrency(className, curOption, attrName, curName) {
    const outputs = document.querySelectorAll(`.${className}`);

    if (curOption.getAttribute(attrName) === curName) {
        for (let curOption of outputs) {
            curOption.textContent = curName;
        }
    }
}

function convertListValues(nodeList, cond, rate) {
    if (nodeList.length > 0) {
        for (const item of nodeList) {
            if (item.value !== undefined) {
                item.value = (+item.value * rate).toFixed(2);
            } else if (cond) {
                item.textContent = item.textContent.trim();
                item.textContent = (+item.textContent * rate).toFixed(2);
            }
        }
    }
}

function getExchangeRate(attrName, curOption, apiKey, inpList, resultList) {
    const trOutputList = document.querySelectorAll(".payment-table__item-value span:first-of-type");
    let curOptionValue = curOption.getAttribute(attrName);
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${selectedCurDef}`;

    // * Rate name is name of prop OFFLINE_RATE object
    let rateName = `${selectedCurDef}_${curOptionValue}`;

    fetch(url).then((res) => res.json()).then((result) => {
        selectedCurDef = curOptionValue;
        let selectedRate = result.conversion_rates[curOptionValue];

        convertListValues(
            inpList,
            CHECK_LIST_VAL.checkCurInp(inpList),
            selectedRate
        );
        convertListValues(
            resultList,
            CHECK_LIST_VAL.checkCurResult(resultList, resultMask),
            selectedRate
        );
        convertListValues(
            trOutputList,
            CHECK_LIST_VAL.checkCurTr(),
            selectedRate
        );
    }).catch((err) => {
        selectedCurDef = curOptionValue;
        convertListValues(
            inpList,
            CHECK_LIST_VAL.checkCurInp(inpList),
            OFFLINE_RATE[rateName]
        );
        convertListValues(
            resultList,
            CHECK_LIST_VAL.checkCurResult(resultList, resultMask),
            OFFLINE_RATE[rateName]
        );
        convertListValues(
            trOutputList,
            CHECK_LIST_VAL.checkCurTr(),
            OFFLINE_RATE[rateName]
        );
        console.error(ERR_CONTENT.connection);
    })
}

if (curSelectOptions) {
    for (let curOption of curSelectOptions) {
        curOption.addEventListener("click", function (e) {
            let target = e.target;
            if (target.getAttribute(curAttrName) == CUR_LIST.ukrainianHryvnya.def) {
                changeCurrency(
                    CLASS_LIST.curOutputs,
                    this,
                    curAttrName,
                    CUR_LIST.ukrainianHryvnya.def
                );
                getExchangeRate(
                    curAttrName,
                    this,
                    API_KEY,
                    curOutputs,
                    resultOutputs
                );
            } else if (target.getAttribute(curAttrName) == CUR_LIST.dollarUSA.def) {
                changeCurrency(
                    CLASS_LIST.curOutputs,
                    this,
                    curAttrName,
                    CUR_LIST.dollarUSA.def
                );
                getExchangeRate(
                    curAttrName,
                    this,
                    API_KEY,
                    curOutputs,
                    resultOutputs
                );
            } else if (target.getAttribute(curAttrName) == CUR_LIST.euro.def) {
                changeCurrency(
                    CLASS_LIST.curOutputs,
                    this,
                    curAttrName,
                    CUR_LIST.euro.def
                );
                getExchangeRate(
                    curAttrName,
                    this,
                    API_KEY,
                    curOutputs,
                    resultOutputs
                );
            }
        });
    }
}