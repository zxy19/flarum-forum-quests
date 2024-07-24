import { extend, override } from "flarum/common/extend";
import HumanizeUtils from "./HumanizeUtils";
import ItemList from "flarum/common/utils/ItemList";

export function addCondition(key: string, name: string) {
    extend(HumanizeUtils.prototype, "getAllConditions", (list: ItemList<string>) => {
        list.add(key, name);
    })
}
export function addReward(key: string, name: string) {
    extend(HumanizeUtils.prototype, "getAllRewards", (list: ItemList<string>) => {
        list.add(key, name);
    })
}
export function rewardValueConvert(key: string, callback: (value: string) => string) {
    override(HumanizeUtils.prototype, "getRewardValue", (ofunction: (key: string, value: string) => string, _key: string, value: string) => {
        if (key === _key) {
            return callback(value);
        } else {
            return ofunction(_key, value);
        }
    })
}
