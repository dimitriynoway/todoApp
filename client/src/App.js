import React, {useState,useEffect} from 'react'
import './app.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './pages/Navigation'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import User from './pages/User'
import UserContext from './context/userContext'
import axios from 'axios';
function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })

  useEffect(() => {
    const checkLoggedin = async ()=>{
      const token = localStorage.getItem("auth-token")
      if(token==null){
        localStorage.setItem("auth-token", "")
        token=""
      }
      const tokenRes = await axios.post("http://localhost:5000/users/tokenIsValid",
      null,
      {headers:{"x-auth-token":token}}
      )
      if(tokenRes.data){
        const userRes = await axios.get("http://localhost:5000/users/", {
          headers: {'x-auth-token':token}
        })
        setUserData({
          token, 
          user: userRes.data
        })
      }
    }
    checkLoggedin()
  }, [])

  return (
    <Router>
      <UserContext.Provider value={{userData,setUserData}}>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route path="/user">
            <User/>
          </Route>
        </Switch>
      </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
