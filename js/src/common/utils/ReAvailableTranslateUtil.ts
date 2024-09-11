import AdminApplication from "flarum/admin/AdminApplication";
import ForumApplication from "flarum/forum/ForumApplication";

export default function humanizeReAvailable(app: ForumApplication | AdminApplication, value: string) {
    const val = value?.split(":");
    if (!val || val.length < 2) {
        return app.translator.trans("xypp-forum-quests.forum.re_available.none")
    }
    const [type, v] = val;
    return app.translator.trans("xypp-forum-quests.forum.re_available." + type, {
        value: v
    });
}