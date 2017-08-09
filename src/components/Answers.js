import React from 'react'

const Answers = (props) => {

    return(
    <div className='Answers' id={props.title}>
    <li>{props.name}</li>
    </div>
  )

}

export default Answers
