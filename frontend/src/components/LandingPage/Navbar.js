import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import "../../Styles/profile.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout = () => {
    localStorage.removeItem("cookie");
    localStorage.removeItem("username");
    localStorage.removeItem("lastName");
    localStorage.removeItem("companyName");
    localStorage.removeItem("firstName");
    localStorage.removeItem("auth");
  };
  render() {
    var cookie = JSON.parse(window.localStorage.getItem("cookie"));
    let navLogin = null;
    console.log("in componentDidMountaa");
    console.log("in componentDidMountaa", cookie);
    if (cookie) {
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <Link to="/" onClick={this.handleLogout}>
              <span class="glyphicon glyphicon-user"></span>Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      console.log("Not Able to read cookie");
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <Link to="/login">
              <span class="glyphicon glyphicon-log-in"></span> Login
            </Link>
          </li>
        </ul>
      );
    }
    let redirectVar = null;
    var loginFLag = false;
    var studentFlag = false;
    var companyFlag = false;
    if (cookie && cookie.split("+")[1] === "student") {
      console.log("Student");
      redirectVar = <Redirect to="/home" />;
      loginFLag = true;
      studentFlag = true;
    } else if (cookie && cookie.split("+")[1] === "company") {
      console.log("Company");
      redirectVar = <Redirect to="/companyDashboard" />;
      loginFLag = true;
      companyFlag = true;
    }
    var loggedInNav;
    console.log("Flags", loginFLag, studentFlag);
    if (loginFLag && studentFlag) {
      loggedInNav = (
        <div class="navbar-header">
          <a class="navbar-brand">Handshake</a>
          <ul class="nav navbar-nav">
            <li class="li-class">
              <Link to="/home">Jobs</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/applications">Applications</Link>
            </li>
            <li>
              <Link to="/student">Students</Link>
            </li>
            <li>
              <Link to="/inbox">Messages</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
      );
    } else if (loginFLag && companyFlag) {
      loggedInNav = (
        <div class="navbar-header">
          <a class="navbar-brand">Handshake</a>
          <ul class="nav navbar-nav">
            <li class="li-class">
              <Link to="/companyDashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/companyevents">Events</Link>
            </li>

            <li>
              <Link to="/student">Students</Link>
            </li>
            <li>
              <Link to="/inbox">Messages</Link>
            </li>
            <li>
              <Link to="/companyprofile">Profile</Link>
            </li>
          </ul>
        </div>
      );
    } else {
      loggedInNav = (
        <div class="navbar-header">
          <a class="navbar-brand">Handshake</a>
          <ul class="nav navbar-nav">
            <li class="li-class">
              <Link to="/login">Students</Link>
            </li>
            <li>
              <Link to="/companyLogin">Employers</Link>
            </li>
            <li>
              <Link to="/careerCenters">Career Ceters</Link>
            </li>
          </ul>
        </div>
      );
    }

    return (
      <div>
        {redirectVar}
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            {loggedInNav}
            <ul class="nav navbar-nav"></ul>
            {navLogin}
          </div>
        </nav>
        {/* <button
          onClick={this.renderLoginAsStudent.bind(this)}
          class="btn-primaryLanding"
        >
          Login as Student
        </button>
        <br />
        <button
          onClick={this.renderLoginAsCompany.bind(this)}
          class="btn-primaryLanding2"
        > 
          Login as an organization
        </button>*/}
      </div>
    );
  }

  renderLoginAsStudent() {
    this.props.history.push("/login");
  }

  renderLoginAsCompany() {
    // this.props.history.push("/Register");
  }
}

export default Navbar;
