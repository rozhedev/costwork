const CURRENCY_OBJ = {
    dollarUSA: "USD",
    euro: "EUR",
    ukrainianHryvnya: "UAH",
}
const curSelectOptions = document.querySelectorAll(".select_header-select .select__option");
const curOutputs = document.querySelectorAll(".currency");


if (curSelectOptions && curOutputs) {
    for (let i = 0; i < curSelectOptions.length; i++) {
        curSelectOptions[i].addEventListener("click", function () {

            if (curSelectOptions[i].getAttribute("data-value") == CURRENCY_OBJ.ukrainianHryvnya) {
                for (let item of curOutputs) {
                    item.textContent = CURRENCY_OBJ.ukrainianHryvnya;
                }
            }
            if (curSelectOptions[i].getAttribute("data-value") == CURRENCY_OBJ.dollarUSA) {
                for (let item of curOutputs) {
                    item.textContent = CURRENCY_OBJ.dollarUSA;
                }
            }
            if (curSelectOptions[i].getAttribute("data-value") == CURRENCY_OBJ.euro) {
                for (let item of curOutputs) {
                    item.textContent = CURRENCY_OBJ.euro;
                }
            }
        });
    }
}