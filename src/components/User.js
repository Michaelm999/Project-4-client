import React from 'react'
import auth from '../auth'

class User extends React.Component {

  state = {
      currentUser: auth.getCurrentUser()
    }

render() {
  const currentUser = this.state.currentUser

  return (
  <div>
  <h1>{currentUser.name}</h1>
  <p>
  {currentUser.bio}
  </p>
  <ul></ul>
  </div>
  )
  }
}
export default User
