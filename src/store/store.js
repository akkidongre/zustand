import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

const store = (set) => ({
    tasks: [],
    draggedTask: null,
    addTask: (title, state) => set(
        produce(store => {
            store.tasks.push({title, state});
        }),
        // (store) => ({tasks: [...store.tasks, {title, state}]}), 
        false, 
        "addTask"
    ),
    deleteTask: (title) => set((store) => {
        return {
            tasks: store.tasks.filter(task => task.title !== title)
        }
    }),
    setDraggedTask: (title) => set({draggedTask: title}),
    moveTask: (title, newState) => set((store) => {
        return {
            tasks: store.tasks.map(task => {
                if (task.title === title) {
                    return {
                        title,
                        state: newState
                    }
                }
                return task;
            })
        }
    })
});

const log = (config) => (set, get, api) => config(
    (...args) => {
        console.log(args);
        set(args)
    },
    get,
    api
)

export const useStore = create(subscribeWithSelector(persist(devtools(store)), {name: "store"}));

useStore.subscribe((newStore, prevStore) => {
    if (newStore.tasks !== prevStore.tasks) {
        useStore.setState({
            tasksOngoing: newStore.tasks.filter(task => task.state === 'ongoing').length
        })
    }
})