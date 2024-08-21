import React from 'react';
import './Task.css';
import classNames from 'classnames';
import { useStore } from '../store/store';
import { shallow } from 'zustand/shallow';

export default function Task({title}) {
  const task = useStore(store => store.tasks.find(task => task.title === title), shallow);

  return (
    <div className='task'>
        <div>{task.title}</div>
        <div className='bottomWrapper'>
            <div></div>
            <div className={classNames('status', task.state)}>{task.state}</div>
        </div>
    </div>
  )
}
