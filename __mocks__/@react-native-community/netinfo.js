let latestListener = null;

module.exports = {
  addEventListener: jest.fn((cb) => {
    latestListener = cb;
    return { remove: () => { latestListener = null; } };
  }),
  fetch: jest.fn(async () => ({ isConnected: true, isInternetReachable: true, type: 'wifi' })),
  // expose helper for tests to trigger listener
  __trigger: (state) => { if (latestListener) latestListener(state); },
};
