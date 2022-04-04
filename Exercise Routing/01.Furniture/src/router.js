const registry = {};

function registerHandler(url, ...handlers) {
  registry[url] = handlers;
}

function handlerRequest(handlers) {
  const ctx = {};

  callNext();

  function callNext() {
    const handler = handlers.shift();

    if (typeof handler === "function") {
      handlers(ctx, callNext);
    }
  }
}
