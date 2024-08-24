/// <reference types="mithril" />
/// <reference types="flarum/@types/translator-icu-rich" />
import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import QuestInfo from '../../common/models/QuestInfo';
import { ConditionData, RewardData } from '../../common/types/data';
export default class editModal extends Modal<{
    item?: QuestInfo;
    update: (item: QuestInfo) => void;
} & IInternalModalAttrs> {
    REG_CONDITIONS: Record<string, string>;
    REG_REWARDS: Record<string, string>;
    REG_OPERATOR: Record<string, string>;
    REG_RE_AVAILABLE: Record<string, string>;
    conditions: ConditionData[];
    rewards: RewardData[];
    name: string;
    desc: string;
    icon: string;
    hidden: boolean;
    re_available_type: string;
    re_available_value: string;
    rewardGettingValue: Record<number, boolean>;
    oninit(vnode: any): void;
    className(): string;
    title(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    oncreate(vnode: any): void;
    content(): JSX.Element;
    onsubmit(e: any): Promise<void>;
    getValue(e: MouseEvent): Promise<void>;
}
