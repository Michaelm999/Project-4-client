import React from 'react'
//The Front page you will see when you first open the app.
const Front = (props) => {
  return (
    <div>
      <img id="question1" src="https://vignette4.wikia.nocookie.net/community-sitcom/images/a/af/Question_mark.png/revision/latest?cb=20120714155934" alt="Question mark"></img>
      <img id="question2" src="https://vignette4.wikia.nocookie.net/community-sitcom/images/a/af/Question_mark.png/revision/latest?cb=20120714155934" alt="Question mark"></img>
    <h1 className="title"> Welcome to Question This! </h1>
    <p id="body">This is an application for people to ask for any potential questions you have about life.
      <br /><br /><strong>So what are you wating for? Sign in and ask away!</strong></p>
    </div>
  )
}

export default Front
