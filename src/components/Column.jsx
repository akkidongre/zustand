import React from 'react';
import './Column.css';
import Task from './Task';
import { useStore } from '../store/store';
import { shallow } from 'zustand/shallow';

export default function Column({ state }) {
    const tasks = useStore(
        store => store.tasks.filter(task => task.state === state),
        shallow
    );

    return (
        <div className='column'>
            <p>{state}</p>
            {tasks.map((task, i) => <Task key={`${task.title}-${i}`} title={task.title}></Task>)}
        </div>
    )
}
