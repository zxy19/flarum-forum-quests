import app from "flarum/forum/app";
import { ConditionData, RewardData } from "../types/data";
import ItemList from "flarum/common/utils/ItemList";
import QuestCondition from "../models/QuestCondition";
import { showIf } from "./NodeUtil";

export default class HumanizeUtils {
    public static instance?: HumanizeUtils;
    public static getInstance(): HumanizeUtils {
        if (!this.instance) {
            this.instance = new HumanizeUtils();
        }
        return this.instance;
    }
    public getAllConditions(): ItemList<string> {
        return new ItemList();
    }
    public getAllRewards(): ItemList<string> {
        return new ItemList();
    }
    public getConditionName(key: string): string {
        if (!this.getAllConditions().has(key)) {
            return key;
        }
        return this.getAllConditions().get(key);
    }
    public getRewardName(key: string): string {
        if (!this.getAllRewards().has(key)) {
            return key;
        }
        return this.getAllRewards().get(key);
    }
    public getRewardValue(key: string, value: string): string {
        return value;
    }
    public async rewardSelection(type: string) {
        return "";
    }
    public humanizeCondition(conditionData: ConditionData[] | ConditionData): any {
        if (Array.isArray(conditionData)) {
            return conditionData.map(condition => {
                return this.humanizeCondition(condition);
            });
        } else {
            if (conditionData.alter_name) {
                return conditionData.alter_name;
            }
            let span = conditionData.span ? app.translator.trans("xypp-forum-quests.forum.condition.span", { span: conditionData.span }) : '';
            if (Array.isArray(span)) {
                span = span.join("");
            }
            return app.translator.trans("xypp-forum-quests.forum.condition.format", {
                b: <b />,
                name: this.getConditionName(conditionData.name),
                operator: conditionData.operator,
                value: conditionData.value,
                span
            });
        }
    }

    public humanizeReward(rewardData: RewardData[] | RewardData): any {
        if (Array.isArray(rewardData)) {
            return rewardData.map(condition => {
                return this.humanizeReward(condition);
            });
        } else {
            if (rewardData.alter_name) {
                return rewardData.alter_name;
            }
            return app.translator.trans("xypp-forum-quests.forum.reward.format", {
                b: <b />,
                name: this.getRewardName(rewardData.name),
                value: this.getRewardValue(rewardData.name, rewardData.value)
            });
        }
    }
    public humanizeReAvailable(value: string) {
        const val = value?.split(":");
        if (!val || val.length < 2) {
            return app.translator.trans("xypp-forum-quests.forum.re_available.none")
        }
        const [type, v] = val;
        return app.translator.trans("xypp-forum-quests.forum.re_available." + type, {
            value: v
        });
    }
}