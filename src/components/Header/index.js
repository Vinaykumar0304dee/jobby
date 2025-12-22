import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header">
      <img
        className="header-logo"
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
      />
      <div className="paths-container">
        <Link className="path-item" to="/">
          <p>Home</p>
        </Link>
        <Link className="path-item" to="/jobs">
          <p>Jobs</p>
        </Link>
      </div>
      <button className="logout-btn" type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
