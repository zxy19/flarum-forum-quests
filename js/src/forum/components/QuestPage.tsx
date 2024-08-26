import Page from 'flarum/common/components/Page';
import IndexPage from 'flarum/forum/components/IndexPage';
import listItems from 'flarum/common/helpers/listItems';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Button from 'flarum/common/components/Button';
import app from 'flarum/forum/app';
import { showIf } from '../../common/utils/NodeUtil';
import QuestInfo from '../../common/models/QuestInfo';
import QuestItem from './QuestItem';
import QuestCondition from '../../common/models/QuestCondition';
import Select from 'flarum/common/components/Select';
import QuestConditionViewModal from './QuestConditionViewModal';
import HumanizeUtils from '../../common/utils/HumanizeUtils';
export default class QuestPage extends Page {
    REG_STATUS = {
        "all": app.translator.trans('xypp-forum-quests.forum.quest_done.all'),
        "true": app.translator.trans('xypp-forum-quests.forum.quest_done.true'),
        "false": app.translator.trans('xypp-forum-quests.forum.quest_done.false')
    }
    loading: boolean = false;
    more: boolean = false;
    currentFilter: string = "all";
    offset: number = 0;
    items: QuestInfo[] = [];
    conditions: QuestCondition[] = [];
    conditionLoading: boolean = false;
    conditionMap: Record<string, QuestCondition> = {};
    oninit(vnode: any): void {
        super.oninit(vnode);
    }
    oncreate(vnode: any): void {
        super.oncreate(vnode);
        this.loadMore();
        if (app.session.user) {
            this.loadConditions();
        }
    }
    view() {
        return (
            <div>
                {IndexPage.prototype.hero()}
                <div className="container">
                    <div className="sideNavContainer">
                        <nav className="IndexPage-nav sideNav">
                            <ul>{listItems(IndexPage.prototype.sidebarItems().toArray())}</ul>
                        </nav>
                        <div className="QuestPageContainer">
                            <div className='QuestPageOpt'>
                                <Select
                                    options={this.REG_STATUS}
                                    value={this.currentFilter}
                                    onchange={((e: string) => this.reloadAll(e)).bind(this)}>
                                </Select>
                                <Button className='Button Button--primary' onclick={this.conditionView.bind(this)}>
                                    {app.translator.trans("xypp-forum-quests.forum.condition_view.button")}
                                </Button>
                            </div>
                            <div className="QuestPageContent">
                                {this.items.map((item) => {
                                    return (
                                        <QuestItem item={item} conditionMap={this.conditionMap} />
                                    );
                                })
                                }
                            </div>
                            <div className='QuestPageLoad'>
                                {showIf(this.loading,
                                    <LoadingIndicator />,
                                    showIf(this.more,
                                        <Button className='Button Button--primary'>
                                            {app.translator.trans("xypp-forum-quests.forum.quest.load_more")}
                                        </Button>))}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
    async loadMore() {
        this.loading = true;
        m.redraw();
        await HumanizeUtils.getInstance(app).loadDefinition();
        const newItems = await app.store.find<QuestInfo[]>('quest-infos', { page: { offset: this.offset, limit: 10 }, filter: this.currentFilter } as any);
        this.items.push(...newItems);
        this.loading = false;
        if (newItems.length < 10) {
            this.more = false;
        }
        this.offset += newItems.length;
        m.redraw();
    }

    async loadConditions() {
        this.conditionLoading = true;
        m.redraw();
        this.conditions = app.store.all("quest-condition");
        if (this.conditions.length == 0) {
            this.conditions = await app.store.find<QuestCondition[]>('quest-condition');
        }
        this.conditions.forEach((item) => {
            this.conditionMap[item.name()] = item;
        });
        this.conditionLoading = false;
        m.redraw();
    }
    reloadAll(type: string) {
        this.currentFilter = type;
        this.items = [];
        this.offset = 0;
        this.more = true;
        this.loadMore();
    }

    conditionView() {
        app.modal.show(QuestConditionViewModal, { items: this.conditions }, true);
    }
}
