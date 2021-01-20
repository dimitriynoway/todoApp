import React , {useState}from 'react'
import colors from './colors'
import Item from './item'
import NewItem from './newitem'
//import {BrowserRouter as Router,Redirect, Link, Switch, Route} from 'react-router-dom'
import Logo from './logoInNavBar'

export default function Navbar({setEdit,addNewFolder,data,setValue,setData,changeFolder,changeEditHandler,changeEditColorHandler}) {
    
    return (
    <>
    <div className="navigation">
        <Logo/>
        <ul>      
            {
                data.map((item, index)=>{
                    return <Item data={item}
                    key={Math.random()*10000}
                    setData={setData} 
                    index={index}
                    setValue={setValue}
                    changeFolder={changeFolder}
                    changeEditColorHandler={changeEditColorHandler}
                    changeEditHandler={changeEditHandler}
                    />
                    
                })
                
            } 
        </ul>
        <NewItem 
        setEdit={setEdit}
        data={data}
        addNewFolder={addNewFolder}
        
        />
    </div>
    </>
    )
}
