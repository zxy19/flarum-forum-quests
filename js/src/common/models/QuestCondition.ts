import Model from 'flarum/common/Model';
import { ConditionAccumulation, ConditionData, RewardData } from '../types/data';
import dayjs from 'dayjs';
// For more details about frontend models
// checkout https://docs.flarum.org/extend/models.html#frontend-models
function optionalJsonParser<T>(data: any): T | null {
  if (!data) {
    return null
  };
  try {
    return JSON.parse(data);
  } catch (ignore) {
    return null;
  }
}
export default class QuestCondition extends Model {
  name = Model.attribute<string>('name');
  value = Model.attribute<number>('value');
  accumulation = Model.attribute<ConditionAccumulation | null>('accumulation', optionalJsonParser<ConditionAccumulation>);
  getSpan(span: number): number {
    const accumulation = this.accumulation();
    if (!accumulation || span < 1) return 0;
    let cut = dayjs(dayjs().format("YYYYMMDD"),"YYYYMMDD");
    if (span != 1) {
      cut = cut.subtract(span - 1, 'day');
    }
    let ret = 0;
    Object.keys(accumulation).forEach((key: string) => {
      if (key == 'all' || key == 'rest') return;
      const d = dayjs(key, "YYYYMMDD");
      if (d.isAfter(cut) || d.isSame(cut)) {
        ret += accumulation[key];
      }
    });
    return ret;
  }
}