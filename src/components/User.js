import React from 'react'
import auth from '../auth'

class User extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: auth.getCurrentUser(),
    }
  }


    render() {
      const currentUser = this.state.currentUser

      return (
      <div>
      <h1 id="username">{currentUser.name}</h1>
      <p id="bio">
      Bio: {currentUser.bio}
      </p>
      </div>
      )
      }
    }

   export default User
