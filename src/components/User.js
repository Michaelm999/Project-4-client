import React from 'react'
import auth from '../auth'
import userIndex from './userIndex'

class User extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: auth.getCurrentUser(),
      editing: null,
      questions: []
      }
   }

   componentDidMount() {
  // this is where an API call for protected content would be made.
  auth.getUserQuestions().then(response => {
    console.log(response.data)
    this.setState({questions: response.data})
  })
}

  //edit User bio.
     editUser(id) {
        console.log("Editing:", id)
        auth.editUser(id).then((response) => {
        this.setState({
          editing: response.data
            })
          })
        }

           abort() {
             this.setState({editing: null})
           }

      updateUser(id, evt) {
      evt.preventDefault()
      const editData={
        name: this.refs.editName.value,
        bio: this.refs.editBio.value
      }
      auth.updateUser(editData, id).then((response) => {

        this.setState({
          editing: null,
          currentUser: response.data.user
      })
  })
 }

  render() {
    const currentUser = this.state.currentUser

    return (
      <div className="userPage">
      {this.state.editing ? (
        //form for editing a question's title and text
        <div key={currentUser._id}>
        <form className="edit-section"onSubmit={this.updateUser.bind(this, currentUser._id)}>
        <input className="editform" ref="editName" type="text" defaultValue={currentUser.name} />
        <input className="editform" ref="editBio" type="text" defaultValue={currentUser.bio} />
        <button className="submitbutton">Submit</button>
        </form>
        <button className="abortbutton" onClick={this.abort.bind(this)}>Abort</button>
        </div>
        ):(
      <div>
      <h1 id="username">{currentUser.name}</h1>
      <p id="bio">
      Bio: {currentUser.bio}
      </p>
      <button id="editing" onClick={this.editUser.bind(this, currentUser._id)}>Edit</button>
      </div>
      )}
      <div>
      <ul id="questionlist">{this.state.questions.map((question, index) => (
        <userIndex key={question._id} name={question.title} parent={this} index={index} id={question._id} />
        ))}
      </ul>
      </div>
      </div>
      )
     }
   }

   export default User
