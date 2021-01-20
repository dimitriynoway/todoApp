import React from 'react'
import colors from './colors'

export default function rowOfColors({c, changeEditColorHandler, v}) {
    return (
    <div className='row'>
            <ul>
            {
                colors.map((color, index)=>{
                    return <li 
                            key={Math.random()*10000}
                            onClick={()=>changeEditColorHandler(index, v)}
                            className='l'>
                            <div className={`d ${color.c} ${color.c===c?'act': ''}`}></div>
                          </li>
                })
            }
            </ul>
        </div>
    )
}
