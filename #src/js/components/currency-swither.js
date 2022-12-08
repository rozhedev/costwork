// TODO Сделай конвертацию резульатов и значений полей у выбранную валюту. Позже динамечкое обновление курса

// * Currencies definition
const CURRENCIES_DEF = {
    dollarUSA: "USD",
    euro: "EUR",
    ukrainianHryvnya: "UAH",
}
const curSelectOptions = document.querySelectorAll(".select_header-select .select__option");
const curOutputs = document.querySelectorAll(".currency");
const tableItems = document.querySelector(".payment-table .payment-table__item-value .currency-selected")

// Добавь событие для смены подписей таблицы
function checkCurrency(currencyObj, select, table) {
    let currencyArr = Object.values(currencyObj);
    for (let item of currencyArr) {
        if (select.textContent == item) {
            table.innerHTML = "";
            return item;
        }
    }
}


if (curSelectOptions && curOutputs) {
    for (let i = 0; i < curSelectOptions.length; i++) {
        curSelectOptions[i].addEventListener("click", function () {
            
            if (curSelectOptions[i].getAttribute("data-value") == CURRENCIES_DEF.ukrainianHryvnya) {
                for (let item of curOutputs) {
                    item.textContent = CURRENCIES_DEF.ukrainianHryvnya;
                }
            }
            if (curSelectOptions[i].getAttribute("data-value") == CURRENCIES_DEF.dollarUSA) {
                for (let item of curOutputs) {
                    item.textContent = CURRENCIES_DEF.dollarUSA;
                }
            }
            if (curSelectOptions[i].getAttribute("data-value") == CURRENCIES_DEF.euro) {
                for (let item of curOutputs) {
                    item.textContent = CURRENCIES_DEF.euro;
                }
            }
        });
    }
}