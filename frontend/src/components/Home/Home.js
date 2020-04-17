import React, { Component } from "react";
import "../../App.css";
import axios from "axios";

import { Redirect } from "react-router";
import {
  fetchJobPostings,
  jobSearchOnName,
  jobSearchOnNameAndCat,
  fetchJobPostingsPagination,
} from "../../js/actions/fetchStudent";
import { connect } from "react-redux";


const backend ="http://localhost:3001";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobPostings: [],
      jobPostingsPage: [],
      redirect: null,
      searchValue: "",
      studentJobIds: [],
      jobIds: [],
      next: "",
      prev: "",
      pageLimit: "5",
      sortCriteria: "applicationDeadline",
      sortOrder: "1",
      status: "All Jobs",
    };
    this.getJobDetail = this.getJobDetail.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.buildAvatarUrl = this.buildAvatarUrl.bind(this);
  }
  //get the books data from backend
  async componentDidMount() {
    if (JSON.parse(window.localStorage.getItem("cookie"))) {
      const data = {
        page: "1",
        limit: this.state.pageLimit,
        sortCriteria: this.state.sortCriteria,
        sortOrder: this.state.sortOrder,
      };
      this.props.fetchJobPostingsPagination(data).then(
        (response) => {
          console.log(
            "Student Details are is",
            this.props.jobPostingsRes[0].data.next
          );
          this.setState({
            jobPostingsPage: this.state.jobPostingsPage.concat(
              this.props.jobPostingsRes[0].data.results
            ),
          });
          this.setState({
            next: this.props.jobPostingsRes[0].data.next.page,
          });
          this.setState({
            prev: "1",
          });
        },
        (error) => {
          console.log("Events is", error);
        }
      );
      // var jobIdss = [];
      // axios
      //   .get(
      //     backend +
      //       `/getStudentAppliedJobIds/${
      //         JSON.parse(window.localStorage.getItem("cookie")).split("+")[0]
      //       }`
      //   )
      //   .then((response) => {
      //     //update the state with the response data
      //     this.setState({
      //       studentJobIds: response.data,
      //     });
      //     console.log("in componentDidMountddd", this.state.studentJobIds);
      //     if (this.state.studentJobIds && this.state.studentJobIds.length > 0) {
      //       this.state.studentJobIds.map((studentJobId) => {
      //         jobIdss.push(studentJobId.fk_jobId);
      //       });
      //     }
      //     this.setState({
      //       jobIds: jobIdss,
      //     });
      //   });
    }
  }

  buildAvatarUrl(fileName) {
    console.log("Abcccccc", fileName);
    if (!fileName) {
      fileName = "default.png";
    }
    return backend + "/file/" + fileName + "/?role=company";
  }

  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value });
    console.log("Sate", this.state.searchValue);
  };
  handleSearch = () => {
    const data = {
      searchValue: this.state.searchValue,
    };
    this.props.jobSearchOnName(data).then(
      (response) => {
        console.log("Student Details are is", response.data);
        this.setState({
          jobPostingsPage: this.props.jobPostingsRes,
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
      page: "1",
      limit: e.target.value,
    };
    this.props.fetchJobPostingsPagination(data).then(
      (response) => {
        console.log(
          "Student Details are is",
          this.props.jobPostingsRes[0].data.next
        );

        this.setState({
          jobPostingsPage: this.props.jobPostingsRes[0].data.results,
        });
        if (this.props.jobPostingsRes[0].data.next) {
          this.setState({
            next: this.props.jobPostingsRes[0].data.next.page,
          });
        }
        if (this.props.jobPostingsRes[0].data.prev) {
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
    this.setState({
      status: e.target.value,
    });
    if (e.target.value === "All Jobs") {
      const data2 = {
        searchValue: this.state.searchValue,
      };
      this.props.jobSearchOnName(data2).then(
        (response) => {
          console.log("Student Details are is", response.data);
          this.setState({
            jobPostingsPage: this.props.jobPostingsRes,
          });
        },
        (error) => {
          console.log("Events is", error);
        }
      );
    } else {
      const data = {
        category: e.target.value,
        searchValue: this.state.searchValue,
      };
      console.log("Data is", data);
      if (JSON.parse(window.localStorage.getItem("cookie"))) {
        this.props.jobSearchOnNameAndCat(data).then(
          (response) => {
            console.log("Student Details are is", response.data);
            this.setState({
              jobPostingsPage: this.props.jobPostingsRes,
            });
          },
          (error) => {
            console.log("Events is", error);
          }
        );
      }
    }
  };

  handleStatusSortChange = (e) => {
    console.log("Sort", e.target.value);
    this.setState({
      sortCriteria: e.target.value,
    });
    // if (this.state.status === "All Jobs") {
    //   const data2 = {
    //     searchValue: this.state.searchValue,
    //     sortCriteria: e.target.value,
    //     sortOrder: "ASC",
    //   };
    //   this.props.jobSearchOnName(data2).then(
    //     (response) => {
    //       console.log("Student Details are is Sort", response.data);
    //       this.setState({
    //         jobPostingsPage: this.props.jobPostingsRes,
    //       });
    //     },
    //     (error) => {
    //       console.log("Events is", error);
    //     }
    //   );
    // } else {
    //   const data = {
    //     category: this.state.status,
    //     searchValue: this.state.searchValue,
    //     sortCriteria: e.target.value,
    //     sortOrder: "ASC",
    //   };
    //   console.log("Data is", data);
    //   if (JSON.parse(window.localStorage.getItem("cookie"))) {
    //     this.props.jobSearchOnNameAndCat(data).then(
    //       (response) => {
    //         console.log("Student Details are is", response.data);
    //         this.setState({
    //           jobPostingsPage: this.props.jobPostingsRes,
    //         });
    //       },
    //       (error) => {
    //         console.log("Events is", error);
    //       }
    //     );
    //   }
    // }
    const data = {
      page: "1",
      limit: this.state.pageLimit,
      sortCriteria: e.target.value,
      sortOrder: this.state.sortOrder,
    };
    this.props.fetchJobPostingsPagination(data).then(
      (response) => {
        console.log(
          "Student Details are is",
          this.props.jobPostingsRes[0].data.next
        );
        this.setState({
          jobPostingsPage: this.props.jobPostingsRes[0].data.results,
        });
        this.setState({
          next: this.props.jobPostingsRes[0].data.next.page,
        });
        this.setState({
          prev: "1",
        });
      },
      (error) => {
        console.log("Events is", error);
      }
    );
  };

  handleStatusOrderChange = (e) => {
    console.log("Sort Order", e.target.value);
    this.setState({
      sortOrder: e.target.value,
    });
    // if (this.state.status === "All Jobs") {
    //   const data2 = {
    //     searchValue: this.state.searchValue,
    //     sortCriteria: this.state.sortCriteria,
    //     sortOrder: e.target.value,
    //   };
    //   this.props.jobSearchOnName(data2).then(
    //     (response) => {
    //       console.log("Student Details are is order", response.data);
    //       this.setState({
    //         jobPostingsPage: this.props.jobPostingsRes,
    //       });
    //     },
    //     (error) => {
    //       console.log("Events is", error);
    //     }
    //   );
    // } else {
    //   const data = {
    //     category: this.state.status,
    //     searchValue: this.state.searchValue,
    //     sortCriteria: this.state.sortCriteria,
    //     sortOrder: e.target.value,
    //   };
    //   console.log("Data is", data);
    //   if (JSON.parse(window.localStorage.getItem("cookie"))) {
    //     this.props.jobSearchOnNameAndCat(data).then(
    //       (response) => {
    //         console.log("Student Details are is", response.data);
    //         this.setState({
    //           jobPostingsPage: this.props.jobPostingsRes,
    //         });
    //       },
    //       (error) => {
    //         console.log("Events is", error);
    //       }
    //     );
    //   }
    // }
    const data = {
      page: "1",
      limit: this.state.pageLimit,
      sortCriteria: this.state.sortCriteria,
      sortOrder: e.target.value,
    };
    this.props.fetchJobPostingsPagination(data).then(
      (response) => {
        console.log(
          "Student Details are is",
          this.props.jobPostingsRes[0].data.next
        );
        this.setState({
          jobPostingsPage: this.props.jobPostingsRes[0].data.results,
        });
        this.setState({
          next: this.props.jobPostingsRes[0].data.next.page,
        });
        this.setState({
          prev: "1",
        });
      },
      (error) => {
        console.log("Events is", error);
      }
    );
  };

  render() {
    console.log("IDS are", this.state.jobIds);
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    //iterate over books to create a table row
    // let jobPostings = "";
    let jobPostings = this.state.jobPostingsPage.map((jobPosting) => {
      let viewButton = "";
      if (jobPosting.applicationDeadline) {
        var applicationDeadline = jobPosting.applicationDeadline.slice(0, 10);
      }
      if (jobPosting.postingDate) {
        var postingDate = jobPosting.postingDate.slice(0, 10);
      }
      if (!this.state.jobIds.includes(jobPosting._id)) {
        viewButton = (
          <button
            class="btn success"
            onClick={(event) => this.getJobDetail(event, jobPosting._id)}
          >
            View Details
          </button>
        );
      } else {
        viewButton = (
          <button
            disabled
            class="btn success"
            onClick={(event) => this.getJobDetail(event, jobPosting._id)}
          >
            Already Applied
          </button>
        );
      }
      return (
        <div class="card2">
          <div class="wrapper">
            {/* <img */}
            {/* src={this.buildAvatarUrl(jobPosting.companyProfilePic)} */}
            {/* class="image--cover2" */}
            {/* ></img> */}
            <img
              src={this.buildAvatarUrl(jobPosting.companyProfilePic)}
              class="image--cover2"
            ></img>
          </div>
          <h4>Job Title : {jobPosting.jobTitle}</h4>
          <h4>Category : {jobPosting.jobCategory}</h4>
          <h4>
            Posting Date: {postingDate}
            {viewButton}
          </h4>
          {/* <h4>Posting Date: {jobPosting.postingDate}</h4> */}
          <h4>Application Deadline:{applicationDeadline}</h4>
          <h4>Location : {jobPosting.jobLocation}</h4>
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
          <h3 class="heading"> Job Postings</h3>
          <br />
          <br />
          <div>
            <input
              name="text"
              type="text"
              class="searchComponent"
              placeholder="  Search for an Job Posting with Title / Location / company Name"
              onChange={(event) => this.handleOnChange(event)}
              value={this.state.searchValue}
            />

            <button class="button" onClick={this.handleSearch}>
              Search
            </button>
            <br />
            <br />
          </div>
          <div>
            <select
              placeholder="Select Status"
              defaultValue=""
              class="editableinput14"
              name="jobStatus"
              onChange={(e) => this.handleStatusChange(e)}
            >
              <option value="All Jobs">All Jobs</option>
              <option value="Part Time">Part Time</option>
              <option value="On Campus">On Campus</option>
              <option value="Internship">Internship</option>
              <option value="Full Time">Full Time</option>
            </select>
            <select
              placeholder="Select Status"
              defaultValue=""
              class="editableinput15"
              name="jobStatus"
              onChange={(e) => this.handleStatusSortChange(e)}
            >
              <option value="applicationDeadline">Application Deadline</option>
              <option value="jobLocation">Location</option>
              <option value="postingDate">Posting Date</option>
            </select>

            <select
              placeholder="Select Status"
              defaultValue=""
              class="editableinput15"
              name="jobStatus"
              onChange={(e) => this.handleStatusOrderChange(e)}
            >
              <option value="1">Asc</option>
              <option value="-1">Desc</option>
            </select>
          </div>
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

        <br />
        <br />
      </div>
    );
  }

  fetchPaginatedResults = (event, direction) => {
    var data = {};
    console.log("Next is::", this.state.next);
    console.log("Prev is::", this.state.prev);
    if (direction === "next") {
      data = {
        page: this.state.next,
        limit: this.state.pageLimit,
        sortCriteria: this.state.sortCriteria,
        sortOrder: this.state.sortOrder,
      };
    } else {
      data = {
        page: this.state.prev,
        limit: this.state.pageLimit,
        sortCriteria: this.state.sortCriteria,
        sortOrder: this.state.sortOrder,
      };
    }
    console.log("data isss", data);
    this.props.fetchJobPostingsPagination(data).then(
      (response) => {
        console.log(
          "Student Details are is",
          this.props.jobPostingsRes[0].data.next
        );
        this.setState({
          jobPostingsPage: this.props.jobPostingsRes[0].data.results,
        });
        if (this.props.jobPostingsRes[0].data.next) {
          this.setState({
            next: this.props.jobPostingsRes[0].data.next.page,
          });
        }
        if (this.props.jobPostingsRes[0].data.prev) {
          this.setState({
            prev: this.props.jobPostingsRes[0].data.prev.page,
          });
        }
      },
      (error) => {
        console.log("Events is", error);
      }
    );
  };

  getJobDetail = (event, id) => {
    this.setState({ redirect: `/jobDetails/${id}` });
  };
}
//export Home Component
const mapStateToProps = (state) => ({
  jobPostingsRes: state.schools.jobPostingsRes,
});

//export Profile Component
export default connect(mapStateToProps, {
  fetchJobPostings,
  jobSearchOnName,
  jobSearchOnNameAndCat,
  fetchJobPostingsPagination,
})(Home);
