import React from 'react'
import auth from '../auth'
import { Redirect } from 'react-router-dom'

class SignUp extends React.Component {
  state = {
    shouldRedirect: false
  }

  formSubmit(evt) {
    evt.preventDefault()
    const formData = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      bio: this.refs.bio.value
    }
    console.log("CREATING ACCOUNT...")
    console.log(formData)
    auth.signUp(formData).then(success => {
      if(success) this.setState({shouldRedirect: true})
    })
  }
  
//does require user to login after signing up.
//Once signUp is done, send the user straigth to the login component.
  render() {
    return (
      this.state.shouldRedirect
      ? <Redirect to='/login' />
      : (
        <div className="SignUp">
          <h1>Create An Account</h1>
          <form onSubmit={this.formSubmit.bind(this)}>
            <input ref="name" type="text" placeholder="Name" />
            <input ref="email" type="text" placeholder="Email" />
            <input ref="password" type="password" placeholder="Password" />
            <input ref="bio" type="text" placeholder="Bio" />
            <button>Create Account</button>
          </form>
        </div>
      )
    )
  }
}

export default SignUp
