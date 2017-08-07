import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import auth from './auth'

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
    return (
        <Router>
              <div className="App">
                <NavBar currentUser={this.state.currentUser} />
                <Route exact path='/' component={Front} />
                <Route path='/vip' render={() => (
                    currentUser
                    ? <Questions />
                  : <Redirect to='/login' />
              )} />
                <Route path='/signup' component={SignUp} />
                <Route path='/login' render={() => (
                    <LogIn onLogIn={this.setCurrentUser.bind(this)} />
                  )} />
                <Route path='/logout' render={() => (
                    <LogOut onLogout={this.logOut.bind(this)} />
                  )}/>
              </div>
            </Router>
    );
  }
}

export default App;
