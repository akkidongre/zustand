import React from 'react';
import './Task.css';
import classNames from 'classnames';
import { useStore } from '../store/store';
import { shallow } from 'zustand/shallow';

export default function Task({title}) {
  const task = useStore(store => store.tasks.find(task => task.title === title), shallow);
  const deleteTask = useStore((store) => store.deleteTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);

  return (
    <div className='task' draggable onDragStart={() => {setDraggedTask(title)}}>
        <div>{task.title}</div>
        <div className='bottomWrapper'>
            <div className='delete' role='button' onClick={() => {deleteTask(title)}}>Delete</div>
            <div className={classNames('status', task.state)}>{task.state}</div>
        </div>
    </div>
  )
}
