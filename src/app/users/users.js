class UsersController {
  /** @ngInject */
  constructor($log, socket) {
    this.$log = $log;
    this.socket = socket;

    this.user = {};
    this.users = [];

    socket.on('USERS', users => this.setUsers(users));
    socket.on('USER', user => this.setUser(user));
  }

  setUser(user) {
    this.$log.debug('user', user);

    this.user = user;
  }

  setUsers(users) {
    this.$log.debug('users', users);

    this.users = users;
  }
}

export const users = {
  template: require('./users.html'),
  controller: UsersController
};
