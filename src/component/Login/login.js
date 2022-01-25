import React, { Component } from 'react';
import "./login.css";
import { withRouter } from 'react-router-dom';
import Header from "../Header"


const loginURL = 'https://xregisterapi.herokuapp.com/api/auth/login'

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            message: ''
        }
    }

    handleChange = (event) => {
        // console.log("value", event.target.value)
        this.setState({ [event.target.name]: event.target.value });
    };


    handleSubmit = (e) => {
        fetch(loginURL, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })

            .then((res) => res.json())
            .then((data) => {
                if (data.auth === false) {
                    this.setState({ message: data.token });
                } else {
                    localStorage.setItem('ltk', data.token)
                    this.props.history.push('/')
                }
            })
    }

    render() {
        return (
            <>
                <Header />
                <div className="container  d-flex justify-content-center">
                    <div className="card my-5 border border-danger" style={{ width: "30%" }}>
                        <h5 className="card-header text-center text-light bg-danger">Login</h5>
                        <div className="card-body">
                            <h5 className="text-danger">{this.state.message}</h5>
                            <div className="mb-3">
                                <label for="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleChange} />
                            </div>
                            <div className="mb-3">
                                <label for="password" className="form-label">Password</label>
                                <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleChange} />
                            </div>
                            <div className=" d-flex justify-content-center">
                                <button type="button" className="btn btn-danger px-4" onClick={this.handleSubmit}>
                                    Login Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(Login)
