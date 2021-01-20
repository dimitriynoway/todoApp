import React ,{useContext}from 'react'
import {Link,useHistory} from 'react-router-dom'
import UserContext from '../context/userContext'
import './Home.css'
export default function Home() {
    const history = useHistory()
    const {userData, serUserData} = useContext(UserContext)
    return (
        <>
        {
            userData.user?history.push("/user"):<div className="home">
            <div className="homeContainer">
                <h1>Welcome to <strong>Todo</strong>App</h1>
                
                <div className="registerLoginContainer">
                    <Link to='/register'><h1>Register</h1></Link>
                    <Link to='/login'><h1>Login</h1></Link>
                </div>
            </div>
        </div>
        }
        
        </>
    )
}
