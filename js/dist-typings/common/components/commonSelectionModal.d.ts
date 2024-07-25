/// <reference types="mithril" />
import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import ForumApplication from 'flarum/forum/ForumApplication';
import AdminApplication from 'flarum/admin/AdminApplication';
export default class commonSelectionModal extends Modal<{
    items: Record<string, string>;
    title: string;
    button: string;
    callback: (name: string) => void;
    cancel: () => void;
} & IInternalModalAttrs> {
    selection: string;
    done: boolean;
    oninit(vnode: any): void;
    className(): string;
    title(): string;
    oncreate(vnode: any): void;
    onremove(vnode: any): void;
    content(): JSX.Element;
    onsubmit(e: any): Promise<void>;
    static open(app: ForumApplication | AdminApplication, items: Record<string, string>, title: string, button: string): Promise<string>;
}
