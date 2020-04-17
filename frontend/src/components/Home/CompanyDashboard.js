import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import {
  companyJobs,
  companyJobSearch,
  companyJobSearchOnNameAndCat,
  postJob,
} from "../../js/actions/fetchStudent";
import { connect } from "react-redux";

const backend ="http://localhost:3001";

class CompanyDashboard extends Component {
  constructor() {
    super();
    this.state = {
      company: [],
      jobPostingsRes: [],
      redirect: null,
      createJobFlag: false,
      jobTitle: "",
      location: "",
      applicationDeadline: "",
      salary: "",
      jobDescription: "",
      duties: "",
      requirements: "",
      qualifications: "",
      jobCategory: "Full Time",
      searchValue: "",
      next: "",
      prev: "",
      pageLimit: "5",
    };
    this.getJobDetail = this.getJobDetail.bind(this);
    this.createJob = this.createJob.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitJobPosting = this.submitJobPosting.bind(this);
    this.cancelJobPosting = this.cancelJobPosting.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.buildAvatarUrl = this.buildAvatarUrl.bind(this);
  }
  //get the books data from backend
  componentDidMount() {
    console.log("cookie", JSON.parse(window.localStorage.getItem("cookie")));
    if (JSON.parse(window.localStorage.getItem("cookie"))) {
      const data = {
        companyId: JSON.parse(window.localStorage.getItem("cookie")).split(
          "+"
        )[0],
        page: "1",
        limit: this.state.pageLimit,
      };
      this.props.companyJobs(data).then(
        (response) => {
          console.log(
            "Student Details are is",
            this.props.jobPostingsRes.results
          );
          this.setState({
            jobPostingsRes: this.state.jobPostingsRes.concat(
              this.props.jobPostingsRes.results
            ),
          });
          this.setState({
            next: this.props.jobPostingsRes.next.page,
          });
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

  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    const data = {
      companyId: JSON.parse(window.localStorage.getItem("cookie")).split(
        "+"
      )[0],
      searchValue: this.state.searchValue,
    };
    this.props.companyJobSearch(data).then(
      (response) => {
        console.log("Company Events is", response);
        this.setState({
          jobPostingsRes: this.props.jobPostingsRes,
        });
      },
      (error) => {
        console.log("Events is", error);
      }
    );
  };

  handleStatusChangeItemsPerPage = (e) => {
    this.setState({
      pageLimit: e.target.value,
    });
    const data = {
      companyId: JSON.parse(window.localStorage.getItem("cookie")).split(
        "+"
      )[0],
      page: "1",
      limit: e.target.value,
    };
    this.props.companyJobs(data).then(
      (response) => {
        console.log(
          "Student Details are is",
          this.props.jobPostingsRes.results
        );

        this.setState({
          jobPostingsRes: this.props.jobPostingsRes.results,
        });
        if (this.props.jobPostingsRes.next) {
          this.setState({
            next: this.props.jobPostingsRes.next.page,
          });
        }
        if (this.props.jobPostingsRes.prev) {
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

  buildAvatarUrl(fileName) {
    if (!fileName) {
      fileName = "default.png";
    }
    return backend + "/file/" + fileName + "/?role=company";
  }

  handleStatusChange = (e) => {
    if (e.target.value === "All Jobs") {
      const data = {
        companyId: JSON.parse(window.localStorage.getItem("cookie")).split(
          "+"
        )[0],
        searchValue: this.state.searchValue,
      };
      this.props.companyJobSearch(data).then(
        (response) => {
          console.log("Company Events is", response);
          this.setState({
            jobPostingsRes: this.props.jobPostingsRes,
          });
        },
        (error) => {
          console.log("Events is", error);
        }
      );
    } else {
      const data = {
        companyId: JSON.parse(window.localStorage.getItem("cookie")).split(
          "+"
        )[0],
        category: e.target.value,
        searchValue: this.state.searchValue,
      };
      console.log("Data is", data);
      if (JSON.parse(window.localStorage.getItem("cookie"))) {
        this.props.companyJobSearchOnNameAndCat(data).then(
          (response) => {
            console.log("Student Details are is", response.data);
            this.setState({
              jobPostingsRes: this.props.jobPostingsRes,
            });
          },
          (error) => {
            console.log("Events is", error);
          }
        );
      }
    }
  };

  fetchPaginatedResults = (event, direction) => {
    var data = {};
    console.log("Next is::", this.state.next);
    console.log("Prev is::", this.state.prev);
    if (direction === "next") {
      data = {
        companyId: JSON.parse(window.localStorage.getItem("cookie")).split(
          "+"
        )[0],
        page: this.state.next,
        limit: this.state.pageLimit,
      };
    } else {
      data = {
        companyId: JSON.parse(window.localStorage.getItem("cookie")).split(
          "+"
        )[0],
        page: this.state.prev,
        limit: this.state.pageLimit,
      };
    }
    console.log("data isss", data);
    this.props.companyJobs(data).then(
      (response) => {
        console.log(
          "Student Details are is",
          this.props.jobPostingsRes.results
        );
        this.setState({
          jobPostingsRes: this.props.jobPostingsRes.results,
        });
        if (this.props.jobPostingsRes.next) {
          this.setState({
            next: this.props.jobPostingsRes.next.page,
          });
        }
        if (this.props.jobPostingsRes.prev) {
          this.setState({
            prev: this.props.jobPostingsRes.prev.page,
          });
        }
      },
      (error) => {
        console.log("Events is", error);
      }
    );
  };

  handleChange = (e, name) => {
    console.log(name, this.state.qualifications);
    this.setState({
      [name]: e.target.value,
    });
    console.log(name, this.state.qualifications);
  };

  render() {
    if (this.state.createJobFlag) {
      var createJob = (
        <div class="card2">
          <form>
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Job Title:
              <br />
              <input
                class="editableinput5"
                value={this.state.value}
                onChange={(e) => this.handleChange(e, "jobTitle")}
                name="jobTitle"
                style={{ marginTop: "15px" }}
              />
            </label>
            <br />
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Location:
              <br />
              <input
                class="editableinput5"
                value={this.state.value}
                onChange={(e) => this.handleChange(e, "location")}
                name="location"
                style={{ marginTop: "20px" }}
              />
            </label>
            <br />
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Deadline:
              <br />
              {/* <input
                class="editableinput5"
                value={this.state.value}
                onChange={e =>
                  this.handleChange(
                    e,

                    "applicationDeadline"
                  )
                }
                name="applicationDeadline"
                style={{ marginTop: "20px" }}
              /> */}
              <input
                type="date"
                class="editableinput5"
                name="applicationDeadline"
                min="2019-01-01"
                max="2030-12-31"
                onChange={(e) =>
                  this.handleChange(
                    e,

                    "applicationDeadline"
                  )
                }
              ></input>
            </label>
            <br />
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Salary:
              <br />
              <input
                class="editableinput5"
                value={this.state.value}
                onChange={(e) =>
                  this.handleChange(
                    e,

                    "salary"
                  )
                }
                name="salary"
                style={{ marginTop: "20px" }}
              />
            </label>
            <br />
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Description:
              <br />
              <input
                class="editableinput6"
                value={this.state.value}
                rows="10"
                cols="30"
                onChange={(e) =>
                  this.handleChange(
                    e,

                    "jobDescription"
                  )
                }
                name="jobDescription"
                style={{ marginTop: "20px" }}
              />
            </label>
            <br />
            {/* <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Category:
              <br />
              <input
                class="editableinput5"
                value={this.state.value}
                onChange={e =>
                  this.handleChange(
                    e,

                    "jobCategory"
                  )
                }
                name="jobCategory"
                style={{ marginTop: "20px" }}
              />
            </label> */}
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Job Category :
              <br />
              <br />
              <select
                value={this.state.jobCategory}
                class="editableinput4"
                onChange={(e) => this.handleChange(e, "jobCategory")}
              >
                <option value="Full Time">Full Time</option>
                <option value="Internship">Internship</option>
                <option value="Part Time">Part Time</option>
                <option value="On Campus">On Campus</option>
              </select>
            </label>
            <br />
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Duties:
              <br />
              <input
                class="editableinput6"
                value={this.state.value}
                onChange={(e) =>
                  this.handleChange(
                    e,

                    "duties"
                  )
                }
                name="duties"
                style={{ marginTop: "20px" }}
              />
            </label>
            <br />
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Requirements:
              <br />
              <input
                class="editableinput6"
                value={this.state.value}
                onChange={(e) =>
                  this.handleChange(
                    e,

                    "requirements"
                  )
                }
                name="requirements"
                style={{ marginTop: "20px" }}
              />
            </label>
            <br />
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Qualifications:
              <br />
              <input
                class="editableinput5"
                value={this.state.value}
                onChange={(e) =>
                  this.handleChange(
                    e,

                    "qualifications"
                  )
                }
                name="qualifications"
                style={{ marginTop: "20px" }}
              />
            </label>
            <br />
            <br />
            <br />
            <button
              class="btn2 success"
              onClick={(event) => this.cancelJobPosting(event)}
            >
              Cancel
            </button>
            <button
              class="btn3 success"
              onClick={(event) => this.submitJobPosting(event)}
            >
              Submit
            </button>
          </form>
          <br />
          <br />
          <br />
        </div>
      );
    }
    let redirectVar = null;
    console.log("Cookie is", JSON.parse(window.localStorage.getItem("cookie")));
    if (!JSON.parse(window.localStorage.getItem("cookie"))) {
      redirectVar = <Redirect to="/login" />;
    }
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let companyJobPosting = this.state.jobPostingsRes.map((jobPosting) => {
      if (jobPosting.applicationDeadline) {
        var applicationDeadline = jobPosting.applicationDeadline.slice(0, 10);
      }
      if (jobPosting.postingDate) {
        var postingDate = jobPosting.postingDate.slice(0, 10);
      }
      return (
        <div class="card2">
          <div class="wrapper">
            {/* <img
              src={this.buildAvatarUrl(jobPosting.companyProfilePic)}
              class="image--cover2"
            ></img> */}
            <img
              src={this.buildAvatarUrl(jobPosting.companyProfilePic)}
              class="image--cover2"
            ></img>
          </div>
          <h4>
            Job Title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;&nbsp;
            {jobPosting.jobTitle}
          </h4>
          <h4>
            Category &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;&nbsp;
            {jobPosting.jobCategory}
          </h4>
          <h4>
            Posted On&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;{postingDate}
            <button
              class="btn success"
              onClick={(event) => this.getJobDetail(event, jobPosting._id)}
            >
              View Details
            </button>
          </h4>
          {/* <h4>Posting Date: {jobPosting.postingDate}</h4> */}
          <h4>
            Deadline&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {applicationDeadline}
          </h4>
          <h4>
            Location &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
            &nbsp;&nbsp;&nbsp;&nbsp;
            {jobPosting.jobLocation}
          </h4>
        </div>
      );
    });

    return (
      <div>
        {redirectVar}
        <div class="row">
          <h3 class="heading">
            Job Postings
            <button
              class="btn3 success"
              onClick={(event) => this.createJob(event)}
            >
              Post a Job
            </button>
          </h3>
          <br />
          <br />
          <div>
            <input
              name="text"
              type="text"
              class="searchComponent3"
              placeholder="  Search for an Job Posting with Title / Location / company Name"
              onChange={(event) => this.handleOnChange(event)}
              value={this.state.searchValue}
            />
            <select
              placeholder="Select Status"
              defaultValue=""
              class="editableinput11"
              name="jobStatus"
              onChange={(e) => this.handleStatusChange(e)}
            >
              <option value="All Jobs">All Jobs</option>
              <option value="Part Time">Part Time</option>
              <option value="On Campus">On Campus</option>
              <option value="Internship">Internship</option>
              <option value="Full Time">Full Time</option>
            </select>
            <button class="button" onClick={this.handleSearch}>
              Search
            </button>
          </div>
          {createJob}
          <br />
          <div>
            {companyJobPosting}
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
  getJobDetail = (event, id) => {
    this.setState({ redirect: `/jobDetails/${id}` });
  };

  createJob = (event) => {
    this.setState({ createJobFlag: true });
  };
  submitJobPosting = (event) => {
    const data = {
      jobTitle: this.state.jobTitle,
      location: this.state.location,
      applicationDeadline: this.state.applicationDeadline,
      salary: this.state.salary,
      jobDescription: this.state.jobDescription,
      jobCategory: this.state.jobCategory,
      duties: this.state.duties,
      requirements: this.state.requirements,
      qualifications: this.state.qualifications,
      companyId: JSON.parse(window.localStorage.getItem("cookie")).split(
        "+"
      )[0],
    };
    this.props.postJob(data).then(
      (response) => {
        console.log("Event Created Res::", response.data);
        this.setState({
          jobPostingsRes: this.props.jobPostingsRes,
        });
      },
      (error) => {
        console.log("Events is", error);
      }
    );
    this.setState({ createJobFlag: false });
  };
  cancelJobPosting = (event) => {
    this.setState({ createJobFlag: false });
  };
}
//export Home Component
const mapStateToProps = (state) => ({
  jobPostingsRes: state.schools.jobPostingsRes,
});

//export Profile Component
export default connect(mapStateToProps, {
  companyJobs,
  companyJobSearch,
  companyJobSearchOnNameAndCat,
  postJob,
})(CompanyDashboard);
