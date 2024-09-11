import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import app from 'flarum/admin/app';
import Button from 'flarum/common/components/Button';
import Select from 'flarum/common/components/Select';
import Switch from "flarum/common/components/Switch"
import QuestInfo from '../../common/models/QuestInfo';
import { showIf } from '../../common/utils/NodeUtil';
import Stream from 'flarum/common/utils/Stream';

import type { ConditionData, RewardData } from '@xypp-collector/common/types/data';
import { HumanizeUtils, ConditionConfigure, RewardConfigure, OPERATOR } from '@xypp-collector/admin';

export default class editModal extends Modal<{
    item?: QuestInfo,
    update: (item: QuestInfo) => void,
} & IInternalModalAttrs> {
    REG_RE_AVAILABLE: Record<string, string> = {
        'none': app.translator.trans('xypp-forum-quests.admin.re_available.none') + "",
        'day': app.translator.trans('xypp-forum-quests.admin.re_available.day') + "",
        'hour': app.translator.trans('xypp-forum-quests.admin.re_available.hour') + "",
    }
    conditions?: Stream<ConditionData[]>;
    rewards?: Stream<RewardData[]>;
    name: string = "";
    desc: string = "";
    icon: string = "";
    hidden: boolean = false;
    re_available_type: string = "none";
    re_available_value: string = "";
    rewardGettingValue: Record<number, boolean> = {};
    oninit(vnode: any): void {
        super.oninit(vnode);
        const humanize = HumanizeUtils.getInstance(app);
        console.log(humanize.getAllConditions().toArray(true));

        if (this.attrs.item) {
            const t_re_available = (this.attrs.item.re_available() || "").split(':');
            if (t_re_available.length == 2) {
                [this.re_available_type, this.re_available_value] = t_re_available;
            } else {
                this.re_available_type = 'none';
            }
            this.conditions = new Stream(this.attrs.item.condition());
            this.rewards = new Stream(this.attrs.item.reward());
            this.name = this.attrs.item.name();
            this.desc = this.attrs.item.description();
            this.hidden = this.attrs.item.hidden();
            this.icon = this.attrs.item.icon();
        }else{
            this.conditions = new Stream([]);
            this.rewards = new Stream([]);
        }
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
                        <ConditionConfigure conditions={this.conditions}></ConditionConfigure>
                    </div>
                    <div className='Form-group'>
                        <label>{app.translator.trans('xypp-forum-quests.admin.create-modal.reward')}</label>
                        <RewardConfigure rewards={this.rewards}></RewardConfigure>
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
            const conditions: ConditionData[] = this.conditions();
            const rewards: RewardData[] = this.rewards();

            const newItem = await item.save({
                conditions: JSON.stringify(conditions.filter(item => item.name != '*')),
                rewards: JSON.stringify(rewards.filter(item => item.name != '*')),
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
}
