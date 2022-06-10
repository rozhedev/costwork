const curSelectOptions = document.querySelectorAll(".select_header-select .select__option");
const currOutputs = document.querySelectorAll(".currency");

if (curSelectOptions && currOutputs) {
    for (let i = 0; i < curSelectOptions.length; i++) {
        curSelectOptions[i].addEventListener("click", function () {

            if (curSelectOptions[i].getAttribute("data-value") == "UAH") {
                for (item of currOutputs) {
                    item.textContent = "UAH";
                }
            }
            if (curSelectOptions[i].getAttribute("data-value") == "USD") {
                for (item of currOutputs) {
                    item.textContent = "USD";
                }
            }
            if (curSelectOptions[i].getAttribute("data-value") == "EUR") {
                for (item of currOutputs) {
                    item.textContent = "EUR";
                }
            }
        });
    }
}