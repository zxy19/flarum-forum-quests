import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import UserPage from 'flarum/forum/components/UserPage';
import { triggerCondition } from '../utils/frontendTrigger';
const typeCnt: Record<string, number> = {};
const records: Record<string, Record<string, boolean>> = {};
function limitCount(type: string, count: number, cb: (type: string) => void) {
    typeCnt[type] = typeCnt[type] || 0;
    if (typeCnt[type] < count) {
        typeCnt[type]++;
        cb(type);
    }
}
function limitTypeOnce(type: string, newKey: string, cb: (type: string) => void) {
    const dict = (records[type] = records[type] || {});
    if (!dict[newKey]) {
        dict[newKey] = true;
        cb(type);
    }
}

export function registerCount() {
    extend(UserPage.prototype, "show", function () {
        if (app.session?.user)
            limitTypeOnce("user_page_view", this.user?.slug() as string, t => limitCount(t, 5, t => triggerCondition(t, 1)));
    })
}