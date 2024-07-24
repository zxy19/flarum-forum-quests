import ExtensionPage from "flarum/admin/components/ExtensionPage";
import app from 'flarum/admin/app';
import QuestInfo from "../../common/models/QuestInfo";
import Button from "flarum/common/components/Button";
import { showIf } from "../../common/utils/NodeUtil";
import LoadingIndicator from "flarum/common/components/LoadingIndicator";
import editModal from "./editModal";

export default class adminPage extends ExtensionPage {
    items: QuestInfo[] = [];
    more: boolean = false;
    item_loading: boolean = false;
    offset: number = 0;
    currentFilter: string = "all";
    isRemoving: Record<string, boolean> = {};
    oncreate(vnode: any): void {
        super.oncreate(vnode);
        this.loadMore();
    }
    content(vnode: any) {
        return <div className="xypp-forum-quests-adminPage-container">
            <div className="xypp-forum-quests-adminPage-settings Form-group">
                <h2>{app.translator.trans('xypp-forum-quests.admin.settings')}</h2>
                {this.buildSettingComponent({
                    type: 'string',
                    setting: 'xypp.forum-quests.timezone',
                    default: 'UTC',
                    label: app.translator.trans('xypp-forum-quests.admin.timezone'),
                })}

                {this.submitButton()}
            </div>
            <h2>{app.translator.trans('xypp-forum-quests.admin.data')}</h2>
            <table className="xypp-forum-quests-adminPage-table">
                <thead>
                    <tr>
                        <th>{app.translator.trans("xypp-forum-quests.admin.table.id")}</th>
                        <th>{app.translator.trans("xypp-forum-quests.admin.table.name")}</th>
                        <th>{app.translator.trans("xypp-forum-quests.admin.table.description")}</th>
                        <th>{app.translator.trans("xypp-forum-quests.admin.table.operation")}</th>
                    </tr>
                </thead>
                <tbody>
                    {this.items.map((item) => {
                        const removing = this.isRemoving[item.id()!] || false
                        return (
                            <tr>
                                <td>{item.id()}</td>
                                <td>{item.name()}</td>
                                <td>{item.description()}</td>
                                <td>
                                    <Button className="Button Button--primary" onclick={this.click.bind(this)} data-id={item.id()}>
                                        <i class="fas fa-edit"></i>
                                    </Button>
                                    <Button className="Button Button--danger" onclick={this.remove.bind(this)} data-id={item.id()} disabled={removing} loading={removing}>
                                        <i class="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td>
                            <Button className="Button Button--primary" onclick={this.create.bind(this)} >
                                {app.translator.trans("xypp-forum-quests.admin.table.create")}
                            </Button>
                        </td>
                        <td>
                            {showIf(this.item_loading, <LoadingIndicator />,
                                showIf(this.more,
                                    <Button className="Button Button--primary" onclick={this.loadMore.bind(this)} >
                                        {app.translator.trans("xypp-forum-quests.admin.table.load_more")}
                                    </Button>)
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    }

    create() {
        app.modal.show(editModal, { item: null });
    }
    async loadMore() {
        this.item_loading = true;
        m.redraw();
        const newItems = await app.store.find<QuestInfo[]>('quest-infos-admin', { page: { offset: this.offset, limit: 30 }, filter: this.currentFilter } as any);
        this.items.push(...newItems);
        this.item_loading = false;
        if (newItems.length < 30) {
            this.more = false;
        }
        this.offset += newItems.length;
        m.redraw();
    }
    click(e: MouseEvent) {
        const id = (e.currentTarget as HTMLButtonElement).getAttribute("data-id");
        if (!id) return;
        app.modal.show(editModal, { item: app.store.getById<QuestInfo>("quest-infos", id) });
    }
    remove(e: MouseEvent) {
        const id = (e.currentTarget as HTMLButtonElement).getAttribute("data-id");
        if (!id) return;
        const model = app.store.getById<QuestInfo>("quest-infos", id);
        if (!model) return;
        if (confirm(app.translator.trans("xypp-forum-quests.admin.table.remove_confirm") + "")) {
            this.isRemoving[id] = true;
            m.redraw();
            model.delete().then(() => {
                this.items = this.items.filter((item) => item.id() != id);
                this.isRemoving[id] = false;
                m.redraw();
            });
        }
    }
}