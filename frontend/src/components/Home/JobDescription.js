import React, { Component } from "react";
import '../../Styles/profile.css';
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import {
  fetchParticularJob,
  fetchParticularCompany,
  applytoJob,
  fetchStudent,
} from "../../js/actions/fetchStudent";
import { connect } from "react-redux";

const backend ="http://localhost:3001";

class JobDescription extends Component {
  constructor() {
    super();
    this.state = {
      jobDetails: [],
      companyDetails: [],
      redirect: null,
      fileData: null,
      studentObject: [],
      firstName: "",
      lastName: "",
      presentlevelOfEducation: "",
      presentCourse: "",
      collegeName: "",
    };
    this.initialState = {
      job: [],
      company: [],
      applyJobRes: "",
    };
    this.props = this.initialState;
    this.registerToJobDetails = this.registerToJobDetails.bind(this);
    this.getAppliedStudents = this.getAppliedStudents.bind(this);
    this.gotoCompanyProfile = this.gotoCompanyProfile.bind(this);
  }
  //get the books data from backend
  componentDidMount() {
    console.log("in componentDidMount", this.props.match.params.id);
    if (JSON.parse(window.localStorage.getItem("cookie"))) {
      this.props.fetchParticularJob(this.props.match.params.id).then(
        (response) => {
          console.log("fetchParticularJob", this.props.job[0].companyId);
          this.props.fetchParticularCompany(this.props.job[0].companyId).then(
            (response) => {
              console.log("Got Company data");
            },
            (error) => {
              console.log("Events is", error);
            }
          );
        },
        (error) => {
          console.log("Events is", error);
        }
      );
      if (
        JSON.parse(window.localStorage.getItem("cookie")) &&
        JSON.parse(window.localStorage.getItem("cookie")).split("+")[1] === "student"
      ) {
        this.props.fetchStudent(JSON.parse(window.localStorage.getItem("cookie")).split("+")[0]).then(
          (response) => {
            console.log("Student Details are is", response.data);
            this.props.studentObject.map((studentBasicDetailResult) => {
              this.setState({
                firstName: studentBasicDetailResult.firstName,
              });
              this.setState({
                lastName: studentBasicDetailResult.firstName,
              });
              this.setState({
                presentlevelOfEducation:
                  studentBasicDetailResult.presentlevelOfEducation,
              });
              this.setState({
                presentCourse: studentBasicDetailResult.presentCourse,
              });
              this.setState({
                collegeName: studentBasicDetailResult.collegeName,
              });
            });
          },
          (error) => {
            console.log("Student is", error);
          }
        );
      }
    }
  }
  onFileChange(e, id) {
    let fileData = new FormData();
    console.log("fileData in state", this.state.fileData);
    fileData.append("file", e.target.files[0]);
    console.log("fileData modified", fileData);
    this.setState({
      fileData: e.target.files[0],
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    //iterate over books to create a table row
    let jobDetails = this.props.job.map((jobPosting) => {
      return (
        <div class="card3">
          <h4>
            <b>Job Title </b>: {jobPosting.jobTitle}
          </h4>
          <h4>
            <b>Category </b>: {jobPosting.jobCategory}
          </h4>
          <h4>
            <b>Posting Date</b>: {jobPosting.postingDate}
          </h4>
          <h4>
            <b>Application Deadline</b>:{jobPosting.applicationDeadline}
          </h4>
          <h4>
            <b>Salary </b>: {jobPosting.salary}
          </h4>
          <br />
          <br />
          <h3>
            <b>Job Description</b>:{" "}
          </h3>
          <h4>{jobPosting.jobdescription}</h4>
          <br />
          <br />
          <h4>
            <b>Job Duties</b>:{" "}
          </h4>
          <h4>{jobPosting.duties}</h4>
          <br />
          <br />
          <h4>
            <b>Job Qualification</b>:{" "}
          </h4>
          <h4>{jobPosting.qualifications}</h4>
          <br />
          <br />

          <h4>
            <b>Job Requirements</b>:{" "}
          </h4>
          <h4>{jobPosting.requirements}</h4>
          <br />
          <br />
        </div>
      );
    });

    let companyDetails = this.props.company.map((companyDetail) => {
      return (
        <div class="card3">
          <h4> Name : {companyDetail.companyName}</h4>
          <h4> Location : {companyDetail.location}</h4>
          <h4>Website Url: {companyDetail.websiteUrl}</h4>
          <h4>Phone: {companyDetail.phoneNumber}</h4>
          <h4>Email: {companyDetail.email} </h4>
          <br />
          <button
            class="btn4 success"
            onClick={(event) =>
              this.gotoCompanyProfile(event, companyDetail._id)
            }
          >
            View Profile
          </button>
          <br />
          <br />
        </div>
      );
    });

    //if not logged in go to login page
    let redirectVar = null;
    if (!JSON.parse(window.localStorage.getItem("cookie"))) {
      redirectVar = <Redirect to="/login" />;
    }
    let viewRegisteredStudents;

    if (
      JSON.parse(window.localStorage.getItem("cookie")) &&
      JSON.parse(window.localStorage.getItem("cookie")).split("+")[1] === "company"
    ) {
      viewRegisteredStudents = (
        <button
          class="btn success"
          onClick={(event) => this.getAppliedStudents()}
        >
          Students Applied
        </button>
      );
    }

    if (
      JSON.parse(window.localStorage.getItem("cookie")) &&
      JSON.parse(window.localStorage.getItem("cookie")).split("+")[1] === "student"
    ) {
      viewRegisteredStudents = (
        <div>
          <p style={{ fontSize: "18px" }}>
            Upload your Resume with your skills and experiences
          </p>
          <input
            type="file"
            name="file"
            className="editableinput12"
            onChange={(e) => this.onFileChange(e, this.props.match.params.id)}
          />
          <button
            class="btn success"
            onClick={(event) =>
              this.registerToJobDetails(
                event,
                this.props.match.params.id,
                this.props.job[0].companyId
              )
            }
          >
            Apply
          </button>
        </div>
      );
    }
    return (
      <div>
        {redirectVar}
        <div class="row">
          <div class="leftcolumn">
            <h4 class="heading"> Job Description</h4>
            <br />
            {jobDetails}
          </div>
          <div class="rightcolumn">
            <div class="card4">
              <h4>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Company
                Profile
              </h4>
              <br />
              <div class="wrapper2">
                <img src={require("../jobs.png")} class="image--cover2"></img>
              </div>
              {companyDetails}
              <br />
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="card">
            <div>{viewRegisteredStudents}</div>
          </div>
        </div>
      </div>
    );
  }

  async registerToJobDetails(event, jobId, companyId) {
    if (JSON.parse(window.localStorage.getItem("cookie"))) {
      const dataArray = new FormData();
      dataArray.append("file", this.state.fileData);
      if (JSON.parse(window.localStorage.getItem("cookie"))) {
        var studentId = JSON.parse(window.localStorage.getItem("cookie")).split("+")[0];
      }
      var resumePath;
      console.log("JobId::", this.props.match.params.id);
      var uploadData = {
        dataArray: dataArray,
      };
      await axios
        .post(
          backend +
            "/uploadFile/?studentId=" +
            studentId +
            "&jobId=" +
            this.props.match.params.id +
            "&type=resume",
          dataArray
        )
        .then((response) => {
          console.log("Status Code : ", response);
          if (response.status === 200) {
            resumePath = response.data.filename;
            console.log("path:", resumePath);
          } else {
            console.log("Error in saving application");
          }
        });
      if (JSON.parse(window.localStorage.getItem("cookie"))) {
        var jobTitle;
        var jobCategory;
        var postingDate;
        this.props.job.map((jobPosting) => {
          jobTitle = jobPosting.jobTitle;
          jobCategory = jobPosting.jobCategory;
          postingDate = jobPosting.postingDate;
        });

        const data = {
          jobId: this.props.match.params.id,
          companyId: companyId,
          studentId: JSON.parse(window.localStorage.getItem("cookie")).split("+")[0],
          resumePath: resumePath,
          jobTitle: jobTitle,
          jobCategory: jobCategory,
          postingDate: postingDate,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          presentlevelOfEducation: this.state.presentlevelOfEducation,
          presentCourse: this.state.presentCourse,
          collegeName: this.state.collegeName,
        };
        this.props.applytoJob(data).then(
          (response) => {
            alert("Applied successfully");
          },
          (error) => {
            alert("Error Applying");
          }
        );
      }
    }
  }

  getAppliedStudents() {
    this.setState({
      redirect: `/jobAppliedStudents/${this.props.match.params.id}`,
    });
  }

  gotoCompanyProfile(e, id) {
    this.setState({
      redirect: `/studentcompanyprofile/${id}`,
    });
  }
}

//export Home Component
const mapStateToProps = (state) => ({
  job: state.schools.job,
  company: state.schools.company,
  applyJobRes: state.schools.applyJobRes,
  studentObject: state.schools.studentObject,
});

//export Profile Component
export default connect(mapStateToProps, {
  fetchParticularJob,
  fetchParticularCompany,
  applytoJob,
  fetchStudent,
})(JobDescription);
