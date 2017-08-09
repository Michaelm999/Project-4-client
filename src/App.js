import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import auth from './auth'

import NavBar from './components/NavBar'
import User from './components/User'
import Front from './components/Front'
import Questions from './components/Questions'
import SignUp from './components/SignUp'
import LogIn from './components/Login'
import LogOut from './components/Logout'

class App extends Component {

  state = {
      currentUser: auth.getCurrentUser()
    }

    setCurrentUser() {
      this.setState({
        currentUser: auth.getCurrentUser()
      })
    }

    logOut() {
      auth.clearToken()
      this.setState({currentUser: null})
    }

  render() {
    const currentUser = this.state.currentUser
    return (
        <Router>
              <div className="App">
                {currentUser
                  ? <p id='greeting'>Hello: {currentUser.name}</p>
                  : null}
                <NavBar currentUser={this.state.currentUser} />
                <Route exact path='/' component={Front} />
                <Route path='/user' component={User} />
                <Route path='/questions' component={Questions} />
                <Route path='/signup' component={SignUp} />
                <Route path='/login' render={() => (
                    <LogIn onLogIn={this.setCurrentUser.bind(this)} />
                  )} />
                <Route path='/logout' render={() => (
                    <LogOut onLogout={this.logOut.bind(this)} />
                  )}/>
              </div>
            </Router>
    )
  }
}

export default App;