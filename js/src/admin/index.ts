import app from 'flarum/admin/app';
import adminPage from './components/adminPage';

app.initializers.add('xypp/forum-quests', () => {
  app.extensionData
    .for('xypp-forum-quests')
    .registerPage(adminPage);
});

import QuestInfo from '../common/models/QuestInfo';
import editModal from './components/editModal';
export {
  QuestInfo,
  editModal,
  adminPage
};