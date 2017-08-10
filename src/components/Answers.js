import React from 'react'

const Answers = (props) => {

    return(
    <div id={props.title}>
    <li>{props.name}</li>
    <li id="answerer">Answered by: {props.answerer}</li>
    </div>
  )

}

export default Answers
