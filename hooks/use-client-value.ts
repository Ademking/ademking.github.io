import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Reads a browser-only value without a hydration mismatch: the server (and the
 * first client render) gets `serverValue`, later renders get `getValue()`.
 */
export const useClientValue = <T>(getValue: () => T, serverValue: T) =>
  useSyncExternalStore(subscribe, getValue, () => serverValue);
