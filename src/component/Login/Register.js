import React, { Component } from "react";
import "./login.css";
import { withRouter } from 'react-router-dom';
import Header from "../Header"

const registerUrl = "https://xregisterapi.herokuapp.com/api/auth/register";

class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            phone: '',
            message: ''
        }
    }

    handleChange = (event) => {
        // console.log("value", event.target.value)
        this.setState({ [event.target.name]: event.target.value });
    };


    handleSubmit = () => {
        fetch(registerUrl, {
            method: "POST",
            headers: {
                'accept': "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify(this.state),
        }).then((res) => res.json())
            .then((data) => {
                if (data.auth === false) {
                    this.setState({ message: data.token });
                } else {
                    // this.setState({message:data.token});
                    // console.log("registered")
                    this.props.history.push('/login')
                }
            })
    };


    render() {
        //     console.log(`message`, this.state.message)
        return (
            <>
                <Header />
                <div className="container  d-flex justify-content-center">
                    <div className="card my-5 border border-danger" style={{ width: "30%" }}>
                        <h5 className="card-header text-center text-light bg-danger">Register</h5>
                        <div className="card-body">
                            <h5 className="text-danger">{this.state.message}</h5>
                            <div className="mb-3">
                                <label for="name" className="form-label">Name</label>
                                <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label for="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label for="phone" className="form-label">Phone no.</label>
                                <input type="phone" className="form-control" name="phone" value={this.state.phone} onChange={this.handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label for="password" className="form-label">Password</label>
                                <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleChange} required />
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="button" className="btn btn-danger px-5" onClick={this.handleSubmit}>
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Register);
