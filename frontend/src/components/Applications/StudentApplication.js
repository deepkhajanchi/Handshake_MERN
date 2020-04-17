import React, { Component } from "react";
import "../../App.css";
import { Redirect } from "react-router";
import { studentAppliedJobs } from "../../js/actions/fetchStudent";
import { connect } from "react-redux";

class StudentApplication extends Component {
  constructor() {
    super();
    this.state = {
      jobPostingsRes: [],
      redirect: null,
      jobStatus: "",
      next: "",
      prev: "",
      pageLimit: "5",
    };
    this.getJobDetail = this.getJobDetail.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }
  //get the books data from backend
  componentDidMount() {
    console.log("in componentDidMount");
    if (JSON.parse(window.localStorage.getItem("cookie"))) {
      const data = {
        page: "1",
        limit: this.state.pageLimit,
        studentId: JSON.parse(window.localStorage.getItem("cookie")).split(
          "+"
        )[0],
      };
      this.props.studentAppliedJobs(data).then(
        (response) => {
          console.log(
            "Students applied Jobs",
            this.props.jobPostingsRes.results[0].jobApplications
          );
          this.setState({
            jobPostingsRes: this.state.jobPostingsRes.concat(
              this.props.jobPostingsRes.results[0].jobApplications
            ),
          });
          if (this.props.jobPostingsRes.next) {
            this.setState({
              next: this.props.jobPostingsRes.next.page,
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

  fetchPaginatedResults = (event, direction) => {
    var data = {};
    console.log("Next is::", this.state.next);
    console.log("Prev is::", this.state.prev);
    if (direction === "next") {
      data = {
        page: this.state.next,
        limit: this.state.pageLimit,
        studentId: JSON.parse(window.localStorage.getItem("cookie")).split(
          "+"
        )[0],
      };
    } else {
      data = {
        page: this.state.prev,
        limit: this.state.pageLimit,
        studentId: JSON.parse(window.localStorage.getItem("cookie")).split(
          "+"
        )[0],
      };
    }
    console.log("data isss", data);
    this.props.studentAppliedJobs(data).then(
      (response) => {
        console.log("Student Details are is", this.props.jobPostingsRes.next);
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

  handleStatusChangeItemsPerPage = (e) => {
    this.setState({
      pageLimit: e.target.value,
    });
    const data = {
      page: "1",
      limit: e.target.value,
      studentId: JSON.parse(window.localStorage.getItem("cookie")).split(
        "+"
      )[0],
    };
    this.props.studentAppliedJobs(data).then(
      (response) => {
        console.log("Student Details are is", this.props.jobPostingsRes.next);

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

  handleStatusChange = (e) => {
    if (e.target.value === "Applied Jobs") {
      if (JSON.parse(window.localStorage.getItem("cookie"))) {
        // axios
        //   .get(backend + `/studentjobs/${JSON.parse(window.localStorage.getItem("cookie")).split("+")[0]}`)
        //   .then(response => {
        //     //update the state with the response data
        //     if (response.data === "No Job postings!") {
        //       alert(response.data);
        //     } else {
        //       this.setState({
        //         jobPostings: response.data
        //       });
        //     }
        //   });
        const data = {
          page: "1",
          limit: this.state.pageLimit,
          studentId: JSON.parse(window.localStorage.getItem("cookie")).split(
            "+"
          )[0],
        };
        this.props.studentAppliedJobs(data).then(
          (response) => {
            console.log(
              "Students applied Jobs",
              this.props.jobPostingsRes.results
            );
            this.setState({
              jobPostingsRes: this.props.jobPostingsRes.results,
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
    } else {
      const data = {
        page: "1",
        limit: this.state.pageLimit,
        studentId: JSON.parse(window.localStorage.getItem("cookie")).split(
          "+"
        )[0],
        status: e.target.value,
      };
      if (JSON.parse(window.localStorage.getItem("cookie"))) {
        this.props.studentAppliedJobs(data).then(
          (response) => {
            this.setState({
              jobPostingsRes: this.state.jobPostingsRes.concat(
                this.props.jobPostingsRes.results
              ),
            });
          },
          (error) => {
            console.log("Events is", error);
          }
        );
      }
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    //iterate over books to create a table row
    let jobPostings = this.state.jobPostingsRes.map((jobPosting) => {
      if (jobPosting.applicationDate) {
        var applicationDate = jobPosting.applicationDate.slice(0, 10);
      }
      if (jobPosting.postingDate) {
        var postingDate = jobPosting.postingDate.slice(0, 10);
      }
      return (
        <div class="card2">
          <div class="wrapper">
            <img src={require("../jobs.png")} class="image--cover2"></img>
          </div>
          <h4>Job Title : {jobPosting.jobTitle}</h4>
          <h4>Category : {jobPosting.jobCategory}</h4>
          <h4>
            Posting Date: {postingDate}
            <button
              class="btn success"
              onClick={(event) => this.getJobDetail(event, jobPosting.jobId)}
            >
              View Details
            </button>
          </h4>
          <h4>Application Date : {applicationDate}</h4>
          <h4>Application Status : {jobPosting.status}</h4>
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
          <h3 class="heading">
            Jobs Applied
            <select
              placeholder="Select Status"
              defaultValue=""
              class="editableinput10"
              name="jobStatus"
              onChange={(e) => this.handleStatusChange(e)}
            >
              <option value="Applied Jobs">Applied Jobs</option>
              <option value="Pending">Pending</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Declined">Declined</option>
              <option value="Accepted">Accepted</option>
            </select>
          </h3>
          <br />
          <div>
            {jobPostings}
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
}

const mapStateToProps = (state) => ({
  jobPostingsRes: state.schools.jobPostingsRes,
});

//export Profile Component
export default connect(mapStateToProps, {
  studentAppliedJobs,
})(StudentApplication);
