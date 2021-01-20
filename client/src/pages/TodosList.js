import React ,{useState,useEffect,useContext}from 'react'
import colors from "../components/colors"
import Navbar from "../components/navbar"
import Todos from "../components/todos"
import Input from "../components/input"
import DATA from "../components/data"
import axios from 'axios'
import userContext from '../context/userContext'
export default function TodosList() {

  const {userData} = useContext(userContext)
  const [data, setData]=useState([])
  useEffect(async() => {
    const d = await axios.post("http://localhost:5000/folder/folders",{userId: userData.user.id})
    setData(state=>{
      return d.data.map((task,index)=>{
        return index===0?{...task, active:true,complited:false}:{...task, active:false,complited:false}
      })
    })
  }, [])
    

    useEffect(() => {
      console.log('HERE IS MY MANE DATA', data)
    }, [data])
    
    const changeEditColorHandler = (index, folderName)=>{
      const folderId = data.find(folder=>folder.active)._id
      setData(currState=>{
        return currState.map((task, i)=>{
          console.log(task)
          if(task.active){
            return ({...task, folder:folderName, color: colors[index].c})
          }
          return task
        })
      })
      axios.post("http://localhost:5000/folder/updateTask",{folderId,folder:folderName,color: colors[index].c})
    }
    const changeEditHandler = ()=>{
      setData(currState=>{
        return currState.map((task, i)=>{
          console.log(task)
          if(task.active){
            return ({...task, openEdit: !task.openEdit})
          }
          return task
        })
      })
    }
  
    const changeFolder = (index) =>{
      setData(currState=>{
        return currState.map((task, i)=>{
          if(i===index&&task.active){
            return task
          }
          if(i!==index&&task.active){
            return ({...task, active:!task.active, openEdit:false})
          }
          if(i===index&&!task.active){
            return ({...task, active:!task.active})
          }
          
          return task
        })
      })
    }
  
    const setValue = (folderName) =>{
      setData(currState=>{
        return currState.map((task, i)=>{
          console.log(task)
          if(task.active){
            return ({...task, folder: folderName})
          }
          return task
        })
      })
    }
    const addNewFolder =async folder =>{
      
      const d = await axios.post("http://localhost:5000/folder/newFolder",
      {
        folderName:folder.folder,color:folder.color,userId:userData.user.id})
      console.log(folder,"We are here")
      console.log(d.data._id)
      folder._id = d.data._id
      setData(state=>[...state.map(task=>({...task, active:false}))
        , folder]
      
      )
    }
  
    const deleteTaskToggler = async(i) =>{
      
      setData(state=>{
        return state.map((todo,index)=>{
          if(todo.active){
            //const temp = todo.does.filter((task,index)=>{
            //  return index!==i
            //})
            return {...todo, does: todo.does.filter((task,index)=>{
                return index!==i
              })}
          }
          return todo
        })
      })
      const folderId = data.find(folder=>folder.active)._id
      const taskId = data.find(folder=>folder.active).does.find((task,index)=>index===i)._id
      const d = await axios.post("http://localhost:5000/folder/deleteTask",
      {
        folderId:folderId,
        taskId:taskId
      })
    }
  
    const newTaskHandler = async(task)=>{
      const folderId = data.find(folder=>folder.active)._id
      const d = await axios.post("http://localhost:5000/folder/addTask",{folderId: folderId,task:task.task,complited:false})
      console.log(d.data)
      setData(state=>{
        return state.map(folder=>{
          if(folder.active){
            return {...folder, does: [...folder.does, task]}
          }
          return folder
        })
      })
      
    }
    const setEdit = ()=>{
      setData(state=>{
        return state.map(folder=>{
          return {...folder, openEdit: false}
        })
      })
    }
    return (
        <>
        <Navbar  
        data={data}
        changeEditColorHandler={changeEditColorHandler}
        changeEditHandler={changeEditHandler}
        changeFolder={changeFolder}
        setData={setData}
        setValue={setValue}
        addNewFolder={addNewFolder}
        setEdit={setEdit}
        
        />
        <div className="main">
        <Todos data={data}
        onDelete={deleteTaskToggler}
        />
        <Input 
        newTaskHandler={newTaskHandler}
        />
        </div>
        </>
    )
}
