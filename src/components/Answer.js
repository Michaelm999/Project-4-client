import React from 'react'


class Answer extends React.Component


state = {
  currentUser: auth.getCurrentUser(),
  editing: null,
  showquestion: props.name,
  showinfo: props.text,
  showasker: props.asker
  }

  handleAnswerSubmit(evt){
    evt.preventDefault()

    const formData ={
      text: this.refs.text.value,
      answerer: this.state.currentUser.name
    }
    this.props.parent.onAnswerSubmit(formData)
        for(var ref in this.refs) {
        this.refs[ref].value = ''
         }
       }


         editQuestion(id) {
           console.log("Editing:", id)
           editQuestion(id).then((response) => {
             this.setState({
               editing: response.data
             })
           })

         }

        //  cancelEdit() {
        //    this.setState({editing: null})
        //  }

         updateQuestion(id, evt) {
           evt.preventDefault()
           updateQuestion(id).then((response) => {

             this.setState({
               editing: null,
               showquestion: response.data.title
               showinfo: response.data.text
             })
           })
         }


render() {
    return (
      <div className='Show' id={props.title}>
      <h1>{props.name}</h1>
      {this.state.editing ?
        <form onSubmit={props.parent.updateTool.bind(props.parent, props.id)}>
        <input ref="editName" type="text" defaultValue={this.state.editing.title} />
        <input ref="editDescription" type="text" defaultValue={this.state.editing.text} />
        <button>Submit</button>
      :
      <p onClick={props.parent.editTool.bind(props.parent, props.id)}>{props.text}</p>
    }
      <p>Asked by: {props.asker}</p>
      <li>{props.answer.map()}</li>

      <form onSubmit={this.handleAnswerSubmit.bind(this)}>
        <input ref="text" type="text" placeholder="Answer" />
        <button>Respond</button>
      </form>
      </div>
