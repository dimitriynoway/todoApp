import React, {useState, useContext} from 'react'
import axios from 'axios'
import './Register.css'
import {Link, useHistory} from 'react-router-dom'
import UserContext from '../context/userContext'
import ErrorInput from '../errors/errorInput'
export default function Register() {
    const {userData, setUserData}=useContext(UserContext)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const history = useHistory()

    const submitForm=async e=>{
        e.preventDefault()

        try {
            const newUser = {email, password, name}
            await axios.post("http://localhost:5000/users/register",newUser)
            const loginRes = await axios.post("http://localhost:5000/users/login",{
                email,
                password
            })
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

    const closeErr = ()=>{
        setError("")
    }

    return (
        <>
        <div className='register'>
            <div className="registerContainer">
                <h1>You are welcome!</h1>
            
            <form onSubmit={e=>submitForm(e)}>
            {
                error&&<ErrorInput err={error} closeErr={closeErr}/>
            }
            <input type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                >                
                </input>
                <input type="text"
                placeholder="Your name..."
                value={name}
                onChange={(e)=>setName(e.target.value)}
                >                
                </input>
                <input type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                >    
                </input>
                <button type="submit">Register</button>
                <div className="regOrLog"><p>Already have accout?</p> <Link to='/login'>Login</Link></div>
            </form>
            </div>
        </div>
        </>
    )
}
