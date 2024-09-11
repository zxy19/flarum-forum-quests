/// <reference types="mithril" />
import { IPageAttrs } from 'flarum/common/components/Page';
import Component from 'flarum/common/Component';
import QuestInfo from '../../common/models/QuestInfo';
import type { ConditionData } from '@xypp-collector/common/types/data';
import { Condition, OPERATOR } from '@xypp-collector/forum';
export default class QuestItem extends Component<{
    item: QuestInfo;
    conditionMap?: Record<string, Condition>;
} & IPageAttrs, null> {
    loading: boolean;
    currentFilter: string;
    updatingCondition: boolean;
    oninit(vnode: any): void;
    oncreate(vnode: any): void;
    view(): JSX.Element;
    progress(condition: ConditionData): "" | JSX.Element;
    conditionOp(value1: number, op: OPERATOR, value2: number): boolean;
    updateCondition(): Promise<void>;
}
