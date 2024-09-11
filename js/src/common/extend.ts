import Extend from 'flarum/common/extenders';
import QuestInfo from './models/QuestInfo';
export default [
    new Extend.Store()
        .add('quest-infos', QuestInfo)
];