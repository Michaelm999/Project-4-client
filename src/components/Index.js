import React from 'react'

const Index = (props) => {

    return(
    <div onClick={props.parent.showQuestion.bind(props.parent, props.index)} className='Index' id={props.title}>
      {props.name}
    <div>
    <button onClick={props.parent.deleteQuestion.bind(props.parent, props.id)}>Delete</button>
    </div>
  </div>
  )

}

export default Index
