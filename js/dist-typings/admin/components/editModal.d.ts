/// <reference types="mithril" />
/// <reference types="flarum/@types/translator-icu-rich" />
import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import QuestInfo from '../../common/models/QuestInfo';
import { ConditionData, RewardData } from '../../common/types/data';
export default class editModal extends Modal<{
    item?: QuestInfo;
} & IInternalModalAttrs> {
    REG_CONDITIONS: Record<string, string>;
    REG_REWARDS: Record<string, string>;
    REG_OPERATOR: Record<string, string>;
    REG_RE_AVAILABLE: Record<string, string>;
    conditions: ConditionData[];
    rewards: RewardData[];
    name: string;
    desc: string;
    re_available_type: string;
    re_available_value: string;
    oninit(vnode: any): void;
    className(): string;
    title(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    oncreate(vnode: any): void;
    content(): JSX.Element;
    onsubmit(e: any): Promise<void>;
}
