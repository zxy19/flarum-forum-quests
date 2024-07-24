import Extend from 'flarum/common/extenders';
import QuestInfo from './models/QuestInfo';
import QuestCondition from './models/QuestCondition';
export default [
    new Extend.Store()
        .add('quest-infos', QuestInfo)
        .add('quest-condition', QuestCondition)
];