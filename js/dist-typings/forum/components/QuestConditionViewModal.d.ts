/// <reference types="mithril" />
/// <reference types="flarum/@types/translator-icu-rich" />
import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import QuestCondition from '../../common/models/QuestCondition';
export default class QuestConditionViewModal extends Modal<{
    items: QuestCondition[];
} & IInternalModalAttrs> {
    span: number;
    className(): string;
    title(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    content(): JSX.Element;
}
