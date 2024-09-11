/// <reference types="mithril" />
/// <reference types="flarum/@types/translator-icu-rich" />
import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import QuestInfo from '../../common/models/QuestInfo';
import Stream from 'flarum/common/utils/Stream';
import type { ConditionData, RewardData } from '@xypp-collector/common/types/data';
export default class editModal extends Modal<{
    item?: QuestInfo;
    update: (item: QuestInfo) => void;
} & IInternalModalAttrs> {
    REG_RE_AVAILABLE: Record<string, string>;
    conditions?: Stream<ConditionData[]>;
    rewards?: Stream<RewardData[]>;
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
}
