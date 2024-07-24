import Model from 'flarum/common/Model';
import { ConditionAccumulation } from '../types/data';
export default class QuestCondition extends Model {
    name: () => string;
    value: () => number;
    accumulation: () => ConditionAccumulation | null;
    getSpan(span: number): number;
}
