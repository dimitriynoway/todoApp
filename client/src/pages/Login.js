import React, {useState, useEffect,useContext} from 'react'
import axios from 'axios'
import './Register.css'
import {Link, useHistory} from 'react-router-dom'
import UserContext from '../context/userContext'
import ErrorInput from '../errors/errorInput'
export default function Register(props) {
    const {setUserData} = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")

    const history = useHistory()
    const login=async e=>{
        e.preventDefault()
        try {
            const user = {password, email}
            const loginRes = await axios.post("http://localhost:5000/users/login",user)
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            })
            localStorage.setItem("auth-token", loginRes.data.token)
            history.push("/user") 
        } catch (err) {
            err.response.data.msg&&setError(err.response.data.msg)
        }
        
    }
    const closeErr=()=>{
        setError("")
    }

    return (
        <>
        <div className='register'>
            <div className="registerContainer">
                <h1>You are welcome!</h1>
            
            <form onSubmit={e=>login(e)}>
            {
                error&&<ErrorInput err={error} closeErr={closeErr}/>
            }
            <input type="email"
                placeholder="Email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                >                
                </input>
                <input type="password"
                placeholder="Create a password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                >    
                </input>
                <button type="submit">Log in</button>
                <div className="regOrLog"><p>Do not have account?</p> <Link to='/register'>Register</Link></div>
            </form>
            </div>
        </div>
        </>
    )
}
