import React ,{useContext}from 'react'
import './Navigation.css'
import {Link,useHistory} from 'react-router-dom'
import '../context/userContext'
import UserContext from '../context/userContext'
export default function Navigation() {
    const {userData, setUserData} = useContext(UserContext)

    const logout = ()=>{
        setUserData(state=>{
            return {
                token: undefined,
                user: undefined
            }
        })
        localStorage.setItem("auth-token","")
    }
    return (
        <div className="a">
            {
                userData.user?<Link to="/" onClick={logout}>Log out</Link>:<Link to="/">Home</Link>
            }
        </div>
    )
}
