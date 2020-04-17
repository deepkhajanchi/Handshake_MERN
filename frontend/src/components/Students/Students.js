import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import {
  fetchAllStudents,
  studentSearchComp,
} from "../../js/actions/fetchStudent";
import { connect } from "react-redux";

const backend ="http://localhost:3001";

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      studentId: 1,
      studentBasicDetailsResult: [],
      studentAllDetailsResult: [],
      redirect: null,
      searchValue: "",
      next: "",
      prev: "",
      pageLimit: "5",
    };
    this.initialState = {
      allStudents: [],
    };
    this.props = this.initialState;
    this.getProfileDetails = this.getProfileDetails.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.buildAvatarUrl = this.buildAvatarUrl.bind(this);
  }
  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };
  handleSearch = () => {
    console.log("In Student Search", this.state.searchValue);
    this.props.studentSearchComp(this.state.searchValue).then(
      (response) => {
        console.log("Students are is", this.props.allStudents);
        this.setState({
          students: this.props.allStudents,
        });
      },
      (error) => {
        console.log("Events is", error);
      }
    );
  };
  //get the books data from backend
  componentDidMount() {
    console.log("in componentDidMount");
    if (JSON.parse(window.localStorage.getItem("cookie"))) {
      const data = {
        page: "1",
        limit: this.state.pageLimit,
      };
      this.props.fetchAllStudents(data).then(
        (response) => {
          console.log("Student Details are is", this.props.allStudents);
          this.setState({
            students: this.state.students.concat(
              this.props.allStudents[0].data.results
            ),
          });
          if (this.props.allStudents[0].data.next) {
            this.setState({
              next: this.props.allStudents[0].data.next.page,
            });
          }
          this.setState({
            prev: "1",
          });
        },
        (error) => {
          console.log("Events is", error);
        }
      );
    }
  }

  buildAvatarUrl(fileName) {
    if (!fileName) {
      fileName = "default.png";
    }
    return backend + "/file/" + fileName + "/?role=students";
  }

  handleStatusChangeItemsPerPage = (e) => {
    this.setState({
      pageLimit: e.target.value,
    });
    const data = {
      page: "1",
      limit: e.target.value,
    };
    this.props.fetchAllStudents(data).then(
      (response) => {
        console.log(
          "Student Details are is",
          this.props.allStudents[0].data.next
        );

        this.setState({
          students: this.props.allStudents[0].data.results,
        });
        if (this.props.allStudents[0].data.next) {
          this.setState({
            next: this.props.allStudents[0].data.next.page,
          });
        }
        if (this.props.allStudents[0].data.prev) {
          this.setState({
            prev: "1",
          });
        }
      },
      (error) => {
        console.log("Events is", error);
      }
    );
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    //iterate over books to create a table row
    let studentDetails = this.state.students.map((studentBasicDetailResult) => {
      console.log("Student is ", studentBasicDetailResult);
      return (
        <div class="card2">
          <div class="wrapper">
            <img
              src={this.buildAvatarUrl(
                studentBasicDetailResult.studentProfilePic
              )}
              class="image--cover2"
            ></img>
          </div>
          <h4>
            Full Name : {studentBasicDetailResult.firstName}{" "}
            {studentBasicDetailResult.lastName}
          </h4>
          <h4>Degree : {studentBasicDetailResult.presentlevelOfEducation}</h4>
          <h4>
            Course : {studentBasicDetailResult.presentCourse}
            <button
              class="btn success"
              onClick={(event) =>
                this.getProfileDetails(event, studentBasicDetailResult._id)
              }
            >
              View Profile
            </button>
          </h4>
          <h4>University : {studentBasicDetailResult.collegeName}</h4>
          <h4>Graduation : {studentBasicDetailResult.graduationYear}</h4>
          <h4>Skillset : {studentBasicDetailResult.skillSet}</h4>
        </div>
      );
    });
    //if not logged in go to login page
    let redirectVar = null;
    if (!JSON.parse(window.localStorage.getItem("cookie"))) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <div class="row">
          <h3 class="heading"> Students</h3>
          <br />
          <div>
            <input
              name="text"
              type="text"
              class="searchComponent"
              placeholder="  Search for a Student using First Name / Skillset / College name"
              onChange={(event) => this.handleOnChange(event)}
              value={this.state.searchValue}
            />
            <button class="button" onClick={this.handleSearch}>
              Search
            </button>
          </div>
          <br />
          <br />
          <div>
            {studentDetails}
            <div>
              <select
                placeholder="No of items per page"
                defaultValue=""
                class="editableinput13"
                name="limit"
                onChange={(e) => this.handleStatusChangeItemsPerPage(e)}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>

              <button
                class="btn7 success"
                onClick={(event) => this.fetchPaginatedResults(event, "prev")}
              >
                Prev
              </button>
              <button
                class="btn8 success"
                onClick={(event) => this.fetchPaginatedResults(event, "next")}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  getProfileDetails = (event, id) => {
    this.setState({ redirect: `/studentprofile/${id}` });
  };
  fetchPaginatedResults = (event, direction) => {
    var data = {};
    console.log("Next is::", this.state.next);
    console.log("Prev is::", this.state.prev);
    if (direction === "next") {
      data = {
        page: this.state.next,
        limit: this.state.pageLimit,
      };
    } else {
      data = {
        page: this.state.prev,
        limit: this.state.pageLimit,
      };
    }
    console.log("data isss", data);
    this.props.fetchAllStudents(data).then(
      (response) => {
        console.log(
          "Student Details are is",
          this.props.allStudents[0].data.next
        );
        this.setState({
          students: this.props.allStudents[0].data.results,
        });
        if (this.props.allStudents[0].data.next) {
          this.setState({
            next: this.props.allStudents[0].data.next.page,
          });
        }
        if (this.props.allStudents[0].data.prev) {
          this.setState({
            prev: this.props.allStudents[0].data.prev.page,
          });
        }
      },
      (error) => {
        console.log("Events is", error);
      }
    );
  };
}

const mapStateToProps = (state) => ({
  allStudents: state.schools.allStudents,
});

//export Profile Component
export default connect(mapStateToProps, {
  fetchAllStudents,
  studentSearchComp,
})(Students);
