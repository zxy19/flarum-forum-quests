/// <reference types="mithril" />
/// <reference types="flarum/@types/translator-icu-rich" />
import Page from 'flarum/common/components/Page';
import QuestInfo from '../../common/models/QuestInfo';
import QuestCondition from '../../common/models/QuestCondition';
export default class QuestPage extends Page {
    REG_STATUS: {
        all: import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
        true: import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
        false: import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    };
    loading: boolean;
    more: boolean;
    currentFilter: string;
    offset: number;
    items: QuestInfo[];
    conditions: QuestCondition[];
    conditionLoading: boolean;
    conditionMap: Record<string, QuestCondition>;
    oninit(vnode: any): void;
    oncreate(vnode: any): void;
    view(): JSX.Element;
    loadMore(): Promise<void>;
    loadConditions(): Promise<void>;
    reloadAll(type: string): void;
    conditionView(): void;
}
