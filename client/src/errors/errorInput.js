import React from 'react'
import './errorInput.css'
export default function ErrorInput({err, closeErr}) {
    return (
        <div className="error-input">
            <span>{err}</span>
            <button onClick={()=>closeErr()}>X</button>
        </div>
    )
}
