
export function getTableSlice(tableId, btnsClass) {
    const tableItems = document.querySelectorAll(`#${tableId} .payment-table__item`);
    const tableBtns = document.querySelectorAll(`.${btnsClass}`)
    let tableItemsArr, tableSlice;
    let maxItemsNum = 10;

    if (tableItems.length > maxItemsNum) {
        for (let btn of tableBtns) {
            btn.removeAttribute("disabled");
        }
        tableItemsArr = [...tableItems];
        tableSlice = tableItemsArr.slice(maxItemsNum);
    } else if (
        tableItems.length < maxItemsNum ||
        tableItems.length == maxItemsNum
    ) {
        for (let btn of tableBtns) {
            btn.setAttribute("disabled", "");
        }
    }
    return tableSlice;
}

export function hideTableItems(tableSlice, stateShow, stateHide) {
    for (let i = 0; i < tableSlice.length; i++) {
        tableSlice[i].classList.add(stateHide);
        tableSlice[i].classList.remove(stateShow);
    }
}

export function showTableItems(tableSlice, stateShow, stateHide) {
    for (let i = 0; i < tableSlice.length; i++) {
        tableSlice[i].classList.add(stateShow);
        tableSlice[i].classList.remove(stateHide);
    }
}