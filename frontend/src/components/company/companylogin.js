import React, {Component} from 'react';
import '../../Styles/studentlogin.css';
import Logo1 from '../../Images/handshake_loginlogo.svg';
import Logo3 from '../../Images/handshake_logindesign1.svg';
import Logo5 from '../../Images/handshake_logindesign.svg';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from "react-redux";
import { companyLogin } from '../../js/actions/loginAction';

class CompanyLogin extends Component{
    constructor(props){
        super(props);
        this.state={
          email: "",
          password: "",
          authFlag: false
        }

      this.emailChangeHandler= this.emailChangeHandler.bind(this);
      this.passwordChangeHandler= this.passwordChangeHandler.bind(this);
      this.submitLogin= this.submitLogin.bind(this);
    }
    componentWillMount(){
      this.setState(
        {
          authFlag:false
        }
      )
    }

    emailChangeHandler = (e)=>{
        this.setState({
            email: e.target.value
        })
    }

    passwordChangeHandler = (e)=>{
        this.setState({
            password: e.target.value
        })
    }

    submitLogin=(e)=>{
     // var headers= new Headers();
      //prevent page from refresh
      e.preventDefault();
     // if(this.state.email && this.state.password){
        const data={
          email: this.state.email,
          password: this.state.password
        }
        this.props.companyLogin(data);
        /*
        axios.default.withCredentials=true;
        axios.post('http://localhost:3001/API/Company/company_login',data)
        .then(response=>{
          console.log("status code:",response.status);
          if(response.status === 200){
            this.setState({
              authFlag: true
            })
            }else{
              this.setState({
                authFlag:false
              })
            }
        });
        */
    }
    render(){
        let redirectVar=null;
        let alertElement=null;
        if(cookie.load('CID')){
          redirectVar=<Redirect to="/companyprofile" />
        }
        if(this.props.isLoggedIn != null && !this.props.isLoggedIn) {
          alertElement = <p className='alert alert-danger'>{this.state.msg}</p>
      }
        return(
            <div className="login-v2-container">
              {redirectVar}
              <div className="main">
                <div className="centered-container">
                
                <div className="col-md-12 margin-bottom">
                      <label>Employer Email </label>
                         <div className="form-group string required user_email">
                             <div className="col-md-12">
                    
                                 <input onChange={this.emailChangeHandler} className="form-control tt-hint" name="email" type="email" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
                              </div>
                          </div>
                </div>
                <br></br>
                <div className="col-md-12 margin-bottom">
                      <label>Password</label>
                            <div className="form-group string required user_email">
                              <div className="col-md-12">
                                 <input onChange={this.passwordChangeHandler} className="form-control tt-hint" name="password" type="password" placeholder="Password" required />
                              </div>
                            </div>
                </div>
                <br>
                </br>
                <div className="sso-button">
                      <button onClick={this.submitLogin} className="btn btn btn-success"> Sign In</button>
                </div>
                {alertElement}
                <div><h4>{this.state.message}</h4></div>
                </div>
      
                <div className="absolute no-account">
                    No account? 
                    <b><Link to='/studentregister'> Sign Up here.</Link></b>
                </div>
               </div>
      
              <div className="sidebar">
                <a className="logo" href="https://www.joinhandshake.com">
                  <img alt='Handshake logo' height='42' src={Logo1}/>
                </a>
      
                <div className='content'>
                  <h1 className='marketing-title'>
                  Get the job done .
                    &nbsp;
                  </h1>
                  <div className='marketing-content'>
                    <h3>Students</h3>
                      <p>Launch the next step in your career.</p>
                    <h3>Employers</h3>
                      <p>Hire the next generation of talent.</p>
                    <h3>Career Centers</h3>
                      <p>Bring the best jobs to your students.</p>
                  </div>
                  <div className='marketing-learn-more'>
                    <a data-track-click="login-v2-clicked-learn-more" href="https://www.joinhandshake.com">Learn More</a>
                  </div>
      
                  <img className='absolute middle-stroke-web' alt='handshake_logindesign' role='presentation' src={Logo5} />
      
                  <img className='absolute bottom-stroke-web' alt='handshake_logindesign3' role='presentation' src={Logo3} />
      
              </div>
              </div>
              </div>
           
          );
          }
        }

        function mapStateToProps(state) {
          return {
              isLoggedIn: state.Login.isLoggedIn
          };
      }
      //export Loginform Component
      export default connect(mapStateToProps, { companyLogin })(CompanyLogin);