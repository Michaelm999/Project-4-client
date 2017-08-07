import React from 'react'
import Index from './Index'
import axios from 'axios'


class Questions extends React.Component{
state = {
  questions: [],
  showquestion: []
}

componentDidMount() {
  axios({url: './questions'}).then((response) => {
        console.log("Fetching...")
        this.setState({questions: response.data.questions})
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

render() {
    return (
      <div>
      <h1>The Questions</h1>
      <ul>{this.state.questions.map((question, index) => (
        <Index key={question._id} name={question.title} parent={this} index={index} />
        ))}
        </ul>
        </div>
    )
  }
}

export default Questions
