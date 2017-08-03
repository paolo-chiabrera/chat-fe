class UserController {
  /** @ngInject */
  constructor($log, socket) {
    this.$log = $log;
    this.socket = socket;

    this.user = {};

    socket.on('USER', user => this.onUser(user));
  }

  onUser(user) {
    const {$log} = this;

    $log.debug('user', user);

    this.user = user;
  }
}

export const user = {
  template: require('./user.html'),
  controller: UserController
};
