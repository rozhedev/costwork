import { checkConnect } from "../common/checkers";
import { API_KEY, API_LINK } from "../data/config";
import { popupNet } from "../data/values";

async function getRatePromise(apiKey, selectedCurDef, basicCurDef) {
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${selectedCurDef}`;

    let result = await fetch(url)
    .then((res) => res.json())
    .then((result) => result.conversion_rates[basicCurDef])
    .catch((err) => checkConnect(API_LINK, popupNet));
    return result;
}

// * CURRENCY LIST
export const CUR_LIST = {
    ukrainianHryvnya: {
        def: "UAH",
        get getRate() {
            return getRatePromise(
                API_KEY,
                this.def,
                this.def
            );
        },
    },
    dollarUSA: {
        def: "USD",
        get getRate() {
            return getRatePromise(
                API_KEY,
                this.def,
                CUR_LIST.ukrainianHryvnya.def
            );
        },
    },
    euro: {
        def: "EUR",
        get getRate() {
            return getRatePromise(
                API_KEY,
                this.def,
                CUR_LIST.ukrainianHryvnya.def
            );
        },
    },
    chineseYuan: {
        def: "CNY",
        get getRate() {
            return getRatePromise(
                API_KEY,
                this.def,
                CUR_LIST.ukrainianHryvnya.def
            );
        },
    },
    sterling: {
        def: "GBP",
        get getRate() {
            return getRatePromise(
                API_KEY,
                this.def,
                CUR_LIST.ukrainianHryvnya.def
            );
        },
    },
    indianRupee: {
        def: "INR",
        get getRate() {
            return getRatePromise(
                API_KEY,
                this.def,
                CUR_LIST.ukrainianHryvnya.def
            );
        },
    },
    japaneseYen: {
        def: "JPY",
        get getRate() {
            return getRatePromise(
                API_KEY,
                this.def,
                CUR_LIST.ukrainianHryvnya.def
            );
        },
    },
}

export const OFFLINE_RATE = {
    "UAH_USD": 0.027,
    "UAH_EUR": 0.026,
    "USD_UAH": 36.98,
    "USD_EUR": 0.94,
    "EUR_UAH": 39.10,
    "EUR_USD": 1.06,
    "CNY_UAH": 5.31,
    "GBP_UAH": 44.59,
    "INR_UAH": 0.45,
    "JPY_UAH": 0.28,
};