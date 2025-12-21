export type SecurePrimitive = string | number | boolean | null;
export type SecureStructured = Record<string, unknown> | unknown[];
export type SecureValue = SecurePrimitive | SecureStructured;

export interface SecureStorage {
  setSecureItem<T = SecureValue>(key: string, value: T): Promise<boolean>;
  getSecureItem<T = SecureValue>(key: string): Promise<T | null>;
  removeSecureItem(key: string): Promise<boolean>;
  clearSecureStorage(): Promise<boolean>;
}
