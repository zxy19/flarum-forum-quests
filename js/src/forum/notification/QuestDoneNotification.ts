import Notification from 'flarum/forum/components/Notification';
import username from 'flarum/common/helpers/username';
import app from 'flarum/forum/app';

export default class QuestDoneNotification extends Notification {
    excerpt() {
        return ""
    }
    icon() {
        return 'fas fa-star';
    }

    href() {
        return app.route("quest_page");
    }

    content() {
        //@ts-ignore
        return app.translator.trans('xypp-forum-quests.forum.notification.quest_done', { name: this.attrs.notification.subject().name() });
    }
}