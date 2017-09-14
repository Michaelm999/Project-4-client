import axios from 'axios'
import jwtDecode from 'jwt-decode'

class Authorize {
  constructor() {
    this.request = axios.create({
      baseURL: 'https://serene-chamber-30424.herokuapp.com/api',
      headers: {
        common: {
          token: this.getToken()
        }
      }
    })
  }

  signUp(userInfo) {
    return this.request({method: 'POST', url: '/users', data: userInfo})
      .then((response) => response.data.success)
  }

  logIn(credentials) {
    return this.request({method: 'POST', url: '/authenticate', data: credentials})
      .then(response => {
        if(response.data.success) {
          const token = response.data.token
          this.setToken(token)
          return jwtDecode(token)
        } else {
          return false
        }
      })
  }

  getCurrentUser() {
    const token = this.getToken()
    return token ? jwtDecode(token) : null
  }

  getToken() {
    // retrieve token from local storage:
    return localStorage.getItem('token')
  }

  setToken(token) {
    // save token to localStorage:
    localStorage.setItem('token', token)
    // tell axios to always include this token:
    this.request.defaults.headers.common.token = token
    return token
  }

//all of the axios requests pass through auth beneath here.
  getQuestions(){
    return this.request({method: 'GET', url: '/questions'})
  }
  getUserQuestions(){
    return this.request({method: 'GET', url: '/questions/user-questions'})
  }
  addNewQuestion(qData){
    console.log(qData);
    return this.request({method: 'POST', url: '/questions', data: qData})
  }

  deleteQuestion(id) {
  return this.request({method: 'DELETE', url: '/questions/'+id})
}

editQuestion(id) {
  return this.request({method: 'GET', url: '/questions/'+id})
}

updateQuestion(data, id) {
  console.log(data);
  return this.request({
    method: 'PATCH',
    url: '/questions/'+id,
    data: data
  })
}

editUser(id) {
   return this.request({method: 'GET', url: '/users/'+id})
 }

 updateUser(data, id) {
   console.log(data);
  return this.request({
    method: 'PATCH',
     url: '/users/'+id,
     data: data
  })
}

//posting an answer
giveAnswer(data) {
  console.log(data);
  return this.request({method: 'POST', url: '/questions/' + data._questionId + '/answers', data: data})
}

  clearToken() {
    // removes the assigned token from localStorage
    localStorage.removeItem('token')
    // tell axios to stop sending with the given token.
    //this works the same as logging out.
    delete this.request.defaults.headers.common.token

  }
}

export default new Authorize()
