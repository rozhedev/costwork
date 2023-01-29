import { checkConnect } from "../common/checkers";
import { API_LINK } from "../data/config";
import { CUR_LIST, OFFLINE_RATE} from "../data/currencies";
import { popupNet } from "../data/values";

const rateItemOutputs = document.querySelectorAll(".rate-item__output");

for (const outputItem of rateItemOutputs) {
    for (const item in CUR_LIST) {
        const curItem = CUR_LIST[item];

        for (const prop in curItem) {
            let curAttr = outputItem.getAttribute("data-cur");
            if (curAttr == curItem[prop]) {
              
                curItem.getRate.then((result) => {
                    // * Uses interval update, if you haven't limits of api
                    // setInterval(() => {
                    //     outputItem.textContent = result;
                    // }, 60000);
                    outputItem.textContent = result.toFixed(2);

                }).catch((err) => {
                    for (const rate in OFFLINE_RATE) {
                        if (rate == `${curAttr}_UAH`) {
                            outputItem.textContent = OFFLINE_RATE[rate];
                        }
                    }

                    checkConnect(API_LINK, popupNet);
                })
            }
            break;
        }
    }
}