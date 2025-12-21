import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { View } from 'react-native';

let latestListener: ((s: any) => void) | null = null;

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn((cb: (s: any) => void) => {
    latestListener = cb;
    return {
      remove: () => {
        latestListener = null;
      },
    };
  }),
  fetch: jest.fn(async () => ({
    isConnected: true,
    isInternetReachable: true,
    type: 'wifi',
  })),
}));

import useNetworkStatus from '../src/hooks/useNetworkStatus';

function Snapshot() {
  const s = useNetworkStatus();
  return (
    // Render a simple JSON string so tests can assert easily
    // Use a plain <View> because react-test-renderer supports it
    <View>{JSON.stringify(s)}</View>
  );
}

describe('useNetworkStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    latestListener = null;
  });

  test('initially fetches and returns network state', async () => {
    let tree: any;

    await act(async () => {
      tree = renderer.create(<Snapshot />);
    });

    expect(tree!.toJSON().children[0]).toContain('"isConnected":true');
    expect(tree!.toJSON().children[0]).toContain('"type":"wifi"');
  });

  test('responds to connectivity changes from NetInfo', async () => {
    let tree: any;

    await act(async () => {
      tree = renderer.create(<Snapshot />);
    });

    expect(tree!.toJSON().children[0]).toContain('"isConnected":true');

    // Simulate a change
    act(() => {
      if (latestListener)
        latestListener({
          isConnected: false,
          isInternetReachable: false,
          type: 'none',
        });
    });

    expect(tree!.toJSON().children[0]).toContain('"isConnected":false');
    expect(tree!.toJSON().children[0]).toContain('"type":"none"');
  });
});
