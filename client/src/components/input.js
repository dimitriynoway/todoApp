import React , {useState}from 'react'

export default function Input({newTaskHandler}) {
    
    const [value, setValue]=useState('')

    const submitFormToggle = (e)=>{
        e.preventDefault()
        if(!value) return
        const task = {'task': value}
        newTaskHandler(task)
        setValue('')
    }

    return (
        <div className='newTaskInput'> 
            <form className="subForm"
            onSubmit={e=>submitFormToggle(e)}>
                <ul>
                    <li>
                <input
                type="text"
                className="text"
                placeholder="Enter..."
                value={value}
                onChange={(e)=>setValue(e.target.value)}
                >
                    
                </input>
                    </li>
                    <li>
                <button className="submit">Submit</button>
                    </li>
                </ul>
            </form>
        </div>
        
    )
}
