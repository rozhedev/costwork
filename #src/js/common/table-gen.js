
export function createPaymentTable(table, title, totalValuesArr, monthlyValuesArr) {
    const selectedCur = document.querySelector(".select_header-select .select__title span");
    let tempTitle = title;

    for (let i = 1; i < totalValuesArr.length; i++) {
        let tableItem = document.createElement("tr");
        tableItem.className = "payment-table__item _show"

        if (typeof totalValuesArr[0] !== "string") {
            title = ``;
            title = `${i} ${tempTitle}`;
        }
        let curIsUnderfined = selectedCur != "underfined" ? selectedCur.textContent : CURRENCIES_DEF.ukrainianHryvnya;

        tableItem.innerHTML += `
        <td class="payment-table__item-label navlink">
            ${title}
        </td>
        <td class="payment-table__item-value">
            <span class="navlink">
                ${totalValuesArr[i]}
            </span>
            <span class="navlink currency">
                ${curIsUnderfined}
            </span>
        </td>
        <td class="payment-table__item-value">
            <span class="navlink">
                ${monthlyValuesArr[i]}
            </span>
            <span class="navlink currency">
                ${curIsUnderfined}
            </span>
        </td>
              `;

        table.appendChild(tableItem);
    }
}