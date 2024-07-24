import Page, { IPageAttrs } from 'flarum/common/components/Page';
import IndexPage from 'flarum/forum/components/IndexPage';
import listItems from 'flarum/common/helpers/listItems';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import app from 'flarum/forum/app';
import QuestInfo from '../../common/models/QuestInfo';
import HumanizeUtils from '../../common/utils/HumanizeUtils';
import Component from 'flarum/common/Component';
import { showIf } from '../../common/utils/NodeUtil';
import QuestCondition from '../../common/models/QuestCondition';
import { ConditionData, OPERATOR } from '../../common/types/data';
export default class QuestItem extends Component<{
    item: QuestInfo,
    conditionMap?: Record<string, QuestCondition>
} & IPageAttrs, null> {
    loading: boolean = false;
    currentFilter: string = "all";
    oninit(vnode: any): void {
        super.oninit(vnode);
    }
    oncreate(vnode: any): void {
        super.oncreate(vnode);
    }
    view() {
        const humanize = HumanizeUtils.getInstance();
        return (
            <div className={this.attrs.item.done() ? "quest-item-container quest-done" : "quest-item-container"}>
                <div className='quest-item-name'>
                    {this.attrs.item.name()}
                    {showIf(!!(this.attrs.item.done()),
                        <span className='quest-item-done'>
                            {app.translator.trans("xypp-forum-quests.forum.quest.done") + " "}
                            <i class="fas fa-check"></i>
                        </span>
                    )}
                </div>
                <div className='quest-item-description'>
                    {this.attrs.item.description()}
                </div>
                <div className='quest-item-time'>
                    <i className='fas fa-clock'></i>{" "}
                    {humanize.humanizeReAvailable(this.attrs.item.re_available())}
                </div>
                <div className='quest-item-infos'>
                    <div className='quest-item-condition'>
                        <div className='quest-item-condition-title'><i class="fas fa-tasks"></i>{" "}{app.translator.trans("xypp-forum-quests.forum.condition.condition")}</div>
                        {
                            this.attrs.item.condition().map(condition => {
                                return <div className='quest-item-condition-line'><span>{humanize.humanizeCondition(condition)}</span>
                                    {this.progress(condition)}
                                </div>;
                            })
                        }
                    </div>
                    <div className='quest-item-reward'>
                        <div className='quest-item-reward-title'><i class="fas fa-gift"></i>{" "}{app.translator.trans("xypp-forum-quests.forum.reward.reward")}</div>
                        {humanize.humanizeReward(this.attrs.item.reward()).map((e: any) => <div>{e}</div>)}
                    </div>
                </div>
                {showIf(!!(this.attrs.item.icon()),
                    <div className='quest-item-icon'><i class={this.attrs.item.icon()}></i></div>
                )}
            </div>
        );
    }

    progress(condition: ConditionData) {
        if (!this.attrs.conditionMap || !this.attrs.conditionMap[condition.name]) return "";
        let value = this.attrs.conditionMap[condition.name].value();
        if (condition.span) {
            value = this.attrs.conditionMap[condition.name].getSpan(condition.span);
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
}
