import React from 'react'
//form for displaying the list of questions
const Index = (props) => {

    return(
    <div className='Index' id={props.title}>
    <li onClick={props.parent.showQuestion.bind(props.parent, props.index)}>{props.name}</li>
  </div>
  )

}

export default Index
