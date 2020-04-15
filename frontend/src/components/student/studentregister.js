//aria-activedescendant="react-select-3--value" aria-expanded="false" aria-haspopup="false" aria-label="Search" aria-owns="" role="combobox" value="" 
import React, {Component} from 'react';
import '../../Styles/studentregister.css';
import Logo from '../../Images/handshake_fulllogo.svg';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

class Registerform extends Component {
    //constructor method
    constructor(props){
        //constructor of the super class
        super(props);
        this.state={
            schoolName:"",
            firstName:"",
            lastName:"",
            emailID:"",
            passWord:"",
         //   confirmPassword:"",
            authFalg:false
        }
    this.schoolNameChangeHandler= this.schoolNameChangeHandler.bind(this);    
    this.firstNameChangeHandler= this.firstNameChangeHandler.bind(this);
    this.lastNameChangeHandler= this.lastNameChangeHandler.bind(this);
    this.emailIDChangeHandler= this.emailIDChangeHandler.bind(this);
    this.passWordChangeHandler= this.passWordChangeHandler.bind(this);
 // this.confirmPasswordChangeHandler= this.confirmPasswordChangeHandler.bind(this);
    this.createAccount= this.createAccount.bind(this);
    }

    componentWillMount(){
       /* this.setState({
            authFlag: false
        })*/
    }

    schoolNameChangeHandler = (e)=>{
        this.setState({
            schoolName: e.target.value
        })
    }

    firstNameChangeHandler = (e)=>{
        this.setState({
            firstName: e.target.value
        })
    }

    lastNameChangeHandler = (e)=>{
        this.setState({
            lastName: e.target.value
        })
    }

    emailIDChangeHandler = (e)=>{
        this.setState({
            emailID: e.target.value
        })
    }

    passWordChangeHandler = (e)=>{
        this.setState({
            passWord: e.target.value
        })
    }
/*
    confirmPasswordChangeHandler = (e)=>{
        this.setState({
            confirmPassword: e.target.value
        })
    }
*/
    createAccount=(e)=>{
     //   var headers= new Headers();
        console.log("Inside Create account handler");
          e.preventDefault();
            console.log(this.state);
            if(this.state.schoolName && this.state.firstName && this.state.lastName && this.state.emailID && this.state.passWord){
            const data={
                schoolName: this.state.schoolName,
                firstName: this.state.firstName,
                lastName:this.state.lastName,
                emailID:this.state.emailID,
                passWord: this.state.passWord,
               // confirmPassword: this.state.confirmPassword
            }
    /*        
            const { passWord,  confirmPassword}=this.state;
            if(passWord !== confirmPassword){
                alert("Passwords do not match");
              //  this.props.history.push("/");
            }
    */
           //set the with credentials to true
            axios.defaults.withCredentials=true;
            
            //make a post request with the user data
           axios.post('http://localhost:3001/studentsignup/',data)
            .then(response=>{
                console.log("Status Code:", response.status);
                if(response.status === 200){
                    console.log('response.data',response.data);
                    if(response.data!== 'success'){
                        this.setState({
                            message: response.data
                        });
                    }else{
                        this.props.history.push('/');
                    }
                }else{
                    /*this.setState({
                        authFlag:false
                    });*/
                    alert('Sign Up Success!!')
                    this.setState({
                        lead: <Redirect to="/" />
                    })
                }
            
            });
        }
    }

    render(){
        let redirectvar=null;
        if(cookie.load('cookie')){
            redirectvar= <Redirect to="http://localhost:3000/" />
        }
    return(
        <div>
        {redirectvar}
        <div className="reg_body">
             <div className="navbar global-header navbar-fixed-top sidebar-expanded">
                <div className="global-header-container">
                     <a className="navbar-brand" href="https://www.joinhandshake.com">
                        <img className="navbar-brand__logo-full" alt="Handshake logo" src={Logo} />
                    </a>
                </div>
           
            </div>
            <div id="main">
                <div className="row">
                  
                    <div data-bind="visible: true" data-knockout-class= "RegisterNewUserView" className="new-register-form col-md-12">
                    <div className="margin-top">
                        <form onSubmit={this.createAccount} className="simple_form simple-form form-horizontal new_user" id="new_user">
                            <div className='col-md-4 col-md-offset-1 content' data-bind='invisible: prompt_for_linked_account_password'>
                                <h1 className="heading margin-top">
                                    <b>
                                        Join the Handshake community
                                    </b>
                                </h1>
                                <div data-bind="visible:">
                                    <p className= "subtitle">
                                        Discover jobs and interships based on your interest.
                                    </p>
                                </div>
                                <div className="form-group user_user_type">
                                <div className="col-md-12">
                                    <Link to="/companyregister">Are you an employer? Create an account here.</Link> 
                                </div>
                                </div>
                            </div>

                            <div className="col-md-6 content margin-top">
                                <div className="row">
                                    <div className="col-md-12 margin-bottom">
                                        <label>School</label>
                                        <div className="form-group string required school">
                                            <div className="col-md-12">
                                                <input onChange={this.schoolNameChangeHandler} className="form-control tt-hint" name="schoolName" type="text" placeholder="School" required/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 margin-bottom">
                                         <div className="form-group string required school">
                                            <div className="col-md-12">
                                                <div className="content">
                                                    <div className="instruction">
                                            Your school may have already created an account for you, which is pre fileld and ready to go. This account will be registered under your school email address (your .edu email address). Please try <Link to="/">logging in using your school email first.</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    

                                    <div className="col-md-12 margin-bottom">
                                        <label>First Name</label>
                                        <div className="form-group string required user_first_name">
                                            <div className="col-md-12">
                                                <input onChange={this.firstNameChangeHandler} className="form-control tt-hint" name="firstName" type="text" placeholder="First Name" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 margin-bottom">
                                        <label>Last Name</label>
                                        <div className="form-group string required user_last_name">
                                            <div className="col-md-12">
                                                <input onChange={this.lastNameChangeHandler} className="form-control tt-hint" name="lastName" type="text" placeholder="Last Name" required />
                                            </div>
                                        </div>
                                    </div>
                               
                                    <div className="col-md-12 margin-bottom">
                                        <label>Email Address</label>
                                        <div className="form-group string required user_email">
                                            <div className="col-md-12">
                                                Please use your school email<br/>
                                            <input onChange={this.emailIDChangeHandler} className="form-control tt-hint" name="emailID" type="email" placeholder="Email" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 margin-bottom">
                                        <label>Password</label>
                                        <div className="form-group string required user_password">
                                            <div className="col-md-12">
                                            <input onChange={this.passWordChangeHandler} className="form-control tt-hint" name="passWord" type="password" placeholder="Password" minLength="8" required />
                                                <p className="password_hint">
                                                    At least 8 characters
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 margin-bottom">
                                        <button className="btn btn btn-success" type="submit">Create Account</button>
                                    </div>

                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                </div> 
            </div>       
         </div>
         </div>
    );
    }
}


//export Registerform Component
export default Registerform;