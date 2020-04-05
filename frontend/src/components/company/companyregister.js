import React, {Component} from 'react';
import '../../Styles/companyregister.css';
import {Logo1} from '../../Images/companyreg_logo.svg';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

class CompanyRegister extends Component{
    constructor(props){
        super(props);
        this.state={
        company_email: "",
        company_passWord: "",
        authFlag: false
        }
    }
    render(){
        return(
            <div className="employer-registration">
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
                                                <input className="form-control" id="company_name" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="control-label">
                                                    Email Address(use your work email)
                                                </label>
                                                <input className="form-control" id="email_address" type="email" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">
                                                    Password
                                                </label>
                                                <input className="form-control" id="password" type="password" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">
                                                    City
                                                </label>
                                                <input className="form-control" id="location" type="location" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">
                                                    State
                                                </label>
                                                <input className="form-control" id="location" type="location" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">
                                                    Country
                                                </label>
                                                <input className="form-control" id="location" type="location" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <button className="btn btn-lg btn-primary sign-up-button" type="submit">
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