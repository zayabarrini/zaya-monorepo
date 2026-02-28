import { writable } from "svelte/store";

// Create a global loading state store
export const isLoading = writable(false);
