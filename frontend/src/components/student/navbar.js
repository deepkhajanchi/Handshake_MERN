import React, {Component} from 'react';
import '../../Styles/navbar.css';
import Logo from '../../Images/handshake_loginlogo.svg';
import Avatar from 'react-avatar';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Navbar extends Component{
    constructor(props){
        super(props);
        this.handleLogout= this.handleLogout.bind(this);
      }
      
     handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }

      render(){
        let redirectVar=null;
      return(
        <div className= "layout-wide-dashboard">
          <div data-turbolinks-permanent="" id="permament-topbar">
            <div data-react-class="StudentTopbarWhiteRoot">
              <div>
                <div>
                  <div>
                    <nav className="styl__topbar-container___1KZxh" data-hook="student-topbar">
                        <div className="styl__topbar___2_YGJ">
                          <div className="styl__container___15r1p styl__large___3HKaH styl__fitted___2ndoo" data-hook="container">
                            <div className="styl__content___oQxb0">
                              <div className="styl__logo-container___3_yW2">
                                <a href="/studentlanding" aria-label="Homepage">
                                <img id= "logo-icon" className="styl__logo-icon___38kkg" alt='Handshake logo' viewBox="0 0 80.1 96.1" src={Logo} width="32" height="32"/>
                                    <title>
                                      Handshake
                                    </title>
                                    <path className="styl__logo-icon-content___25oa_" d="
                                        M76.6 42.9c-1.6-.6-9.2-2.4-19
                                        .1-24.6 6.3-29.1-6.6-39.5-9.6-2.4-.7-12.2-1.5-15.9.4-1.3.7-2.2
                                        2.3-2.2 3.8 0 6.7-.1 36.8-.1 51 0 4.1 3.3 7.4 7.4
                                        7.4h15.4c4 0 7.3-3.3 7.4-7.3.1-12.4.3-33.7.3-36.1
                                        0-.9.5-1.1 1.6-1.4 9.8-2.5 17.4 3 17.6 10.7.2 8.5.4
                                        18.3.4 26.8 0 4 3.3 7.3 7.3 7.3 4.6 0 10.4.1 15.3.1
                                        4 0 7.3-3.3 7.3-7.3 0-13.7.1-33.3.1-41.4 0-2.4-1.4-3.7-3.4-4.5zM66.5
                                        36.8c7.5 0 13.6-6.1 13.6-13.6S74 9.6 66.5 9.6s-13.6 6.1-13.6
                                        13.6c0 7.6 6.1 13.6 13.6 13.6zM14.3 28.6c7.9 0 14.3-6.4 14.3-14.3S22.2
                                        0 14.3 0 0 6.4 0 14.3s6.4 14.3 14.3 14.3z">
                                    </path>
                                </a>
                                <div className="styl__search-container___2WuPw">
                                  <div className="styl__search___ttQsV" data-hook="student-topbar-global-search">
                                    <div className="Select is-clearable is-searchable Select--single">
                                      <div className="Select-control">
                                        <span className="Select-multi-value-wrapper" id="react-select-3--value">
                                          <div className="Select-input">
                                            <div className="Select-placeholder">
                                            <input type="text" id="global-search" placeholder="Search"/>
                                            </div>
                                          </div>
                                        </span>
                                        <span className="Select-arrow-zone">
                                          <span className="Select-arrow">

                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                    <svg className="svg-inline--fa fa-search fa-w-16 fa-fw styl__search-icon___2eV2v icon" aria-hidden="true" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z">

                                    </path>
                                    </svg>
                                  </div>
                                  </div>
                                </div>

                                <a href="/jobpostings" className="styl__nav-link___2JgVu styl__nav-link___3jrqE">
                                <span className="spanclass">
                                    <span>Jobs</span>
                                      <div data-hook="badge" className="styl__badge___2eGTL styl__badge___PwOxT">
                                        
                                      </div>
                                  </span>
                                </a>

                                <a href="/events" className="styl__nav-link___2JgVu styl__nav-link___3jrqE">
                                  <span className="spanclass">
                                    <span>Events</span>
                                    <div data-hook="badge" className="styl__badge___2eGTL styl__badge___PwOxT">
                                        
                                      </div>
                                  </span>
                                </a>

                                <a href="/studentsearch" className="styl__nav-link___2JgVu styl__nav-link___3jrqE">
                                  <span className="spanclass">
                                    <span>
                                      Students
                                    </span>
                                  </span>
                                </a>

                                <a href="/messages" className="styl__nav-link___2JgVu styl__nav-link___3jrqE">
                                  <span data-hook="student-topbar-messages-link">
                                    <span className="spanclass">
                                      Messages
                                    </span>
                                  </span>
                                </a>

                                <div className="dropdown pull-right styl__dropdown___3v4V2">
                                 
                                  <button className="account-dropdown-nav" aria-label="navigation modal button" aria-haspopup="true" aria-expanded="false" className="styl__dropdown-button___1ECNT-nav dropdown-toggle" data-toggle="dropdown" type="button">
                                    
                                      <Avatar size="50px" round={true} name="MT"/>
                                    
                                  </button>
                                  
                                  <div className="dropdown-menu-nav styl__dropdown-menu___bD8sz-nav styl__fade___kx_5J-nav" aria-labelledby="account-dropdown" role="menu">
                                        <Link to="/studentprofile">My Profile</Link>
                                         <Link to="/resume">Resume</Link>
                                         <Link to="/applications">Applications </Link>
                                         <Link to="/reviews">Reviews</Link>
                                         <Link to="/settings">Settings</Link>
                                         <Link to="/" onClick={this.handleLogout}>Log Out</Link>
                                  </div>

                                </div>
                                </div>
                            </div>
                          </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      }
    }
    
  //export Loginform Component
  export default Navbar;