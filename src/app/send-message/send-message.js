class SendMessageController {
  /** @ngInject */
  constructor($log, socket) {
    this.$log = $log;
    this.socket = socket;

    this.content = '';
  }

  clearMessage() {
    this.content = '';
  }

  sendMessage(message) {
    if (!message) {
      return;
    }

    this.socket.emit('MESSAGE', message);

    this.clearMessage();
  }
}

export const sendMessage = {
  template: require('./send-message.html'),
  controller: SendMessageController
};
