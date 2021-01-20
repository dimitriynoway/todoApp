import React from 'react'

export default function todo({info, onDelete, index}) {

    return (
        <div className="todo">
            <p>{info}</p> 
            <button
            type="button" 
            className="btn-close btn-close-white" 
            aria-label="Close"
            onClick={onDelete}
            ></button>
        </div>
    )

}
