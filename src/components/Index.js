import React from 'react'
//form for displaying the list of questions
const Index = (props) => {

    return(
    <div className='Index' id={props.title}>
    <li onClick={props.parent.showQuestion.bind(props.parent, props.index)}>{props.name}</li>
    <div>
    <button onClick={props.parent.deleteQuestion.bind(props.parent, props.id)}>Delete</button>
    </div>
  </div>
  )

}

export default Index
