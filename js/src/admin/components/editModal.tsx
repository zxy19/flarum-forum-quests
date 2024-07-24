import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import app from 'flarum/admin/app';
import Button from 'flarum/common/components/Button';
import Select from 'flarum/common/components/Select';
import setRouteWithForcedRefresh from 'flarum/common/utils/setRouteWithForcedRefresh';
import LinkButton from 'flarum/common/components/LinkButton';
import Switch from "flarum/common/components/Switch"
import QuestInfo from '../../common/models/QuestInfo';
import { ConditionData, OPERATOR, RewardData } from '../../common/types/data';
import { showIf } from '../../common/utils/NodeUtil';
import HumanizeUtils from '../../common/utils/HumanizeUtils';
export default class editModal extends Modal<{
    item?: QuestInfo
} & IInternalModalAttrs> {
    REG_CONDITIONS: Record<string, string> = {}
    REG_REWARDS: Record<string, string> = {}
    REG_OPERATOR: Record<string, string> = {
        '=': '=',
        '>': '>',
        '>=': '>=',
        '<': '<',
        '<=': '<=',
        '!=': '!='
    }
    REG_RE_AVAILABLE: Record<string, string> = {
        'none': app.translator.trans('xypp-forum-quests.admin.re_available.none') + "",
        'day': app.translator.trans('xypp-forum-quests.admin.re_available.day') + "",
        'hour': app.translator.trans('xypp-forum-quests.admin.re_available.hour') + "",
    }
    conditions: ConditionData[] = [];
    rewards: RewardData[] = [];
    name: string = "";
    desc: string = "";
    re_available_type: string = "none";
    re_available_value: string = "";
    oninit(vnode: any): void {
        super.oninit(vnode);
        const humanize = HumanizeUtils.getInstance();
        console.log(humanize.getAllConditions().toArray(true));

        const conditions = humanize.getAllConditions().toObject();
        Object.keys(conditions).forEach(item => {
            this.REG_CONDITIONS[item] = conditions[item].content;
        });
        const reward = humanize.getAllRewards().toObject();
        Object.keys(reward).forEach(item => {
            this.REG_REWARDS[item] = reward[item].content;
        });

        this.REG_CONDITIONS['*'] = app.translator.trans('xypp-forum-quests.admin.create-modal.new_item') + "";
        this.REG_REWARDS['*'] = app.translator.trans('xypp-forum-quests.admin.create-modal.new_item') + "";
        if (this.attrs.item) {
            const t_re_available = (this.attrs.item.re_available() || "").split(':');
            if (t_re_available.length == 2) {
                [this.re_available_type, this.re_available_value] = t_re_available;
            } else {
                this.re_available_type = 'none';
            }
            this.conditions = this.attrs.item.condition();
            this.rewards = this.attrs.item.reward();
            this.name = this.attrs.item.name();
            this.desc = this.attrs.item.description();
        }
        this.conditions.push({
            name: '*',
            operator: OPERATOR.EQUAL,
            value: 0
        });
        this.rewards.push({
            name: '*',
            value: '*'
        });
    }
    className() {
        return 'Modal';
    }
    title() {
        if (this.attrs.item) {
            return app.translator.trans("xypp-forum-quests.admin.create-modal.edit", [this.attrs.item] as any)
        }
        return app.translator.trans('xypp-forum-quests.admin.create-modal.title');
    }
    oncreate(vnode: any): void {
        super.oncreate(vnode);
    }
    content() {
        const that = this;
        return (
            <div className="Modal-body">
                <div className="Form">
                    <div className="Form-group">
                        <label for="xypp-quests-create-ipt-name">{app.translator.trans('xypp-forum-quests.admin.create-modal.name')}</label>
                        <input id="xypp-quests-create-ipt-name" required className="FormControl" type="text" step="any" value={this.name} onchange={((e: InputEvent) => {
                            this.name = (e.target as HTMLInputElement).value;
                        })} />
                    </div>
                    <div className="Form-group">
                        <label for="xypp-quests-create-ipt-desc">{app.translator.trans('xypp-forum-quests.admin.create-modal.description')}</label>
                        <textarea id="xypp-quests-create-ipt-desc" required className="FormControl" step="any" value={this.desc} onchange={((e: InputEvent) => {
                            this.desc = (e.target as HTMLTextAreaElement).value;
                        })}>{this.desc}</textarea>
                    </div>
                    <div className="Form-group">
                        <label>{app.translator.trans('xypp-forum-quests.admin.create-modal.condition')}</label>
                        <table className='Table'>
                            <thead>
                                <tr>
                                    <th>{app.translator.trans('xypp-forum-quests.admin.create-modal.condition-name')}</th>
                                    <th>{app.translator.trans('xypp-forum-quests.admin.create-modal.condition-operator')}</th>
                                    <th>{app.translator.trans('xypp-forum-quests.admin.create-modal.condition-value')}</th>
                                    <th>{app.translator.trans('xypp-forum-quests.admin.create-modal.condition-span')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.conditions.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>
                                                <Select className="FormControl" value={item.name} options={this.REG_CONDITIONS} onchange={((name: string) => {
                                                    if (this.conditions.length == index + 1) {
                                                        this.conditions.push({
                                                            name: '*',
                                                            operator: OPERATOR.EQUAL,
                                                            value: 0
                                                        });
                                                    }
                                                    this.conditions[index].name = name;
                                                }).bind(this)}>
                                                </Select>
                                            </td>
                                            <td>
                                                <Select className="FormControl" value={item.operator} options={this.REG_OPERATOR} onchange={((name: string) => {
                                                    this.conditions[index].operator = name as OPERATOR;
                                                }).bind(this)}>
                                                </Select>
                                            </td>
                                            <td>
                                                <input className="FormControl" type="text" value={item.value} onchange={((e: InputEvent) => {
                                                    this.conditions[index].value = parseInt((e.target as HTMLInputElement).value);
                                                }).bind(this)} />
                                            </td>
                                            <td>
                                                <input className="FormControl" type="number" value={item.span} onchange={((e: InputEvent) => {
                                                    this.conditions[index].span = (e.target as HTMLInputElement).value ? parseInt((e.target as HTMLInputElement).value) : undefined;
                                                }).bind(this)} />
                                            </td>
                                            <td>
                                                {showIf(item.name != '*',
                                                    <Button className="Button Button--danger" onclick={((e: any) => {
                                                        this.conditions.splice(index, 1);
                                                        m.redraw();
                                                    }).bind(this)} data-id={index}>
                                                        <i class="fas fa-trash"></i>
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='Form-group'>
                        <label>{app.translator.trans('xypp-forum-quests.admin.create-modal.reward')}</label>
                        <table className='Table'>
                            <thead>
                                <tr>
                                    <th>{app.translator.trans('xypp-forum-quests.admin.create-modal.reward-name')}</th>
                                    <th>{app.translator.trans('xypp-forum-quests.admin.create-modal.reward-value')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.rewards.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>
                                                <Select className="FormControl" value={item.name} options={this.REG_REWARDS} onchange={((name: string) => {
                                                    if (this.rewards.length == index + 1) {
                                                        this.rewards.push({
                                                            name: '*',
                                                            value: '*'
                                                        });
                                                    }
                                                    this.rewards[index].name = name;
                                                }).bind(this)}>
                                                </Select>
                                            </td>
                                            <td>
                                                <input className="FormControl" type="text" value={item.value} onchange={((e: InputEvent) => {
                                                    this.rewards[index].value = (e.target as HTMLInputElement).value;
                                                }).bind(this)} />
                                            </td>
                                            <td>
                                                {showIf(item.name != '*',
                                                    <Button className="Button Button--danger" onclick={((e: any) => {
                                                        this.rewards.splice(index, 1);
                                                        m.redraw();
                                                    }).bind(this)} data-id={index}>
                                                        <i class="fas fa-trash"></i>
                                                    </Button>)}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='Form-group'>
                        <label for="xypp-quests-create-ipt-re_available">
                            {app.translator.trans('xypp-forum-quests.admin.create-modal.re_available')}
                        </label>
                        <div className='flex-row'>
                            <Select className="FormControl" value={this.re_available_type} options={this.REG_RE_AVAILABLE} onchange={((name: string) => {
                                this.re_available_type = name;
                            }).bind(this)} />
                            <input className='FormControl' id="xypp-quests-create-ipt-re_available" type="number" value={this.re_available_value} onchange={((e: InputEvent) => {
                                this.re_available_value = (e.target as HTMLInputElement).value;
                            })} />
                        </div>
                    </div>
                    <div className="Form-group">
                        <Button class="Button Button--primary" type="submit" loading={this.loading}>
                            {showIf(!!this.attrs.item, app.translator.trans('xypp-forum-quests.admin.create-modal.button-edit'),
                                app.translator.trans('xypp-forum-quests.admin.create-modal.button'))}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
    async onsubmit(e: any) {
        e.preventDefault();
        this.loading = true;
        m.redraw();
        let item = this.attrs.item || app.store.createRecord('quest-infos');
        let re_available = "";
        if (this.re_available_type != 'none') {
            re_available = this.re_available_type + ':' + this.re_available_value;
        }
        try {
            await item.save({
                conditions: JSON.stringify(this.conditions.filter(item => item.name != '*')),
                rewards: JSON.stringify(this.rewards.filter(item => item.name != '*')),
                name: this.name,
                description: this.desc,
                re_available
            });
            app.modal.close();
        } finally {
            this.loading = false;
            m.redraw();
        }

    }
}