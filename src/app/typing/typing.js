import {omit} from 'lodash';

class TypingController {
  /** @ngInject */
  constructor($log, socket) {
    this.$log = $log;
    this.socket = socket;

    this.typingUsernames = {};

    socket.on('SOMEONE_IS_TYPING', username => this.onTyping(username));
    socket.on('SOMEONE_HAS_STOP_TYPING', username => this.onStopTyping(username));
  }

  onTyping(username) {
    const {$log} = this;

    $log.debug('isTyping BE', username);

    this.typingUsernames[username] = username;
  }

  onStopTyping(username) {
    const {$log} = this;

    $log.debug('hasStopTyping BE', username);

    this.typingUsernames = omit(this.typingUsernames, username);
  }

  getTypingLonelyUser() {
    return Object.keys(this.typingUsernames)[0];
  }

  getNumberOfTypingUsers() {
    return Object.keys(this.typingUsernames).length;
  }
}

export const typing = {
  template: require('./typing.html'),
  controller: TypingController
};
