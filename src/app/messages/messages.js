class MessagesController {
  /** @ngInject */
  constructor($log, socket) {
    this.$log = $log;
    this.socket = socket;

    this.messages = [];

    socket.on('MESSAGES', messages => this.onMessages(messages));
  }

  onMessages(messages) {
    const {$log} = this;

    $log.debug('messages', messages);

    this.messages = messages;
  }

  getTime(datetime) {
    if (!datetime) {
      return '';
    }

    const date = new Date(datetime);

    return `${date.getHours()}:${date.getMinutes()}`;
  }
}

export const messages = {
  template: require('./messages.html'),
  controller: MessagesController
};
