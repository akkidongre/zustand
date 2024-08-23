import React, { useState } from 'react';
import './Column.css';
import Task from './Task';
import { useStore } from '../store/store';
import { shallow } from 'zustand/shallow';
import classNames from 'classnames';

export default function Column({ state }) {
    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);
    const [drop, setDrop] = useState(false);

    const tasks = useStore(
        store => store.tasks.filter(task => task.state === state),
        shallow
    );
    const draggedTask = useStore((store) => store.draggedTask);

    const addTaskToStore = useStore((store) => store.addTask);
    const setDraggedTask = useStore((store)=> store.setDraggedTask);
    const moveTask = useStore((store)=> store.moveTask);

    return (
        <div className={classNames('column', {drop: drop})}
            onDragOver={(e) => {
                e.preventDefault();
                setDrop(true);
            }}
            onDragLeave={(e) => {
                e.preventDefault();
                setDrop(false);
            }}
            onDrop={(e) => {
                moveTask(draggedTask, state);
                setDraggedTask(null);
                setDrop(false);
            }}
        >
            <div className='titleWrapper'>
                <p>{state}</p>
                <button type='button' onClick={() => { setOpen(true) }}>Add</button>
            </div>

            {tasks.map((task, i) => <Task key={`${task.title}-${i}`} title={task.title}></Task>)}

            {open && (
                <div className='modal'>
                    <div className='modalContent'>
                        <input type="text" onChange={(e) => setText(e.target.value)} placeholder='Title' />
                        <button type='button' onClick={() => {
                            addTaskToStore(text, state);
                            setText('');
                            setOpen(false);
                        }}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    )
}
