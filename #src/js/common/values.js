
export const STATE_LIST = {
    show: "_show",
    hide: "_hide",
    active: "_active",
    touch: "_touch",
    lock: "_lock",
    pc: "_pc",
    loaded: "_loaded",
    setTheme: "_dark",
}

export const ID_LIST = {
    dep: {
        table: "dep-table-output",
        hideBtn: "dep-table-hide-btn",
        showBtn: "dep-table-show-btn",
    },
    cred: {
        table: "cred-table-output",
        hideBtn: "cred-table-hide-btn",
        showBtn: "cred-table-show-btn",
    },
}

export const COMMON_VALUES = {
    delay: 1000,
    screenTipNum: 536,
    taxPercent: 19.5,
    colors: {
        warning: "#0075c4",
        dark: "#0d090a",
    },
    socialBtns: "social-btn",
}

export const TABLE_LABELS = {
    monthly: "місяць:",
    totalPayment: "Сума кредиту:",
    profit: "Дохід без податку:",
    netProfit: "Кінцевий дохід:",
    taxAmount: `Податок (${COMMON_VALUES.taxPercent}%):`,
};

export const CUR_RATE = {
    uah_usd: 40.10,
    uah_eur: 39.80,
    usd_uah: 39.50,
    usd_eur: 1.15,
    eur_uah: 39.20,
    eur_usd: 0.92,
}