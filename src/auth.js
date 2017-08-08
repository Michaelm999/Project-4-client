import axios from 'axios'
import jwtDecode from 'jwt-decode'

class Authorize {
  constructor() {
    this.request = axios.create({
      baseURL: 'http://localhost:3001/api',
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
    // tell axios to always include this token in headers:
    this.request.defaults.headers.common.token = token
    return token
  }

  getQuestions(){
    return this.request({method: 'GET', url: '/questions'})
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
    data: {
      title: this.refs.editTitle.value,
      text: this.refs.editText.value
    }
  })
}

  clearToken() {
    // remove token from localStorage:
    localStorage.removeItem('token')
    // tell axios to stop sending with token:
    delete this.request.defaults.headers.common.token

  }
}

export default new Authorize()
