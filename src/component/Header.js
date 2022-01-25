import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";
import { withRouter } from 'react-router-dom';



const userURL = 'https://xregisterapi.herokuapp.com/api/auth/userinfo'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userdata: ''
    }
  }

  handleLogout = () => {
    this.setState({ userdata: '' })
    localStorage.removeItem('userdata')
    localStorage.removeItem('ltk')
    this.props.history.push('/')
  }

  conditionalHeader = () => {
    if (this.state.userdata.name) {
      let data = this.state.userdata;
      let output = [data.name, data.email, data.phone, data.role]
      localStorage.setItem('userdata', output)
      // console.log("output>>", data)
      return (<>
        <Link to="/viewBooking"><h5 className=" text-light me-3 mt-2">Hi {output[0]}</h5></Link>
        <button type="button" className="btn btn-outline-light text-light" onClick={this.handleLogout}>Logout</button>
      </>
      )
    } else {
      // console.log("output",this.state.userdata.name)
      return (<>
        <Link to={'/login'} className="btn btn-outline-light text-light me-3 px-3">Login</Link>
        <Link to={'/register'} className="btn btn-outline-light text-light" >Register</Link>
      </>)

    }

  }



  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <div className="container">
          <Link to="/" className="navbar-brand ">Xomatoaps</Link>
          <div className="navbar-header ">
            <button className="navbar-toggler btn-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">
              {this.conditionalHeader()}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
  componentDidMount() {
    fetch(userURL, {
      method: 'GET',
      headers: {
        'x-access-token': localStorage.getItem('ltk')
      }
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          userdata: data
        })
      })
  }
}

export default withRouter(Header);