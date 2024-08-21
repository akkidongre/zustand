import { create } from "zustand";

const store = (set) => ({
    tasks: [{title: 'Test task', state: 'planned'}]
});

export const useStore = create(store);