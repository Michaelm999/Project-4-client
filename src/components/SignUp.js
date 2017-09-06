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
            <input className="input is-info" ref="name" type="text" placeholder="Name" />
            <input className="input is-info" ref="email" type="text" placeholder="Email" />
            <input className="input is-info" ref="password" type="password" placeholder="Password" />
            <input className="input is-info" ref="bio" type="text" placeholder="Bio" />
            <button className="button is-success">Create Account</button>
          </form>
        </div>
      )
    )
  }
}

export default SignUp
