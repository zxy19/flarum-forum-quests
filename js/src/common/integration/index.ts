import { addCondition, addReward, addRewardSelection, rewardValueConvert } from "../utils/AddFrontend";
import AdminApplication from "flarum/admin/AdminApplication";
import ForumApplication from "flarum/forum/ForumApplication";
import commonSelectionModal from "../components/commonSelectionModal";

export function init(app: ForumApplication | AdminApplication, fe: string) {
    const base = `xypp-forum-quests.${fe}.integration`
    addCondition("post_count", app.translator.trans(`${base}.condition.post_count`) + "");
    addCondition("user_page_view", app.translator.trans(`${base}.condition.user_page_view`) + "");
    addCondition("discussion_count", app.translator.trans(`${base}.condition.discussion_count`) + "")
    addCondition("discussion_replied", app.translator.trans(`${base}.condition.discussion_replied`) + "");
    addCondition("reloads", app.translator.trans(`${base}.condition.reloads`) + "");

    if (flarum.extensions['xypp-store'])
        addCondition("store_purchased", app.translator.trans(`${base}.condition.store_purchased`) + "");

    if (flarum.extensions['flarum-likes']) {
        addCondition("like_recv", app.translator.trans(`${base}.condition.like_recv`) + "");
        addCondition("like_send", app.translator.trans(`${base}.condition.like_send`) + "");
    }
    if (flarum.extensions['v17development-user-badges'])
        addCondition("badge_received", app.translator.trans(`${base}.condition.badge_received`) + "");

    if (flarum.extensions['michaelbelgium-discussion-views'])
        addCondition("discussion_views", app.translator.trans(`${base}.condition.discussion_views`) + "");

    addReward("money", app.translator.trans(`${base}.reward.money`) + "");

    if (flarum.extensions['xypp-store'])
        addStoreItem(app, base);

    if (flarum.extensions['v17development-user-badges'])
        addBadge(app, base);
}
function addStoreItem(app: ForumApplication | AdminApplication, base: string) {
    const storeItemLoadingMap: Record<string, boolean> = {}
    addReward("store_item", app.translator.trans(`${base}.reward.store_item`) + "");
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
    });
    addRewardSelection("store_item", async () => {
        const items = await app.store.find("store-item") as unknown as any[];
        const itemsMap = items.reduce((map, item) => {
            map[item.id()] = item.attribute("name");
            return map;
        }, {} as Record<string, string>);
        return await commonSelectionModal.open(app,
            itemsMap,
            app.translator.trans(`${base}.reward.store_item_select`) as string,
            app.translator.trans(`${base}.reward.store_item_select_button`) as string);
    });
}
function addBadge(app: ForumApplication | AdminApplication, base: string) {
    const badgeLoadingMap: Record<string, boolean> = {}
    addReward("badge", app.translator.trans(`${base}.reward.badge`) + "");
    rewardValueConvert("badge", function (value: string) {
        const item = app.store.getById("badges", value);
        if (!item) {
            if (badgeLoadingMap[value] === undefined) {
                badgeLoadingMap[value] = true;
                app.store.find("badges", value).then(() => {
                    m.redraw();
                }).catch(() => {
                    badgeLoadingMap[value] = false;
                });
                return app.translator.trans(`${base}.reward.badge_loading`) + "";
            } else if (badgeLoadingMap[value] === false) {
                return app.translator.trans(`${base}.reward.badge_error`) + "";
            } else {
                return app.translator.trans(`${base}.reward.badge_loading`) + "";
            }
        }
        return item.attribute("name");
    });
    addRewardSelection("badge", async () => {
        const items = await app.store.find("badges") as unknown as any[];
        const itemsMap = items.reduce((map, item) => {
            map[item.id()] = item.attribute("name");
            return map;
        }, {} as Record<string, string>);
        return await commonSelectionModal.open(app,
            itemsMap,
            app.translator.trans(`${base}.reward.badge_select`) as string,
            app.translator.trans(`${base}.reward.badge_select_button`) as string);
    });
}