import React, {Component} from 'react';
import '../../Styles/companyregister.css';
import {Logo1} from '../../Images/companyreg_logo.svg';
import axios from 'axios';
import {Redirect} from 'react-router';

class CompanyRegister extends Component{
    constructor(props){
        super(props);
        this.state={
            companyName: '',
            email: "",
            city: "",
            state:"",
            country:"",
            password: "",
            signedUp: false
            }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            companyName: this.state.companyName,
            email: this.state.email,
            password: this.state.password,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
        }
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/companysignup', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                this.setState({
                    signedUp: true
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
    render(){
        let redirectVar = null;
        if (this.state.signedUp) {
            redirectVar = <Redirect to='/companysignin' />
        }
        return(
            <div className="employer-registration">
            {redirectVar}
                <div className="employer-registration-header">
                    <div className="employer-registration-header-container">
                    <a className="navbar-brand" href="http://localhost:3000/">
                        <img className="navbar-brand__logo-full" alt="Handshake logo" src={Logo1} />
                    </a>   
                        <div className="spacer"></div>
                        <div className="account-actions">
                            <span className="already-have-an-account white">Already have an account?
                            </span>
                            <a className=" btn btn-primary white" href="/companylogin">Log In</a>
                        </div>
                    </div>
                </div>
                <div className="main">
                        <div className="employer-registration-content">
                            <div className="employer-registration-side-content">

                            </div>
                            <div className="employer-registration-form">
                                <form className="sign-up-form">
                                    <h3>
                                        Sign up as an Employer
                                    </h3>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="control-label">
                                                    Company Name
                                                </label>
                                                <input className="form-control" name="companyName" placeholder="Enter your commpany name" id="company_name" type="text" onChange={this.handleChange} required/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="control-label">
                                                    Email Address(use your work email)
                                                </label>
                                                <input className="form-control" name="email" placeholder="Enter your commpany email" id="email_address" type="email" onChange={this.handleChange}  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">
                                                    Password
                                                </label>
                                                <input className="form-control" name="password" placeholder="Enter your password" id="password" type="password" onChange={this.handleChange} required/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">
                                                    City
                                                </label>
                                                <input className="form-control" name="city" placeholder="City" id="city" type="text" onChange={this.handleChange} required/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">
                                                    State
                                                </label>
                                                <input className="form-control" name="state" placeholder="State" id="state" type="text" onChange={this.handleChange} required/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">
                                                    Country
                                                </label>
                                                <input className="form-control" name="country" placeholder="Country" id="country" type="text" onChange={this.handleChange} required/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <button onClick={this.handleSubmit} className="btn btn-lg btn-primary sign-up-button" type="submit">
                                                Sign Up
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}


//export CompanyReg Component
export default CompanyRegister;