class SendMessageController {
  /** @ngInject */
  constructor($log, $timeout, socket) {
    this.$log = $log;
    this.$timeout = $timeout;
    this.socket = socket;

    this.content = '';
    this.isTyping = null;
  }

  clearMessage() {
    this.content = '';
  }

  hasStopTyping() {
    this.$log.debug('I have stopped typing');

    this.$log.debug('hasStopTyping');

    this.resetTyping();

    this.isTyping = this.$timeout(() => {
      this.socket.emit('STOP_TYPING');
      this.isTyping = null;
    }, 5000);
  }

  hasStartTyping() {
    this.$log.debug('I am typing');

    if (this.isTyping) {
      this.resetTyping();
      return;
    }

    this.socket.emit('TYPING');
  }

  resetTyping() {
    if (this.isTyping) {
      this.$timeout.cancel(this.isTyping);
      this.isTyping = null;
    }
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
