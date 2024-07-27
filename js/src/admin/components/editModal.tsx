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
    item?: QuestInfo,
    update: (item: QuestInfo) => void,
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
    icon: string = "";
    hidden: boolean = false;
    re_available_type: string = "none";
    re_available_value: string = "";
    rewardGettingValue: Record<number, boolean> = {};
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
            this.hidden = this.attrs.item.hidden();
            this.icon = this.attrs.item.icon();
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
        return 'Modal Modal--large';
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
                        }).bind(this)} />
                    </div>
                    <div className="Form-group">
                        <label for="xypp-quests-create-ipt-desc">{app.translator.trans('xypp-forum-quests.admin.create-modal.description')}</label>
                        <textarea id="xypp-quests-create-ipt-desc" required className="FormControl" step="any" value={this.desc} onchange={((e: InputEvent) => {
                            this.desc = (e.target as HTMLTextAreaElement).value;
                        }).bind(this)}>{this.desc}</textarea>
                    </div>
                    <div className="Form-group">
                        <label for="xypp-quests-create-ipt-icon">{app.translator.trans('xypp-forum-quests.admin.create-modal.icon')}</label>
                        <div class="xypp-quests-create-icon-preview">
                            <input id="xypp-quests-create-ipt-icon" className="FormControl" type="text" step="any" value={this.icon} onchange={((e: InputEvent) => {
                                this.icon = (e.target as HTMLInputElement).value;
                            }).bind(this)} />
                            {showIf(!!this.icon, <i className={this.icon}></i>)}
                        </div>
                    </div>
                    <div className="Form-group">
                        <Switch state={this.hidden} onchange={((e: boolean) => {
                            this.hidden = e;
                        }).bind(this)} >
                            <label>{app.translator.trans('xypp-forum-quests.admin.create-modal.hidden')}</label>
                        </Switch>
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
                                    <th>{app.translator.trans('xypp-forum-quests.admin.create-modal.condition-alter_name')}</th>
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
                                                <input className="FormControl" type="text" value={item.alter_name || ""} onchange={((e: InputEvent) => {
                                                    this.conditions[index].alter_name = (e.target as HTMLInputElement).value || undefined;
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
                                    <th>{app.translator.trans('xypp-forum-quests.admin.create-modal.reward-get_value')}</th>
                                    <th>{app.translator.trans('xypp-forum-quests.admin.create-modal.reward-alter_name')}</th>
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
                                                <Button className="Button Button--primary" onclick={this.getValue.bind(this)} data-id={index}
                                                    disabled={this.rewardGettingValue[index]} loading={this.rewardGettingValue[index]}>
                                                    <i class="fas fa-eye"></i>
                                                </Button>
                                            </td>
                                            <td>
                                                <input className="FormControl" type="text" value={item.alter_name || ""} onchange={((e: InputEvent) => {
                                                    this.rewards[index].alter_name = (e.target as HTMLInputElement).value || undefined;
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
        let item = this.attrs.item || app.store.createRecord<QuestInfo>('quest-infos');
        let re_available = "";
        if (this.re_available_type != 'none') {
            re_available = this.re_available_type + ':' + this.re_available_value;
        }
        try {
            const newItem = await item.save({
                conditions: JSON.stringify(this.conditions.filter(item => item.name != '*')),
                rewards: JSON.stringify(this.rewards.filter(item => item.name != '*')),
                name: this.name,
                description: this.desc,
                re_available,
                icon: this.icon,
                hidden: this.hidden
            });
            this.attrs.update && this.attrs.update(newItem);
            app.modal.close();
        } finally {
            this.loading = false;
            m.redraw();
        }
    }
    async getValue(e: MouseEvent) {
        const id = parseInt((e.currentTarget as HTMLInputElement).getAttribute('data-id') as string);
        this.rewardGettingValue[id] = true;
        m.redraw();
        const result = await HumanizeUtils.getInstance().rewardSelection(this.rewards[id].name);
        if (result) this.rewards[id].value = result;
        this.rewardGettingValue[id] = false;
        m.redraw();
    }
}
