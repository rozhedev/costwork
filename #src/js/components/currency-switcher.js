
import { CUR_RATE, CUR_DEF } from "../data/values";
import { API_KEY } from "../data/config";
import { CHECK_LIST_VAL } from "../common/conditions";

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

    // * Rate name is name of prop CUR_RATE object
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
    }).catch(() => {
        selectedCurDef = curOptionValue;
        convertListValues(
            inpList,
            CHECK_LIST_VAL.checkCurInp(inpList),
            CUR_RATE[rateName]
        );
        convertListValues(
            resultList,
            CHECK_LIST_VAL.checkCurResult(resultList, resultMask),
            CUR_RATE[rateName]
        );
        convertListValues(
            trOutputList,
            CHECK_LIST_VAL.checkCurTr(),
            CUR_RATE[rateName]
        );
        console.error("Exchange rate isn't downloaded");
    })
}

if (curSelectOptions) {
    for (let curOption of curSelectOptions) {
        curOption.addEventListener("click", function (e) {
            let target = e.target;
            if (target.getAttribute(curAttrName) == CUR_DEF.ukrainianHryvnya) {
                changeCurrency(
                    CLASS_LIST.curOutputs,
                    this,
                    curAttrName,
                    CUR_DEF.ukrainianHryvnya
                );
                getExchangeRate(
                    curAttrName,
                    this,
                    API_KEY,
                    curOutputs,
                    resultOutputs
                );
            } else if (target.getAttribute(curAttrName) == CUR_DEF.dollarUSA) {
                changeCurrency(
                    CLASS_LIST.curOutputs,
                    this,
                    curAttrName,
                    CUR_DEF.dollarUSA
                );
                getExchangeRate(
                    curAttrName,
                    this,
                    API_KEY,
                    curOutputs,
                    resultOutputs
                );
            } else if (target.getAttribute(curAttrName) == CUR_DEF.euro) {
                changeCurrency(
                    CLASS_LIST.curOutputs,
                    this,
                    curAttrName,
                    CUR_DEF.euro
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