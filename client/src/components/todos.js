import React from 'react'
import Todo from './todo'

export default function todos({data, onDelete}) {

    const activeTask = data.find(oneTask=>oneTask.active)
    
    
    return (
        <div className="todosContainer">
            {
                activeTask?activeTask.does.map((task, index)=><Todo 
                index={index}
                info={task.task}
                key={Math.random()*10000} 
                onDelete={()=>onDelete(index)}/>):[]
            }
        </div>
    )

}
