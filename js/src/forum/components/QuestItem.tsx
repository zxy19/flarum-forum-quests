import app from 'flarum/forum/app';
import { IPageAttrs } from 'flarum/common/components/Page';
import Button from 'flarum/common/components/Button';
import Component from 'flarum/common/Component';
import QuestInfo from '../../common/models/QuestInfo';
import { showIf } from '../../common/utils/NodeUtil';
import humanizeReAvailable from '../../common/utils/ReAvailableTranslateUtil';

import type { ConditionData } from '@xypp-collector/common/types/data';
import { Condition, ConditionList, RewardList, OPERATOR } from '@xypp-collector/forum';


export default class QuestItem extends Component<{
    item: QuestInfo,
    conditionMap?: Record<string, Condition>
} & IPageAttrs, null> {
    loading: boolean = false;
    currentFilter: string = "all";
    updatingCondition: boolean = false;
    oninit(vnode: any): void {
        super.oninit(vnode);
    }
    oncreate(vnode: any): void {
        super.oncreate(vnode);
    }
    view() {
        return (
            <div className={this.attrs.item.done() ? "quest-item-container quest-done" : "quest-item-container"}>
                <div className='quest-item-name'>
                    {this.attrs.item.name()}
                    {showIf(!!(this.attrs.item.done()),
                        <span className='quest-item-done'>
                            {app.translator.trans("xypp-forum-quests.forum.quest.done") + " "}
                            <i class="fas fa-check"></i>
                        </span>
                        ,
                        showIf(this.attrs.item.manual(),
                            <Button className='Button Button--secondary Button--small' loading={this.updatingCondition} disabled={this.updatingCondition} onclick={this.updateCondition.bind(this)}>
                                {showIf(!this.updatingCondition, <i class="fas fa-sync"></i>)}
                            </Button>
                        )
                    )}
                </div>
                <div className='quest-item-description'>
                    {this.attrs.item.description()}
                </div>
                <div className='quest-item-time'>
                    <i className='fas fa-clock'></i>{" "}
                    {humanizeReAvailable(app, this.attrs.item.re_available())}
                </div>
                <div className='collector-infos'>
                    <ConditionList conditions={this.attrs.item.condition()} conditionMap={this.attrs.conditionMap}></ConditionList>
                    <RewardList rewards={this.attrs.item.reward()}></RewardList>
                </div>
                {showIf(!!(this.attrs.item.icon()),
                    <div className='quest-item-icon'><i class={this.attrs.item.icon()}></i></div>
                )}
            </div>
        );
    }

    progress(condition: ConditionData) {
        if (!this.attrs.conditionMap || !this.attrs.conditionMap[condition.name]) return "";
        let value = this.attrs.conditionMap[condition.name].getTotal(condition.calculate);
        if (condition.span) {
            value = this.attrs.conditionMap[condition.name].getSpan(condition.span,condition.calculate);
        }
        const satisfy = this.conditionOp(value, condition.operator, condition.value);
        if (satisfy) {
            return <span className="quest-item-progress-satisfy">
                [<i class="fas fa-check"></i>]
            </span>
        }
        return (
            <span className={"quest-item-progress-not-satisfy"}>
                [{value}/{condition.value}]
            </span>
        );

    }
    conditionOp(value1: number, op: OPERATOR, value2: number) {
        switch (op) {
            case OPERATOR.EQUAL:
                return value1 == value2;
            case OPERATOR.GREATER_THAN:
                return value1 > value2;
            case OPERATOR.GREATER_THAN_OR_EQUAL:
                return value1 >= value2;
            case OPERATOR.LESS_THAN:
                return value1 < value2;
            case OPERATOR.LESS_THAN_OR_EQUAL:
                return value1 <= value2;
            case OPERATOR.NOT_EQUAL:
                return value1 != value2;
        }
    }
    async updateCondition() {
        this.updatingCondition = true;
        m.redraw();
        try {
            await app.request({
                method: "GET",
                url: app.forum.attribute("apiUrl") + "/quest-infos/" + this.attrs.item.id() + "/update",
            });
            const item = await app.store.find<QuestInfo>('quest-infos', this.attrs.item.id() as string);
            this.attrs.item.pushAttributes(item.data.attributes as any);
        } finally {
            this.updatingCondition = false;
            m.redraw();
        }
    }
}
