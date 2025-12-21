declare module 'react-native-encrypted-asyncstorage' {
  /**
   * Stores an encrypted string value for the given key.
   * Resolves when the write is complete.
   */
  export function Set_Encrypted_AsyncStorage(
    key: string,
    value: string,
  ): Promise<void>;

  /**
   * Retrieves the encrypted string value for the given key.
   * Resolves to the stored string or null if not present.
   */
  export function Get_Encrypted_AsyncStorage(
    key: string,
  ): Promise<string | null>;

  /**
   * Optional: remove a key if the native module supports it.
   */
  export function Remove_Encrypted_AsyncStorage(key: string): Promise<void>;

  /**
   * Optional: clear all storage if implemented by the native module.
   */
  export function Clear_Encrypted_AsyncStorage(): Promise<void>;

  export default {
    Set_Encrypted_AsyncStorage,
    Get_Encrypted_AsyncStorage,
    Remove_Encrypted_AsyncStorage,
    Clear_Encrypted_AsyncStorage,
  };
}
