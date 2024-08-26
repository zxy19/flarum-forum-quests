import ForumApplication from "flarum/forum/ForumApplication";
import AdminApplication from "flarum/admin/AdminApplication";

import { ConditionData, RewardData } from "../types/data";
import ItemList from "flarum/common/utils/ItemList";
import QuestCondition from "../models/QuestCondition";
import { showIf } from "./NodeUtil";

export default class HumanizeUtils {
    public static instance?: HumanizeUtils;
    protected app: ForumApplication | AdminApplication;
    protected definitionLoaded: boolean = false;
    protected conditionTranslations: Record<string, string> = {};
    protected rewardTranslations: Record<string, string> = {};
    protected conditionsKeys: string[] = [];
    protected rewardsKeys: string[] = [];
    constructor(app: ForumApplication | AdminApplication) {
        this.app = app;
    }
    public async loadDefinition() {
        if (this.definitionLoaded) {
            return;
        }
        if (this.app.data['quest-definition']) {
            this._loadDefinition(this.app.data['quest-definition'] as any);
            return;
        }
        const data = await this.app.request({
            method: "GET",
            url: this.app.forum.attribute("apiUrl") + "/quest-data"
        });
        this._loadDefinition(data as any);
    }
    protected _loadDefinition(data: {
        conditions: { trans: string, key: string }[],
        rewards: { trans: string, key: string }[]
    }) {
        data.conditions.forEach((value) => {
            this.conditionTranslations[value.key] = value.trans;
            this.conditionsKeys.push(value.key);
        });
        data.rewards.forEach((value) => {
            this.rewardTranslations[value.key] = value.trans;
            this.rewardsKeys.push(value.key);
        });
        this.definitionLoaded = true;
    }
    public static getInstance(app: ForumApplication | AdminApplication): HumanizeUtils {
        if (!this.instance) {
            this.instance = new HumanizeUtils(app);
        }
        return this.instance;
    }
    public getAllConditions(): ItemList<string> {
        const ret = new ItemList<string>();
        this.conditionsKeys.forEach(key => {
            ret.add(key, this.conditionTranslations[key]);
        });
        return ret;
    }
    public getAllRewards(): ItemList<string> {
        const ret = new ItemList<string>();
        this.rewardsKeys.forEach(key => {
            ret.add(key, this.rewardTranslations[key]);
        });
        return ret;
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
            let span = conditionData.span ? this.app.translator.trans("xypp-forum-quests.forum.condition.span", { span: conditionData.span }) : '';
            if (Array.isArray(span)) {
                span = span.join("");
            }
            return this.app.translator.trans("xypp-forum-quests.forum.condition.format", {
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
            return this.app.translator.trans("xypp-forum-quests.forum.reward.format", {
                b: <b />,
                name: this.getRewardName(rewardData.name),
                value: this.getRewardValue(rewardData.name, rewardData.value)
            });
        }
    }
    public humanizeReAvailable(value: string) {
        const val = value?.split(":");
        if (!val || val.length < 2) {
            return this.app.translator.trans("xypp-forum-quests.forum.re_available.none")
        }
        const [type, v] = val;
        return this.app.translator.trans("xypp-forum-quests.forum.re_available." + type, {
            value: v
        });
    }
}