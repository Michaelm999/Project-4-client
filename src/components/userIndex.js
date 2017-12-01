import React from 'react'
//form for displaying the list of questions
const userIndex = (props) => {

    return(
    <div className='Index' id={props.title}>
    <li onClick={props.parent.showQuestion.bind(props.parent, props.index)}>{props.name}</li>
  </div>
  )

}

export default userIndex
