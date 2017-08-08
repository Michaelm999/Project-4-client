import React, { Component } from 'react';
import auth from '../auth'

class Form extends Component {


state = {
  currentUser: auth.getCurrentUser()
  }

  handleFormSubmit(evt){
    evt.preventDefault()

    const formData ={
      title: this.refs.title.value,
      text: this.refs.text.value,
      asker: this.state.currentUser.name
    }
    this.props.parent.onFormSubmit(formData)
        for(var ref in this.refs) {
        this.refs[ref].value = ''
         }
       }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit.bind(this)}>
        <input ref="title" type="text" placeholder="Title" />
        <input ref="text" type="text" placeholder="Description" />
        <button>Ask Question</button>
      </form>
    )
  }
}

export default Form
