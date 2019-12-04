import React, { Component } from 'react'
import { withRouter, Redirect, Route } from 'react-router-dom'

class PrimiaryLayout extends Component {
  render(){
    if(!localStorage.getItem('login')){
      return(
        <Redirect to="/login"/>
      )
    }
    return(
      <div>
                primiary
      </div>
    )
  }
}
export default withRouter(PrimiaryLayout)