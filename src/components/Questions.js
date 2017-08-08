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
      showquestion: []
    }
  }

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

    showQuestion(i){
    console.log(i);
    this.setState({
      showquestion: [this.state.questions[i].title,
    this.state.questions[i].text,
    this.state.questions[i].asker]
    })
  }

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

render() {
  console.log(this.state);
    return (
      <div>
      <h1>The Questions</h1>
      <Form parent={this}/>
      <ul>{this.state.questions.map((question, index) => (
        <Index key={question._id} name={question.title} parent={this} index={index} id={question._id} />
        ))}
        </ul>
      <p>{this.state.showquestion}</p>
        </div>
    )
  }
}

export default Questions
