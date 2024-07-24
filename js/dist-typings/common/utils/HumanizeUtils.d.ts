/// <reference types="flarum/@types/translator-icu-rich" />
import { ConditionData, RewardData } from "../types/data";
import ItemList from "flarum/common/utils/ItemList";
export default class HumanizeUtils {
    static instance?: HumanizeUtils;
    static getInstance(): HumanizeUtils;
    getAllConditions(): ItemList<string>;
    getAllRewards(): ItemList<string>;
    getConditionName(key: string): string;
    getRewardName(key: string): string;
    getRewardValue(key: string, value: string): string;
    humanizeCondition(conditionData: ConditionData[] | ConditionData): any;
    humanizeReward(rewardData: RewardData[] | RewardData): any;
    humanizeReAvailable(value: string): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
}
