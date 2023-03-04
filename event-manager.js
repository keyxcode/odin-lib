// Coordinator – doesn’t make many decisions but delegates work to other objects.
// the events object contains pairs of: event - [list of corresponding callbacks]
const events = {};

export const publish = (event, arg) => {
  if (!events[event]) return;
  events[event].forEach((callback) => {
    callback(arg);
  });
};

export const subscribe = (event, callback) => {
  events[event] = events[event] === undefined ? [] : events[event];
  events[event].push(callback);
};

export const unsubscribe = (event, callback) => {
  if (!events[event]) return;
  const callbacks = events[event];
  const callbackID = callbacks.indexOf(callback);
  if (callbackID >= 0) callbacks.splice(callbackID, 1);
};
