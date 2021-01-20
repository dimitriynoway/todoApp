import React,{useState, useEffect,useContext} from 'react'
import colors from './colors'
import { BiDotsVerticalRounded } from 'react-icons/bi';
import RowOfColors from './rowOfColors'
export default function Item({data,setData,index,changeFolder,setValue,changeEditHandler,changeEditColorHandler}) {
    const [value, sValue]=useState(data.folder)
    const [open, setOpen]=useState(data.openEdit)

    const click =()=>{
        if(data.active){
        setValue(value)
        changeEditHandler()
    } 
    }
    
    useEffect(() => {
        console.log(value)
    }, [value])
    return (
        <>   
        {
            data?
            <>
            <div className='e'>
                <li onClick={()=>changeFolder(index)}className={`sidebarLi ${data.active?'active':''}`} >
                    <div className={`dot ${data.color}`}>
                    </div>
                    <p>
                    {value}
                    </p>
                </li>
        
                    <BiDotsVerticalRounded className={`threeDotIcon`} onClick={click}/>
                    
                </div>
                <div className={`deleteFrame ${data.openEdit?'sh': ''}`}>
                    <input 
                    className='inpEdit'
                    value={value}
                    onChange={(e)=>sValue(e.target.value)}
                ></input>
                    <RowOfColors c={data.color} changeEditColorHandler={changeEditColorHandler} v={value}/>
                    <button onClick={()=>click()}className="acceptItem">Accept</button>
            </div>
            
            </>:null
        } 
        
        
        </>
    )
}
