import React, { Component } from 'react'
import { withRouter, Redirect, Route } from 'react-router-dom'

class Login extends Component {

login=()=>{
  localStorage.setItem("login",true)
}

render(){
  if(localStorage.getItem("login")){
    return(
      <Redirect to="/" />
    )
  }
  return(
    <div>
                login
      <button onClick={this.login}>
      </button>
    </div>
  )
}
}
export default withRouter(Login)