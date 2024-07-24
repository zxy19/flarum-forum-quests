import app from 'flarum/admin/app';
import adminPage from './components/adminPage';
import { init } from '../common/integration';

app.initializers.add('xypp/forum-quests', () => {
  init(app,"admin");
  app.extensionData
    .for('xypp-forum-quests')
    .registerPage(adminPage);
});