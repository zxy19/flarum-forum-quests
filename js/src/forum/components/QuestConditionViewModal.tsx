import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import app from 'flarum/forum/app';
import HumanizeUtils from '../../common/utils/HumanizeUtils';
import QuestCondition from '../../common/models/QuestCondition';
export default class QuestConditionViewModal extends Modal<{
    items: QuestCondition[]
} & IInternalModalAttrs> {
    span: number = 0;
    className() {
        return 'Modal';
    }
    title() {
        return app.translator.trans('xypp-forum-quests.forum.condition_view.title');
    }
    content() {
        return (
            <div className="Modal-body">
                <table className='Table ConditionViewTable'>
                    <thead>
                        <tr>
                            <th>{app.translator.trans('xypp-forum-quests.forum.condition_view.name')}</th>
                            <th>{app.translator.trans('xypp-forum-quests.forum.condition_view.value')}</th>
                            <th>{app.translator.trans('xypp-forum-quests.forum.condition_view.span')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.attrs.items.map((item, index) => {
                            return (
                                <tr>
                                    <td>{HumanizeUtils.getInstance().getConditionName(item.name())}</td>
                                    <td>{item.value()}</td>
                                    <td>{item.getSpan(this.span)}</td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td>{app.translator.trans('xypp-forum-quests.forum.condition_view.set_span')}</td>
                            <td></td>
                            <td>
                                <input type="number" className="FormControl" step="any" value={this.span} oninput={((e: InputEvent) => {
                                    this.span = parseInt((e.target as HTMLInputElement).value);
                                    m.redraw();
                                })} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
