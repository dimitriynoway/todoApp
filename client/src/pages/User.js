import React, {useContext} from 'react'
import { Redirect } from 'react-router-dom'
import UserContext from '../context/userContext'
import TodosList from './TodosList'

export default function User() {
    const {userData} = useContext(UserContext)  

    return (
        <div className="box">
            {
                userData.token? 
                <TodosList/>
                :<Redirect to="/"/>
            }
        </div>
    )
}
