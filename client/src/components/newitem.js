import React , {useState, useEffect}from 'react'
import { MdAdd } from 'react-icons/md';
import colors from './colors'
export default function NewItem({addNewFolder,data, setEdit}) {

    const [value,setValue] = useState('')
    const [show, setShow] = useState(false)//if click na 3 dot togda show = false
    const [colorList, setColorList]=useState(colors)
    const [color, setColor] = useState('')

    const pickColorHandler = (i)=>{
        setColorList(state=>{
            return state.map((color,index)=>{
                if(color.active&&index!==i){
                    return {...color, active:false}
                }
                if(!color.active&&index===i){
                    setColor(color.c)
                    return{...color, active:true}
                }
                return color
            })
        })
    }


    useEffect(() => {
        console.log('COLORLIST',color)
    }, [color])

    const submitNewItemHandler = (e) =>{
        e.preventDefault()
        if(!value) return
        if(colorList.findIndex(color=>{
            return color.active===true
        })===-1) return
        const newFolder = {'id':data.length,
        'active': true,
        'folder': value,
         'color':color,
         'openEdit': false,
         'does':[]
       }
        addNewFolder(newFolder)
        setShow(state=>!state)
        setColor('')
        setValue('')
    }

    const showAndHidden = ()=>{
        setShow(state=>!state)
        setEdit()
    }
    return (
        
        <div className="addItem">
            <form onSubmit={(e)=>submitNewItemHandler(e)}>

                    <div className="mainInp">
                    <input 
                    className='inp'
                    value={value}
                    onChange={e=>setValue(e.target.value)}
                    >
                    </input>
                    <MdAdd className='addIcon' 
                    onClick={showAndHidden}
                    />
                    </div>
                    


                    <div className={`addItemHidden ${show?'show':''}`}>
                        <ul>
                            {
                                colorList.map((color,index)=>{
                                    return <li 
                                        
                                                key={Math.random()*10000}
                                                onClick={()=>pickColorHandler(index)} 
                                                className='l'>
                                                <div
                                                
                                                className={`dot ${color.c} ${color.active?'act': ''}`}></div>
                                            </li>
                            })
                            }
                        </ul>
                        <button className="acceptItem">Accept</button>
                    </div>
            </form>
        </div>
        
    )
}
