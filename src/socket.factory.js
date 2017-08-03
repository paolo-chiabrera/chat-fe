module.exports = function ($rootScope) {
  const socket = io.connect();

  return {
    on: (eventName, callback) => {
      function wrapper() {
        const args = arguments;

        $rootScope.$apply(() => {
          callback.apply(socket, args);
        });
      }

      socket.on(eventName, wrapper);

      return function () {
        socket.removeListener(eventName, wrapper);
      };
    },
    emit: (eventName, data, callback) => {
      socket.emit(eventName, data, () => {
        const args = arguments;

        $rootScope.$apply(() => {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
};
