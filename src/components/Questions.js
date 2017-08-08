import React from 'react'
import Index from './Index'
import Form from './Form'
import auth from '../auth'
import axios from 'axios'

class Questions extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      questions: [],
      currentQuestion: { _id: '', title: '', text: '', asker: '', answers: []},
      showQuestion: false,
      editing: null
    }
  }
//calling the questions
componentDidMount() {
    auth.getQuestions().then((response) => {
        console.log("Finding")
        console.log(this.state)
        console.log(response.data);
        this.setState({questions: response.data})
      })
    }

    onFormSubmit(data) {
          console.log(data);
          auth.addNewQuestion(data).then((response) => {
            console.log(response.data);
            this.setState({
              questions: [...this.state.questions, response.data]
            })
          })
      }
//show an individual question, and provide a space for answering
    showQuestion(i){
      console.log(i);
      this.setState({
        currentQuestion: this.state.questions[i],
        showQuestion: true
      })
  }

//set the state for editing.
     editQuestion(id) {
        console.log("Editing:", id)
        auth.editQuestion(id).then((response) => {
        this.setState({
          editing: response.data
            })
          })
        }

           abort() {
             this.setState({editing: null})
           }

      updateQuestion(id, evt) {
      evt.preventDefault()
      const editData={
        title: this.refs.editTitle.value,
        text: this.refs.editText.value
      }
      auth.updateQuestion(id).then((response) => {

      const qIndex = this.state.questions.findIndex((question) => {
          return question._id === id
        })

        this.setState({
        editing: null,
        questions: [
        ...this.state.questions.slice(0, qIndex),
        response.data.question,
        ...this.state.questions.slice(qIndex + 1)
      ]
    })
  })
}

//Function to delete a question
      deleteQuestion(id){
        console.log(id);
      auth.deleteQuestion(id).then((response) => {
      console.log(response)
      this.setState({
        questions: this.state.questions.filter((question) => {
          return question._id !== id
        })
      })
    })
}

//Function for posting an answer
giveAnswer(evt){
  evt.preventDefault()
  console.log("give the answer");
}

//Creates the area for editing/answering Questions
renderQuestion(){
  return (
    <div className="answerkey">
    {this.state.editing ? (
      //form for editing a question's title and text
      <div key={this.state.currentQuestion._id}>
      <form onSubmit={this.updateQuestion.bind(this, this.state.currentQuestion._id)}>
      <input ref="editTitle" type="text" defaultValue={this.state.editing.title} />
      <input ref="editText" type="text" defaultValue={this.state.editing.text} />
      <button>Submit</button>
      </form>
      <button onClick={this.abort.bind(this)}>Abort</button>
      </div>
    ) : (
      //Form for giving an answer
      <div key={this.state.currentQuestion._id}>
      <h1>{this.state.currentQuestion.title}</h1>
      <p>{this.state.currentQuestion.text}</p>
      <p>Asked by: {this.state.currentQuestion.asker}</p>
      <button id="editing" onClick={this.editQuestion.bind(this, this.state.currentQuestion._id)}>
      Edit</button>
      <form onSubmit={this.giveAnswer.bind(this)} >
      <input type='text'></input>
      <button id='answerButton'>Answer</button>
    </form>
    </div>
      )
    }
    </div>
  )
}

// List of questions Asked
//underneath that is a space where question details and the form for answers is rendered
render() {
  console.log(this.state);
    return (
      <div>
      <h1>The Questions</h1>
      <p>Feel free to ask away. Do not be afraid. There are <strong>no</strong> stupid questions here.</p>
      <Form parent={this}/>
      <ul>{this.state.questions.map((question, index) => (
        <Index key={question._id} name={question.title} parent={this} index={index} id={question._id} />
        ))}
        </ul>

      {this.state.showQuestion ? this.renderQuestion() : null}
      </div>
    )
  }
}

export default Questions
