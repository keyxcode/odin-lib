const EventManager = () => {
  // the events object contains pairs of: event - [list of corresponding callbacks]
  const events = {};

  const publish = (event, arg) => {
    if (!events[event]) return;
    events[event].forEach((callback) => {
      callback(arg);
    });
  };
  const subscribe = (event, callback) => {
    events[event] = events[event] === undefined ? [] : events[event];
    events[event].push(callback);
  };
  const unsubscribe = (event, callback) => {
    if (!events[event]) return;
    const callbacks = events[event];
    const callbackID = callbacks.indexOf(callback);
    if (callbackID >= 0) callbacks.splice(callbackID, 1);
  };

  console.log("EventManager initialized");

  return { publish, subscribe, unsubscribe };
};

// Initialized on import so that only one instance of EventManager is used - Singleton Pattern
export default EventManager();
