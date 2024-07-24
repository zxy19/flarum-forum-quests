/// <reference types="mithril" />
import { IPageAttrs } from 'flarum/common/components/Page';
import QuestInfo from '../../common/models/QuestInfo';
import Component from 'flarum/common/Component';
import QuestCondition from '../../common/models/QuestCondition';
import { ConditionData, OPERATOR } from '../../common/types/data';
export default class QuestItem extends Component<{
    item: QuestInfo;
    conditionMap?: Record<string, QuestCondition>;
} & IPageAttrs, null> {
    loading: boolean;
    currentFilter: string;
    oninit(vnode: any): void;
    oncreate(vnode: any): void;
    view(): JSX.Element;
    progress(condition: ConditionData): "" | JSX.Element;
    conditionOp(value1: number, op: OPERATOR, value2: number): boolean;
}
