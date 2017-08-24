import {difference} from 'lodash';

class JoinersController {
  /** @ngInject */
  constructor($log, $interval, socket) {
    this.$log = $log;
    this.$interval = $interval;
    this.socket = socket;

    this.users = {};

    this.notifications = [];

    socket.on('USERS', users => this.checkUsers(users));

    $interval(() => {
      this.cleanNotifications();
    }, 5000);
  }

  getTime(datetime) {
    if (!datetime) {
      return '';
    }

    const date = new Date(datetime);

    return `${date.getHours()}:${date.getMinutes()}`;
  }

  cleanNotifications() {
    const now = Date.now();
    const numberOfSecs = 5;

    this.notifications = this.notifications.filter(notification => {
      return now - notification.datetime < numberOfSecs * 1000;
    });
  }

  addNotification({type, user}) {
    if (!type || !user) {
      return;
    }

    this.notifications.push({
      datetime: Date.now(),
      type,
      user
    });
  }

  checkUsers(users) {
    const {$log} = this;

    const disconnectedUsers = difference(Object.keys(this.users), Object.keys(users));

    disconnectedUsers.forEach(username => {
      this.addNotification({type: 'disconnect', user: this.users[username]});
    });

    $log.debug('disconnectedUsers', disconnectedUsers);

    const joinedUsers = difference(Object.keys(users), Object.keys(this.users));

    joinedUsers.forEach(username => {
      this.addNotification({type: 'joined', user: users[username]});
    });

    $log.debug('joinedUsers', joinedUsers);

    this.users = users;
  }
}

export const joiners = {
  template: require('./joiners.html'),
  controller: JoinersController
};
