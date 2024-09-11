import Model from 'flarum/common/Model';
import type { ConditionData, RewardData } from '@xypp-collector/common/types/data';
export default class QuestInfo extends Model {
    name: () => string;
    createdAt: () => Date | null | undefined;
    updatedAt: () => Date | null | undefined;
    description: () => string;
    condition: () => ConditionData[];
    reward: () => RewardData[];
    re_available: () => string;
    done: () => boolean;
    icon: () => string;
    hidden: () => boolean;
    manual: () => boolean;
}
