/// <reference types="flarum/@types/translator-icu-rich" />
import Notification from 'flarum/forum/components/Notification';
export default class QuestDoneNotification extends Notification {
    excerpt(): string;
    icon(): string;
    href(): string;
    content(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
}
