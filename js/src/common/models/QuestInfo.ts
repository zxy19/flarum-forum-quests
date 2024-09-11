import Model from 'flarum/common/Model';
import type { ConditionData, RewardData } from '@xypp-collector/common/types/data';


function optionalJsonParser<T>(data: any): T[] {
  if (!data) {
    return [];
  }
  try {
    return JSON.parse(data);
  } catch (ignore) {
    return [];
  }
}

export default class QuestInfo extends Model {
  name = Model.attribute<string>('name');
  createdAt = Model.attribute('createdAt', Model.transformDate);
  updatedAt = Model.attribute('updatedAt', Model.transformDate);
  description = Model.attribute<string>('description');
  condition = Model.attribute<ConditionData[]>('conditions', optionalJsonParser<ConditionData>);
  reward = Model.attribute<RewardData[]>('rewards', optionalJsonParser<RewardData>);
  re_available = Model.attribute<string>('re_available');
  done = Model.attribute<boolean>('done');
  icon = Model.attribute<string>('icon');
  hidden = Model.attribute<boolean>('hidden');
  manual = Model.attribute<boolean>('manual');
}