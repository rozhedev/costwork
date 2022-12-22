import { API_KEY } from "../data/config";

const curAttrName = "data-value";

async function getRate(apiKey, curDef) {
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${curDef}`;

    return fetch(url).then((res) => res.json()).then((result) => {
        let selectedRate = result.conversion_rates[curDef];
    });
}

// * CURRENCY LIST

const CUR_LIST = {
    "USD": {
        def: "USD",
        name: "Доллар США",
        rate: getRate(API_KEY, "USD"),
    },
    "EUR": {
        def: "EUR",
        name: "Євро",
        rate: getRate(API_KEY, "EUR"),
    },
    "CNY": {
        def: "CNY",
        name: "Китайський Юань",
        rate: getRate(API_KEY, "CNY"),
    },
    "GBP": {
        def: "GBP",
        name: "Англійський фунт",
        rate: getRate(API_KEY, "GBP"),
    },
    "INR": {
        def: "INR",
        name: "Індійська Рупія",
        rate: getRate(API_KEY, "INR"),
    },
    "JPY": {
        def: "JPY",
        name: "Японська Ієна",
        rate: getRate(API_KEY, "JPY"),
    },
}

// console.log(CUR_LIST["USD"].getRate(API_KEY, "USD"));