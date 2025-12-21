import {
  Set_Encrypted_AsyncStorage,
  Get_Encrypted_AsyncStorage,
} from 'react-native-encrypted-asyncstorage';

import type { SecureStorage } from '../types/secureStorage';

/**
 * Secure storage helpers wrapping react-native-encrypted-asyncstorage
 * - Serializes non-string values as JSON for storage
 * - Parses JSON when reading back
 * - Provides remove and clear helpers with graceful fallbacks
 */

export async function setSecureItem<T = unknown>(
  key: string,
  value: T,
): Promise<boolean> {
  try {
    const payload =
      typeof value === 'string'
        ? (value as unknown as string)
        : JSON.stringify(value);
    await Set_Encrypted_AsyncStorage(key, payload);
    return true;
  } catch (err) {
    // Keep error handling local to avoid adding dependencies (logger isn't implemented)
    console.error('[secureStorage] setSecureItem error', err);
    return false;
  }
}

export async function getSecureItem<T = unknown>(
  key: string,
): Promise<T | null> {
  try {
    const raw = await Get_Encrypted_AsyncStorage(key);
    if (raw == null) return null;

    // Try to parse JSON, fall back to returning the string
    try {
      return JSON.parse(raw) as T;
    } catch {
      return raw as unknown as T;
    }
  } catch (err) {
    console.error('[secureStorage] getSecureItem error', err);
    return null;
  }
}

export async function removeSecureItem(key: string): Promise<boolean> {
  try {
    // Try to call a native Remove_Encrypted_AsyncStorage if provided by the native module
    const native = require('react-native-encrypted-asyncstorage') as any;
    if (native && typeof native.Remove_Encrypted_AsyncStorage === 'function') {
      await native.Remove_Encrypted_AsyncStorage(key);
      return true;
    }

    // Fallback: overwrite with empty string
    await Set_Encrypted_AsyncStorage(key, '');
    return true;
  } catch (err) {
    console.error('[secureStorage] removeSecureItem error', err);
    return false;
  }
}

export async function clearSecureStorage(): Promise<boolean> {
  try {
    const native = require('react-native-encrypted-asyncstorage') as any;
    if (native && typeof native.Clear_Encrypted_AsyncStorage === 'function') {
      await native.Clear_Encrypted_AsyncStorage();
      return true;
    }

    // No reliable fallback for a full clear — return false to indicate missing capability
    return false;
  } catch (err) {
    console.error('[secureStorage] clearSecureStorage error', err);
    return false;
  }
}

const secureStorage: SecureStorage = {
  setSecureItem,
  getSecureItem,
  removeSecureItem,
  clearSecureStorage,
};

export default secureStorage;
