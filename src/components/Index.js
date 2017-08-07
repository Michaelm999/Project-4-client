import React from 'react'

const Index = (props) => {

    return(
    <div onClick={props.parent.showQuestion.bind(props.parent, props.index)} className='Index' id={props.title}>
      {props.title}
    </div>
  )

}

export default Index
