import React from 'react'
import auth from '../auth'

class userPage extends React.Component {

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
  </div>
  )
  }
}
export default userPage
