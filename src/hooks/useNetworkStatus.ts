import { useEffect, useState } from 'react';

export type NetworkStatus = {
  isConnected: boolean;
  isInternetReachable?: boolean | null;
  type?: string | null;
};

/**
 * useNetworkStatus
 * - Uses @react-native-community/netinfo when available
 * - Falls back to always-online (isConnected: true) if NetInfo is not installed
 */
export default function useNetworkStatus(): NetworkStatus {
  const [state, setState] = useState<NetworkStatus>({ isConnected: true });

  useEffect(() => {
    let unsub: { remove?: () => void } | undefined;
    let mounted = true;

    try {
      // Dynamically require so projects without the dependency still work
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const NetInfo = require('@react-native-community/netinfo') as {
        addEventListener?: (cb: (s: any) => void) => { remove: () => void };
        fetch?: () => Promise<any>;
      };

      if (NetInfo && typeof NetInfo.fetch === 'function') {
        // Get initial state
        NetInfo.fetch()
          .then((s) => {
            if (!mounted) return;
            setState({
              isConnected: !!s.isConnected,
              isInternetReachable: s.isInternetReachable ?? null,
              type: s.type ?? null,
            });
          })
          .catch(() => {
            if (!mounted) return;
            setState({ isConnected: true });
          });
      }

      if (NetInfo && typeof NetInfo.addEventListener === 'function') {
        unsub = NetInfo.addEventListener((s: any) => {
          setState({
            isConnected: !!s.isConnected,
            isInternetReachable: s.isInternetReachable ?? null,
            type: s.type ?? null,
          });
        });
      }
    } catch (err) {
      // NetInfo not installed — default to online
      // eslint-disable-next-line no-console
      console.warn('[useNetworkStatus] @react-native-community/netinfo not installed, defaulting to online');
      setState({ isConnected: true });
    }

    return () => {
      mounted = false;
      if (unsub && typeof unsub.remove === 'function') unsub.remove();
    };
  }, []);

  return state;
}
