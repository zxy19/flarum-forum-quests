/// <reference types="mithril" />
/// <reference types="flarum/@types/translator-icu-rich" />
import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import { Condition } from '@xypp-collector/forum';
export default class QuestConditionViewModal extends Modal<{
    items: Condition[];
} & IInternalModalAttrs> {
    span: number;
    className(): string;
    title(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    content(): JSX.Element;
}
