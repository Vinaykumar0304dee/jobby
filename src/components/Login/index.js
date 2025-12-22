import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', onShownErrmsg: false, errMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    const {history} = this.props
    history.replace('/')
  }

  onFailureLogin = errMsg => {
    this.setState({errMsg, onShownErrmsg: true})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = ' https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      return this.onSuccessLogin(data.jwt_token)
    }
    return this.onFailureLogin(data.error_msg)
  }

  usernameRender = () => {
    const {username} = this.state
    return (
      <>
        <label className="label-text" htmlFor="username">
          USERNAME
        </label>
        <input
          className="input-container"
          id="username"
          placeholder="username"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  passwordRender = () => {
    const {password} = this.state
    return (
      <>
        <label className="label-text" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="input-container"
          id="password"
          placeholder="password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {onShownErrmsg, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.onSubmitLogin}>
          <img
            className="login-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="item-container">{this.usernameRender()}</div>
          <div className="item-container">{this.passwordRender()}</div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {onShownErrmsg && <p>{errMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
