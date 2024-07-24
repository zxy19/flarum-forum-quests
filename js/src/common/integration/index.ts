import { addCondition, addReward, rewardValueConvert } from "../utils/AddFrontend";
import AdminApplication from "flarum/admin/AdminApplication";
import ForumApplication from "flarum/forum/ForumApplication";

export function init(app: ForumApplication | AdminApplication, fe: string) {
    const base = `xypp-forum-quests.${fe}.integration`
    addCondition("post_count", app.translator.trans(`${base}.condition.post_count`) + "");
    addCondition("user_page_view", app.translator.trans(`${base}.condition.user_page_view`) + "");
    addCondition("like_recv", app.translator.trans(`${base}.condition.like_recv`) + "");
    addCondition("like_send", app.translator.trans(`${base}.condition.like_send`) + "");
    addCondition("discussion_count", app.translator.trans(`${base}.condition.discussion_count`) + "")
    addCondition("discussion_replied", app.translator.trans(`${base}.condition.discussion_replied`) + "");
    addCondition("store_purchased", app.translator.trans(`${base}.condition.store_purchased`) + "");
    addCondition("reloads", app.translator.trans(`${base}.condition.reloads`) + "");
    addReward("money", app.translator.trans(`${base}.reward.money`) + "");
    addReward("store_item", app.translator.trans(`${base}.reward.store_item`) + "");
    const storeItemLoadingMap: Record<string, boolean> = {}
    rewardValueConvert("store_item", function (value: string) {
        const item = app.store.getById("store-item", value);
        if (!item) {
            if (storeItemLoadingMap[value] === undefined) {
                storeItemLoadingMap[value] = true;
                app.store.find("store-item", value).then(() => {
                    m.redraw();
                }).catch(() => {
                    storeItemLoadingMap[value] = false;
                });
                return app.translator.trans(`${base}.reward.store_item_loading`) + "";
            } else if (storeItemLoadingMap[value] === false) {
                return app.translator.trans(`${base}.reward.store_item_error`) + "";
            } else {
                return app.translator.trans(`${base}.reward.store_item_loading`) + "";
            }
        }
        return item.attribute("name");
    })
}