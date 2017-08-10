import React from 'react'
import Index from './Index'
import Form from './Form'
import Answers from './Answers'
import auth from '../auth'

class Questions extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      questions: [],
      currentQuestion: { _id: '', title: '', text: '', asker: '', answers: []},
      showQuestion: false,
      editing: null,
      currentUser: auth.getCurrentUser()
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
//button to close the showQuestion page
  close() {
    this.setState({showQuestion: false})
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
      auth.updateQuestion(editData, id).then((response) => {

        const qIndex = this.state.questions.findIndex((question) => {
          return question._id === id
        })

        console.log(qIndex);

        this.setState({
          editing: null,
          questions: [
            ...this.state.questions.slice(0, qIndex),
            response.data.question,
            ...this.state.questions.slice(qIndex + 1)
        ],
        currentQuestion: response.data.question
      })
  })
}

//Function to delete a question
      deleteQuestion(id){
        console.log(id);
      auth.deleteQuestion(id).then((response) => {
        console.log(response)
        this.setState({
        showQuestion: false,
        questions: this.state.questions.filter((question) => {
          return question._id !== id
        })
      })
    })
}

//Function for posting an answer
giveAnswer(evt){
  evt.preventDefault()
  console.log("give the answer")
  const ansData={
    text: this.refs.answer.value,
    answerer: this.state.currentUser.name,
    _questionId: this.state.currentQuestion._id
  }
  auth.giveAnswer(ansData).then((response) => {
    console.log(response)
    this.setState({
      currentQuestion: Object.assign({},this.state.currentQuestion,
        {answers:response.data.question.answers})
    })
    console.log("answer given", this.state);
  })
}

//Creates the area for editing/answering Questions
renderQuestion(){
  return (
    <div className="answerspace">
    {this.state.editing ? (
      //form for editing a question's title and text
      <div id="editform" key={this.state.currentQuestion._id}>
      <form onSubmit={this.updateQuestion.bind(this, this.state.currentQuestion._id)}>
      <input ref="editTitle" type="text" defaultValue={this.state.currentQuestion.title} />
      <input ref="editText" type="text" defaultValue={this.state.currentQuestion.text} />
      <button>Submit</button>
      </form>
      <button className="abortbutton" onClick={this.abort.bind(this)}>Abort</button>
      </div>
    ) : (
      //Form for giving an answer
      <div key={this.state.currentQuestion._id}>
      <h1>{this.state.currentQuestion.title}</h1>
      <p id='questiontext'>{this.state.currentQuestion.text}</p>
      <p id='asker'>Asked by: {this.state.currentQuestion.asker ? this.state.currentQuestion.asker : "Anonymous"}</p>
      <button id="editing" onClick={this.editQuestion.bind(this, this.state.currentQuestion._id)}>
      Edit</button>
    <h2>Answers:</h2>
    <ul className='Answers'>{this.state.currentQuestion.answers.map((answer, index) => (
      <Answers key={answer._id} name={answer.text} answerer={answer.answerer} parent={this} index={index} id={answer._id} />
      ))}
      </ul>
      <form onSubmit={this.giveAnswer.bind(this)} >
      <input id='answerform' ref="answer" type='text' placeholder='Write your answer'></input>
      <button id='answerButton'>Answer</button>
      <button className="abortbutton" onClick={this.close.bind(this)}>Close Page</button>
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
      <h1 id="questiontitle">The Questions!</h1>
      <p id="questionintro">Hello. This is the list of all the questions asked. Feel free to ask any questions you may have.
        <br /> Do not be afraid. There are <strong>no</strong> stupid questions here.</p>
      <Form parent={this}/>
      <ul id="questionlist">{this.state.questions.map((question, index) => (
        <Index key={question._id} name={question.title} parent={this} index={index} id={question._id} />
        ))}
      </ul>

      {this.state.showQuestion ? this.renderQuestion() : null}
      </div>
    )
  }
}

export default Questions
