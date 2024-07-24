/// <reference types="mithril" />
import ExtensionPage from "flarum/admin/components/ExtensionPage";
import QuestInfo from "../../common/models/QuestInfo";
export default class adminPage extends ExtensionPage {
    items: QuestInfo[];
    more: boolean;
    item_loading: boolean;
    offset: number;
    currentFilter: string;
    isRemoving: Record<string, boolean>;
    oncreate(vnode: any): void;
    content(vnode: any): JSX.Element;
    create(): void;
    loadMore(): Promise<void>;
    click(e: MouseEvent): void;
    remove(e: MouseEvent): void;
}
