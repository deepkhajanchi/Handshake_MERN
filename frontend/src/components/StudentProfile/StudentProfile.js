import React, { Component } from "react";
import "../../Styles/profile.css";
import "../../App.css";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { fetchStudent } from "../../js/actions/fetchStudent";
import { postMessage } from "../../js/actions/actions_messages";
import { connect } from "react-redux";

const backend ="http://localhost:3001";

class StudentProfile extends Component {
  constructor() {
    super();
    console.log("Hii");
    this.initialState = {
      studentObject: [],
    };
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      redirect: null,
      message: "",
      messages: [],
    };
    this.props = this.initialState;
    this.buildAvatarUrl = this.buildAvatarUrl.bind(this);
  }
  //get the books data from backend
  componentDidMount() {
    console.log("this.props", this.props);
    var studentId = this.props.match.params.id;
    // this.props.fetchStudent(studentId);
    // this.props.fetchStudentDetails(studentId);
    // this.props.fetchEduDetails(studentId);
    // this.props.fetchWorkExpDetails(studentId);
    this.props.fetchStudent(studentId).then(
      (response) => {
        console.log("Student Details are is", response.data);
        this.setState({
          studentObject: this.props.studentObject,
        });
        this.props.studentObject.map((student) => {
          this.setState({
            firstName: student.firstName,
          });
          this.setState({
            lastName: student.lastName,
          });
          this.setState({
            username: student.email,
          });
        });
      },
      (error) => {
        console.log("Student is", error);
      }
    );
  }

  redirecttoUpdateProfilePage() {
    this.props.history.push("/UpdateProfile");
  }

  async sendMessagetoStudent(recStuId, firstName, lastName, username) {
    const userEmail = { username: "Sai@gmail.com" };
    let messageDetails = {
      receiver: {
        username: this.state.username,
        firstname: this.state.firstName,
        lastname: this.state.lastName,
      },
      message: this.state.message,
    };
    console.log();
    var usernameStudent = JSON.parse(window.localStorage.getItem("username"));
    var usersName;
    if (window.localStorage.getItem("firstName")) {
      usersName = JSON.parse(window.localStorage.getItem("firstName"));
    } else {
      usersName = JSON.parse(window.localStorage.getItem("companyName"));
    }
    var lastNameUser;
    if (window.localStorage.getItem("lastName")) {
      lastNameUser = JSON.parse(window.localStorage.getItem("lastName"));
    } else {
      lastNameUser = "Corporation";
    }
    let senderInfo = {
      username: usernameStudent,
      firstname: usersName,
      lastname: lastNameUser,
    };
    let payload2 = {
      messageDetails: messageDetails,
      userEmail: userEmail,
      sender: senderInfo,
    };

    await this.props.postMessage(payload2).then(
      (response) => {
        console.log("posted new message", this.props.messages);
        this.setState({ redirect: `/inbox` });
      },
      (error) => {
        console.log("Student is", error);
      }
    );
  }

  buildAvatarUrl(fileName) {
    return backend + "/file/" + fileName + "/?role=students";
  }

  handleOnChange = (event) => {
    this.setState({ message: event.target.value });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    console.log("In render", this.props.studentObject);
    let myJourneys = this.props.studentObject.map((myJourne) => {
      return (
        <div>
          <Link
            to={`/profile/careerObjective`}
            activeClassName="active"
          ></Link>
          <h4>
            <b>career Objective</b>
          </h4>
          <br />
          <h5>{myJourne.careerObjective}</h5>
        </div>
      );
    });
    let profilePic = this.props.studentObject.map((obj) => {
      if (obj.studentProfilePic) {
        var path = obj.studentProfilePic;
        console.log("Jaffapath,", path);
        return (
          <div key={obj.studentId} className="wrapper2">
            <img
              src={this.buildAvatarUrl(path)}
              className="image--cover3"
              alt="Loading.."
            />
          </div>
        );
      } else {
        var path4 = "default.png";
        return (
          <div key={obj.studentId} className="wrapper2">
            <img
              src={this.buildAvatarUrl(path4)}
              className="image--cover3"
              alt="Loading.."
            />
          </div>
        );
      }
    });
    let studentDetails = this.props.studentObject.map(
      (studentBasicDetailResult) => {
        return (
          <div class="card">
            <h3>
              {studentBasicDetailResult.firstName}{" "}
              {studentBasicDetailResult.lastName}
            </h3>
            <br />
            <br />
            {profilePic}
            <br />
            <br />
            <h5>
              <b>{"Education : "}</b>
              {studentBasicDetailResult.presentlevelOfEducation} {"in"}{" "}
              {studentBasicDetailResult.presentCourse}
            </h5>
            <h5>
              <b>{"Graduation Year : "}</b>
              {studentBasicDetailResult.graduationYear}
            </h5>
          </div>
        );
      }
    );
    let studentDetails2 = this.props.studentObject.map(
      (studentBasicDetailResult) => {
        return (
          <div class="card">
            <h4>
              <b>Contact Information</b>
            </h4>
            <br />
            <h5>
              <b>Phone Number </b>: {studentBasicDetailResult.phoneNumber}
            </h5>
            <h5>
              <b>Address </b>: {studentBasicDetailResult.city}
              {","}
              {studentBasicDetailResult.state}
              {","}
              {studentBasicDetailResult.country}
            </h5>
            <h5>
              <b>DOB </b>: {studentBasicDetailResult.dob}
            </h5>
          </div>
        );
      }
    );
    let studentDetails3 = this.props.studentObject.map(
      (studentBasicDetailResult) => {
        return (
          <div>
            <br />
            <h5>{studentBasicDetailResult.skillSet}</h5>
          </div>
        );
      }
    );

    let studentEducationDetails = "";
    //iterate over books to create a table row
    this.props.studentObject.map((studentAllEduDetailResult) => {
      studentEducationDetails = studentAllEduDetailResult.educations.map(
        (studentEduDetailResult) => {
          return (
            <div class="card">
              <h5>
                <b>College</b> : {studentEduDetailResult.collegeName}
              </h5>
              <h5>
                <b>Degree </b>: {studentEduDetailResult.degree}
              </h5>
              <h5>
                <b>Major </b>: {studentEduDetailResult.major}
              </h5>
              <h5>
                <b>CGPA </b>: {studentEduDetailResult.cgpa}
              </h5>
              <h5>
                <b>Graduating Year</b> : {studentEduDetailResult.yearOfPassing}
              </h5>
            </div>
          );
        }
      );
    });

    let studentWorkDetails = "";
    //iterate over books to create a table row
    this.props.studentObject.map((studentAllWorkDetailResult) => {
      studentWorkDetails = studentAllWorkDetailResult.workExperiences.map(
        (studentWorkDetailResult) => {
          console.log("xxxx::::", studentWorkDetailResult);
          return (
            <div class="card">
              <h5>
                <b>Company</b> : {studentWorkDetailResult.companyName}
              </h5>
              <h5>
                <b>Title</b> : {studentWorkDetailResult.title}
              </h5>
              <h5>
                <b>Duration</b> : {studentWorkDetailResult.startDate}
                {"-"}
                {studentWorkDetailResult.endDate}
              </h5>
              <h5>
                <b>Description</b> : {studentWorkDetailResult.description}
              </h5>
            </div>
          );
        }
      );
    });

    let redirectVar = null;
    if (!JSON.parse(window.localStorage.getItem("cookie"))) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <body>
          <div>
            <input
              name="text"
              type="text"
              class="searchComponent4"
              placeholder=" Message"
              onChange={(event) => this.handleOnChange(event)}
              value={this.state.searchValue}
            />
            <button
              class="btn success"
              onClick={(event) =>
                this.sendMessagetoStudent(
                  event,
                  this.props.match.params.id,
                  this.state.firstName,
                  this.state.lastName,
                  this.state.username
                )
              }
            >
              Start Conversation
            </button>
          </div>
          <div class="row">
            <div class="leftcolumn">
              <div class="card">
                <p>{myJourneys}</p>
              </div>
              <br />
              <h4 class="Profileheading">
                <b>Education</b>
              </h4>

              {studentEducationDetails}
              <br />
              <h4 class="Profileheading">
                <b>Work Experience</b>
              </h4>

              {studentWorkDetails}
            </div>
            <div class="rightcolumn">
              {studentDetails}
              {studentDetails2}
              <div class="card">
                <h4>
                  <b>Skills</b>
                </h4>
                {studentDetails3}
              </div>
            </div>
          </div>
        </body>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  studentObject: state.schools.studentObject,
  messages: state.schools.messages,
});

//export Profile Component
export default connect(mapStateToProps, {
  fetchStudent,
  postMessage,
})(StudentProfile);
