import app from 'flarum/forum/app';
import QuestDoneNotification from './notification/QuestDoneNotification';
import { extend } from 'flarum/common/extend';
import NotificationGrid from 'flarum/forum/components/NotificationGrid';
import LinkButton from 'flarum/common/components/LinkButton';
import IndexPage from 'flarum/forum/components/IndexPage';
import QuestPage from './components/QuestPage';
app.initializers.add('xypp/forum-quests', () => {
  app.notificationComponents.quest_done = QuestDoneNotification;
  app.routes['quest_page'] = {
    path: "/quest_page",
    component: QuestPage
  };
  extend(NotificationGrid.prototype, 'notificationTypes', function (items) {
    items.add('quest_done', {
      name: 'quest_done',
      icon: 'far fa-thumbs-up',
      label: app.translator.trans('xypp-forum-quests.forum.notification.quest_done_label')
    });
  });

  extend(IndexPage.prototype, 'navItems', function (items) {
    items.add(
      'quest_page',
      LinkButton.component(
        {
          href: app.route('quest_page'),
          icon: 'fas fa-tasks',
        },
        [
          app.translator.trans('xypp-forum-quests.forum.quest.quest')
        ]
      ),
      10
    );
  });
});

import { triggerCondition, triggerConditions } from './utils/frontendTrigger';
import QuestInfo from '../common/models/QuestInfo';
import QuestConditionViewModal from './components/QuestConditionViewModal';
import QuestItem from './components/QuestItem';
export {
  triggerCondition,
  triggerConditions,
  QuestInfo,
  QuestConditionViewModal,
  QuestItem
};
