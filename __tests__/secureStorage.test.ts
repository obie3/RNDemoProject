import {
  setSecureItem,
  getSecureItem,
  removeSecureItem,
  clearSecureStorage,
} from '../src/services/secureStorage';

// Simple in-memory mock store used by the mocked native module
let mockStore: Record<string, string> = {};

jest.mock('react-native-encrypted-asyncstorage', () => ({
  Set_Encrypted_AsyncStorage: jest.fn(async (key: string, value: string) => {
    mockStore[key] = value;
  }),
  Get_Encrypted_AsyncStorage: jest.fn(
    async (key: string) => mockStore[key] ?? null,
  ),
  Remove_Encrypted_AsyncStorage: jest.fn(async (key: string) => {
    delete mockStore[key];
  }),
  Clear_Encrypted_AsyncStorage: jest.fn(async () => {
    mockStore = {};
  }),
}));

beforeEach(() => {
  mockStore = {};
  jest.clearAllMocks();
});

test('set and get JSON values', async () => {
  const obj = { a: 1, b: 'two' };
  await expect(setSecureItem('jsonKey', obj)).resolves.toBe(true);
  await expect(getSecureItem('jsonKey')).resolves.toEqual(obj);
});

test('set and get string values', async () => {
  await expect(setSecureItem('strKey', 'hello')).resolves.toBe(true);
  await expect(getSecureItem('strKey')).resolves.toBe('hello');
});

test('remove item', async () => {
  await setSecureItem('k', 'v');
  await expect(removeSecureItem('k')).resolves.toBe(true);
  await expect(getSecureItem('k')).resolves.toBeNull();
});

test('clear storage', async () => {
  await setSecureItem('a', 1);
  await setSecureItem('b', 2);
  await expect(clearSecureStorage()).resolves.toBe(true);
  await expect(getSecureItem('a')).resolves.toBeNull();
  await expect(getSecureItem('b')).resolves.toBeNull();
});
