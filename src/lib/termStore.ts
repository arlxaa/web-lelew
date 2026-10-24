"use client";

import { useSyncExternalStore } from "react";
import type { PetMood } from "@/components/Pet";

// Shared between the terminal screen and the pet perched on its window.
type State = { phase: "idle" | "booting" | "shell"; mood: PetMood; bubble: boolean };

let state: State = { phase: "idle", mood: "idle", bubble: true };
const listeners = new Set<() => void>();

export function setTerm(patch: Partial<State>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const server: State = { phase: "idle", mood: "idle", bubble: true };

export const useTerm = () =>
  useSyncExternalStore(
    subscribe,
    () => state,
    () => server,
  );

let moodTimer: number | undefined;
/** Set a mood for a while, then fall back to idle (or keep sleeping). */
export function flashMood(mood: PetMood, ms = 1600) {
  clearTimeout(moodTimer);
  setTerm({ mood });
  if (mood !== "sleep") moodTimer = window.setTimeout(() => setTerm({ mood: "idle" }), ms);
}
