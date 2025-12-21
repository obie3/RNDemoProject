declare module '@react-native-community/netinfo' {
  export type NetInfoState = {
    isConnected: boolean | null;
    isInternetReachable?: boolean | null;
    type?: string | null;
  };

  export function addEventListener(cb: (state: NetInfoState) => void): {
    remove: () => void;
  };
  export function fetch(): Promise<NetInfoState>;

  const NetInfo: {
    addEventListener: typeof addEventListener;
    fetch: typeof fetch;
  };

  export default NetInfo;
}
