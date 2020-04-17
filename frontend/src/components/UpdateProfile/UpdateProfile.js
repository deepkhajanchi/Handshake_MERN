import React, { Component } from "react";
import "../../Styles/profile.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import {
  fetchStudent,
  fetchStudentDetails,
  fetchEduDetails,
  fetchWorkExpDetails,
  editMyJourney,
  addEducation,
  addWork,
  editMyedu,
  editMyWork,
  editMyskills,
  editContactDetails,
  removeMyEdu,
  removeMywork,
  editPersonalInfo,
  submitReduxProfileStudent,
  getStudentProfilePicPath,
} from "../../js/actions/fetchStudent";
import { connect } from "react-redux";

const backend ="http://localhost:3001";

class UpdateProfile extends Component {
  constructor() {
    super();
    this.state = {
      yearOfPassing: "",
      collegeName: "",
      degree: "",
      major: "",
      cgpa: "",
      studentId: "",
      addEduFlag: false,
      addWorkFlag: false,
      addMyJourneyFlag: false,
      addSkillsFlag: false,
      skills: "",
      companyName: "",
      title: "",
      startDate: "",
      endDate: "",
      description: "",
      studentDetailsId: "",
      success: false,
      url: "",
      selectedFile: null,
      fileData: null,
      profileUpdate: false,
      profilePicPath: "",
      editProfileImageFlag: false,
      saveProfileImageFlag: false,
    };
    // };
    // constructor() {
    //   super();
    this.initialState = {
      studentObject: [],
      studentBasicDetailsResult: [],
      filePath: [],
    };
    this.props = this.initialState;
    // }
    this.buildAvatarUrl = this.buildAvatarUrl.bind(this);
    this.handlemyChange = this.handlemyChange.bind(this);
    this.handlemyEduChange = this.handlemyEduChange.bind(this);
    this.handleReduxChange = this.handleReduxChange.bind(this);
    this.submitmyJourney = this.submitmyJourney.bind(this);
    this.submitEduDetails = this.submitEduDetails.bind(this);
    this.removeEduDetails = this.removeEduDetails.bind(this);
    this.removeWorkDetails = this.removeWorkDetails.bind(this);
    this.submitmyskillSet = this.submitmyskillSet.bind(this);
    this.submitContactDetailsDetails = this.submitContactDetailsDetails.bind(
      this
    );
    this.submitpersonalInfoDetails = this.submitpersonalInfoDetails.bind(this);
    this.addEduDetails = this.addEduDetails.bind(this);
    this.submitmyReduxProfileStudent = this.submitmyReduxProfileStudent.bind(
      this
    );
    this.addWorkDetails = this.addWorkDetails.bind(this);
    this.submitWorkDetails = this.submitWorkDetails.bind(this);
    this.addEducation = this.addEducation.bind(this);
    this.addSkills = this.addSkills.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  componentDidMount() {
    if (JSON.parse(window.localStorage.getItem("cookie"))) {
      this.props
        .fetchStudent(
          JSON.parse(window.localStorage.getItem("cookie")).split("+")[0]
        )
        .then(
          (response) => {
            console.log("Student Details are is", response.data);
            this.setState({
              studentDetailsId: JSON.parse(
                window.localStorage.getItem("cookie")
              ).split("+")[0],
            });
          },
          (error) => {
            console.log("Events is", error);
          }
        );
    }
  }

  addEducation() {
    this.setState({
      addEduFlag: true,
    });
  }
  addWork() {
    this.setState({
      addWorkFlag: true,
    });
  }
  addSkills() {
    this.setState({
      addSkillsFlag: true,
    });
    console.log("this.state.addSkillsFlag", this.state.addSkillsFlag);
  }

  handleChange = (ev) => {
    this.setState({ success: false, url: "" });
  };
  onClickHandler = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    axios
      .post(backend + "/upload", data, {
        // receive two    parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        console.log(res.statusText);
      });
  };
  redirecttoUpdateProfilePage() {
    this.props.history.push("/Profile");
  }

  handlemyChange = (e, id, name) => {
    const studentBasicDetails = this.props.studentBasicDetails;
    studentBasicDetails.map((studentBasicDetail) => {
      if (studentBasicDetail._id === id) {
        studentBasicDetail[name] = e.target.value;
      }
    });
  };

  handleReduxChange = (e, id, name) => {
    console.log("Before", this.props.studentObject);
    const studentObject = this.props.studentObject;
    studentObject.map((studentObjectt) => {
      if (studentObjectt._id === id) {
        studentObjectt[name] = e.target.value;
      }
    });
  };

  async submitmyReduxProfileStudent(event) {
    const data2 = {
      studentId: JSON.parse(window.localStorage.getItem("cookie")).split(
        "+"
      )[0],
      filePath: "studentProfilePic",
      student: this.props.studentObject,
    };
    console.log("Student obj just before saving", this.props.studentObject);
    this.props.submitReduxProfileStudent(data2).then(
      (response) => {
        alert("Updated Successfully");
      },
      (error) => {
        console.log("Student is", error);
      }
    );
  }

  async submitmyReduxProfileStudentProfile(event) {
    if (this.state.editProfileImageFlag) {
      this.setState({
        saveProfileImageFlag: true,
      });
    }
    console.log("Hiiiii", this.props.studentObject);
    var resumePath;
    const data = {
      studentId: JSON.parse(window.localStorage.getItem("cookie")).split(
        "+"
      )[0],
      type: "studentProfilePic",
      profilePic: this.props.studentObject[0].studentProfilePic,
    };
    console.log("In updayte PP", data, this.props.studentObject[0]);
    await this.props.getStudentProfilePicPath(data).then(
      (response) => {
        console.log(
          "New FIle Path company pPic",
          this.props.filePath,
          response
        );
        console.log("Status Code : ", this.props.filePath.filename);
        if (response.status === 200) {
          resumePath = this.props.filePath.filename;
          this.setState({
            profilePicPath: resumePath,
          });
          const stuObj = this.props.studentObject;
          console.log("in edit handler", stuObj);
          stuObj.map((obj) => {
            console.log(
              "Before saving to object",
              resumePath,
              obj.studentProfilePic
            );
            obj.studentProfilePic = resumePath;
            console.log(
              "After saving to object",
              resumePath,
              obj.studentProfilePic
            );
          });
        } else {
          console.log("Error in saving application");
        }
      },
      (error) => {
        console.log("Events is", error);
      }
    );
    const data2 = {
      studentId: JSON.parse(window.localStorage.getItem("cookie")).split(
        "+"
      )[0],
      filePath: "studentProfilePic",
      student: this.props.studentObject,
    };
    console.log("Student obj just before saving", this.props.studentObject);
    this.props.submitReduxProfileStudent(data2).then(
      (response) => {
        alert("Updated Successfully");
      },
      (error) => {
        console.log("Student is", error);
      }
    );
  }

  handlemystudentDetailsChange = (e, id, name) => {
    const studentBasicDetailsResult = this.props.studentObject;
    console.log("submitpersonalInfoDetails", this.props.studentObject);
    studentBasicDetailsResult.map((studentBasicDetailResult) => {
      if (studentBasicDetailResult.studentId === id) {
        studentBasicDetailResult[name] = e.target.value;
      }
    });
    this.setState({
      profileUpdate: true,
    });
    // refreshPage()
  };

  handlemyEduChange = (e, id, name) => {
    console.log("handlemyEduChange", id, name);
    var stuId = JSON.parse(window.localStorage.getItem("cookie")).split("+")[0];
    const studentObjectt = this.props.studentObject;
    console.log("handlemyEduChange Before", this.props.studentObject);
    studentObjectt.map((student) => {
      if (student._id === stuId) {
        var educations = student.educations;
        educations.map((education) => {
          console.log("Educa", education, education._id, id);
          if (education._id == id) {
            console.log("Hii");
            education[name] = e.target.value;
          }
        });
      }
    });
    console.log("handlemyEduChange After", this.props.studentObject);
  };

  handlemyWorkChange = (e, id, name) => {
    console.log("handlemyEduChange", id, name);
    var stuId = JSON.parse(window.localStorage.getItem("cookie")).split("+")[0];
    const studentObjectt = this.props.studentObject;
    console.log("handlemyEduChange Before", this.props.studentObject);
    studentObjectt.map((student) => {
      if (student._id === stuId) {
        var workExperiences = student.workExperiences;
        workExperiences.map((workExperience) => {
          console.log("Educa", workExperience, workExperience._id, id);
          if (workExperience._id == id) {
            console.log("Hii");
            workExperience[name] = e.target.value;
          }
        });
      }
    });
    console.log("handlemyEduChange After", this.props.studentObject);
  };

  submitmyJourney = (event, id, name) => {
    var response = this.props.editMyJourney(this.props.studentBasicDetails);
    console.log("response is", response);
  };

  async submitpersonalInfoDetails(event, id) {
    console.log("submitpersonalInfoDetails2", this.props.studentObject);
    var response = await this.props.editPersonalInfo(this.props.studentObject);
    console.log("response is", response);
    this.setState({
      jaffa: "jaffa",
    });
  }

  submitmyskillSet = (event, id) => {
    console.log("submitmyskillSet", this.props.studentBasicDetails);
    var response = this.props.editMyskills(this.props.studentBasicDetails);
    console.log("response is", response);
  };

  submitContactDetailsDetails = (event, id) => {
    console.log("submitContactDetailsDetails", this.props.studentBasicDetails);
    var response = this.props.editContactDetails(
      this.props.studentBasicDetails
    );
    console.log("response is", response);
  };

  submitEduDetails = (event, id) => {
    console.log("submitContactDetailsDetailss", this.props.studentEducation);
    var response = this.props.editMyedu(this.props.studentEducation);
    console.log("response is", response);
  };

  submitWorkDetails = (event, id) => {
    console.log("submitContactDetailsDetails", this.props.studentExperience);
    var response = this.props.editMyWork(this.props.studentExperience);
    console.log("response is", response);
  };

  removeEduDetails = async function (event, id) {
    const data = {
      _id: id,
      stuId: JSON.parse(window.localStorage.getItem("cookie")).split("+")[0],
    };
    var response = await this.props.removeMyEdu(data);
    alert("Removed Successfully");
  };

  removeWorkDetails = (event, id) => {
    const data = {
      _id: id,
      stuId: JSON.parse(window.localStorage.getItem("cookie")).split("+")[0],
    };
    var response = this.props.removeMywork(data);
    alert("Removed Successfully");
  };

  addEduDetails = (event, id) => {
    const data = {
      yearOfPassing: this.state.yearOfPassing,
      collegeName: this.state.collegeName,
      degree: this.state.degree,
      major: this.state.major,
      cgpa: this.state.cgpa,
      _id: this.state.studentDetailsId,
    };
    console.log("submitContactDetailsDetails", this.props.studentExperience);
    this.props.addEducation(data).then(
      (response) => {
        alert("Updated Successfully");
      },
      (error) => {
        console.log("Error is", error);
      }
    );
  };
  addWorkDetails = (event, id) => {
    const data = {
      companyName: this.state.companyName,
      title: this.state.title,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      description: this.state.description,
      _id: this.state.studentDetailsId,
    };
    console.log("submitContactDetailsDetails", data);
    this.props.addWork(data).then(
      (response) => {
        alert("Updated Successfully");
      },
      (error) => {
        console.log("Error is", error);
      }
    );
  };

  onFileChange(e, id) {
    this.setState({
      editProfileImageFlag: true,
    });
    const studObj = this.props.studentObject;
    console.log("in edit handler", studObj);
    studObj.map((obj) => {
      if (obj.studentId === id) {
        let fileData = new FormData();
        console.log("fileData in state", this.state.fileData);
        fileData.append("studentProfileStorage", e.target.files[0]);
        obj.studentProfilePic = fileData;
        console.log(e.target.files[0]);
      }
    });
    console.log("in edit handler222", this.props.studentObject);
  }

  buildAvatarUrl(fileName) {
    console.log("pic name 1", fileName);
    console.log("pic name 2", String(fileName));
    return backend + "/file/" + String(fileName) + "/?role=students";
  }

  render() {
    console.log("jaffa", this.props.studentObject);
    let redirectVar = null;
    if (!JSON.parse(window.localStorage.getItem("cookie"))) {
      redirectVar = <Redirect to="/login" />;
    }

    let studentDetails1 = this.props.studentObject.map(
      (studentAllDetailResult) => {
        console.log("Id iss::::::" + studentAllDetailResult.careerObjective);
        return studentAllDetailResult.careerObjective;
      }
    );
    let profilePic;
    if (!this.state.saveProfileImageFlag) {
      profilePic = this.props.studentObject.map((obj) => {
        if (obj.studentProfilePic) {
          console.log("studentProfilePic", obj);
          var path = obj.studentProfilePic;
          console.log("JaffapathType of,", typeof path);
          return (
            <div key={obj.studentId} className="wrapper">
              <img
                src={this.buildAvatarUrl(path)}
                className="image--cover3"
                alt="Loading.."
              />
            </div>
          );
        } else {
          var path2 = "default.png";
          return (
            <div key={obj.studentId} className="wrapper">
              <img
                src={this.buildAvatarUrl(path2)}
                className="image--cover3"
                alt="Loading.."
              />
            </div>
          );
        }
      });
    } else {
      this.setState({
        saveProfileImageFlag: false,
      });
      this.setState({
        editProfileImageFlag: false,
      });
      profilePic = this.props.studentObject.map((obj) => {
        if (obj.studentProfilePic) {
          console.log("studentProfilePic....", this.state.profilePicPath);
          var path = obj.studentProfilePic;
          console.log("JaffapathType of,", typeof path);
          return (
            <div key={obj.studentId} className="wrapper">
              <img
                src={this.buildAvatarUrl(this.state.profilePicPath)}
                className="image--cover3"
                alt="Loading.."
              />
            </div>
          );
        } else {
          var path2 = "default.png";
          return (
            <div key={obj.studentId} className="wrapper">
              <img
                src={this.buildAvatarUrl(path2)}
                className="image--cover3"
                alt="Loading.."
              />
            </div>
          );
        }
      });
    }

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
            <div>
              <button
                class="btn success"
                onClick={(event) =>
                  this.submitmyReduxProfileStudentProfile(event)
                }
              >
                Save
              </button>
              {profilePic}
              <input
                type="file"
                name="file"
                onChange={(e) =>
                  this.onFileChange(e, studentBasicDetailResult.studentId)
                }
              />
            </div>
            <br />
            <input
              onChange={(e) =>
                this.handleReduxChange(
                  e,
                  this.state.studentDetailsId,
                  "presentlevelOfEducation"
                )
              }
              class="editableinput4"
              name="presentlevelOfEducation"
              defaultValue={studentBasicDetailResult.presentlevelOfEducation}
              placeholder={"Degree"}
            ></input>
            <input
              onChange={(e) =>
                this.handleReduxChange(
                  e,
                  this.state.studentDetailsId,
                  "collegeName"
                )
              }
              class="editableinput4"
              name="collegeName"
              defaultValue={studentBasicDetailResult.collegeName}
              placeholder={"University"}
            ></input>
            <input
              onChange={(e) =>
                this.handleReduxChange(
                  e,
                  this.state.studentDetailsId,
                  "presentCourse"
                )
              }
              class="editableinput4"
              name="presentCourse"
              defaultValue={studentBasicDetailResult.presentCourse}
              placeholder={"Major"}
            ></input>
            <input
              onChange={(e) =>
                this.handleReduxChange(
                  e,
                  this.state.studentDetailsId,
                  "graduationYear"
                )
              }
              class="editableinput4"
              name="graduationYear"
              defaultValue={studentBasicDetailResult.graduationYear}
              placeholder={"Graduation Year"}
            ></input>
          </div>
        );
      }
    );

    let studentDetails2 = this.props.studentObject.map(
      (studentBasicDetailResult) => {
        return (
          <div class="card">
            <h3>
              <b>Contact Info</b>
              {/* <button
                class="btn success"
                onClick={event => this.submitmyReduxProfileStudent(event)}
              >
                Save
              </button> */}
            </h3>
            <br />
            <input
              onChange={(e) =>
                this.handleReduxChange(
                  e,
                  this.state.studentDetailsId,
                  "phoneNumber"
                )
              }
              class="editableinput4"
              name="phoneNumber"
              defaultValue={studentBasicDetailResult.phoneNumber}
              placeholder={"Phone Number"}
            ></input>
            <input
              onChange={(e) =>
                this.handleReduxChange(e, this.state.studentDetailsId, "city")
              }
              class="editableinput4"
              name="city"
              defaultValue={studentBasicDetailResult.city}
              placeholder={"City"}
            ></input>
            <input
              onChange={(e) =>
                this.handleReduxChange(e, this.state.studentDetailsId, "state")
              }
              class="editableinput4"
              name="state"
              defaultValue={studentBasicDetailResult.state}
              placeholder={"State"}
            ></input>
            <input
              onChange={(e) =>
                this.handleReduxChange(
                  e,
                  this.state.studentDetailsId,
                  "country"
                )
              }
              class="editableinput4"
              name="country"
              defaultValue={studentBasicDetailResult.country}
              placeholder={"Country"}
            ></input>
            <input
              onChange={(e) =>
                this.handleReduxChange(e, this.state.studentDetailsId, "dob")
              }
              class="editableinput4"
              name="dob"
              defaultValue={studentBasicDetailResult.dob}
              placeholder={"DOB"}
            ></input>
          </div>
        );
      }
    );
    let studentDetails3 = this.props.studentObject.map(
      (studentBasicDetailResult) => {
        return (
          <div>
            <h3>
              <b> Skills</b>
              {/* <button
                class="btn success"
                onClick={event => this.submitmyReduxProfileStudent(event)}
              >
                Save
              </button> */}
            </h3>
            <br />
            <input
              onChange={(e) =>
                this.handleReduxChange(
                  e,
                  this.state.studentDetailsId,
                  "skillSet"
                )
              }
              class="editableinput4"
              name="skillSet"
              defaultValue={studentBasicDetailResult.skillSet}
            ></input>
          </div>
        );
      }
    );

    // let addSkills = null;
    // console.log("state is", this.state.addSkillsFlag);
    // if (this.state.addSkillsFlag) {
    //   addSkills = (
    //     <div>
    //       <br />
    //       <input
    //         onChange={e =>
    //           this.handlemyChange(
    //             e,
    //             this.props.studentObject.studentDetailsId,
    //             "skillSet"
    //           )
    //         }
    //         class="editableinput4"
    //         name="skillSet"
    //         defaultValue="Skills"
    //       ></input>
    //       <button
    //         class="btn success"
    //         onClick={event =>
    //           this.submitmyskillSet(
    //             event,
    //             this.props.studentBasicDetails[0].studentDetailsId,
    //             "skillSet"
    //           )
    //         }
    //       >
    //         Save
    //       </button>
    //     </div>
    //   );
    // }
    let studentEducationDetails = null;
    //iterate over books to create a table row
    this.props.studentObject.map((studentAllEduDetailResult) => {
      studentEducationDetails = studentAllEduDetailResult.educations.map(
        (studentEduDetailResult) => {
          return (
            <div class="card">
              <form>
                <input
                  onChange={(e) =>
                    this.handlemyEduChange(
                      e,
                      studentEduDetailResult._id,
                      "collegeName"
                    )
                  }
                  name="collegeName"
                  class="editableinput3"
                  type="text"
                  placeholder="University"
                  defaultValue={studentEduDetailResult.collegeName}
                ></input>
                <br />
                <br />
                <input
                  onChange={(e) =>
                    this.handlemyEduChange(
                      e,
                      studentEduDetailResult._id,
                      "degree"
                    )
                  }
                  class="editableinput"
                  name="degree"
                  placeholder="Degree"
                  defaultValue={studentEduDetailResult.degree}
                ></input>
                <br />
                <br />
                <input
                  onChange={(e) =>
                    this.handlemyEduChange(
                      e,
                      studentEduDetailResult._id,
                      "major"
                    )
                  }
                  class="editableinput"
                  name="major"
                  placeholder="Major"
                  defaultValue={studentEduDetailResult.major}
                ></input>
                <br />
                <br />
                <input
                  onChange={(e) =>
                    this.handlemyEduChange(
                      e,
                      studentEduDetailResult._id,
                      "yearOfPassing"
                    )
                  }
                  class="editableinput"
                  name="yearOfPassing"
                  placeholder="Graduation year"
                  defaultValue={studentEduDetailResult.yearOfPassing}
                ></input>
                <br />
                <br />
                <input
                  onChange={(e) =>
                    this.handlemyEduChange(
                      e,
                      studentEduDetailResult._id,
                      "cgpa"
                    )
                  }
                  class="editableinput"
                  name="cgpa"
                  placeholder="CGPA"
                  defaultValue={studentEduDetailResult.cgpa}
                ></input>

                {/* <button
                  class="btn success"
                  onClick={event => this.submitmyReduxProfileStudent(event)}
                >
                  Save
                </button> */}
              </form>
              <button
                class="btn success"
                onClick={(event) =>
                  this.removeEduDetails(event, studentEduDetailResult._id)
                }
              >
                Remove
              </button>
              <br />
              <br />
            </div>
          );
        }
      );
    });

    //iterate over books to create a table row

    let Addeducation = null;
    console.log("state is", this.state.addEduFlag);
    if (this.state.addEduFlag) {
      Addeducation = (
        <div class="card">
          <form>
            <input
              onChange={(e) =>
                this.setState({
                  collegeName: e.target.value,
                })
              }
              name="collegeName"
              class="editableinput3"
              type="text"
              placeholder={"University"}
            ></input>
            <br />
            <br />
            <input
              onChange={(e) =>
                this.setState({
                  degree: e.target.value,
                })
              }
              class="editableinput"
              name="degree"
              placeholder="Level of Education"
            ></input>
            <br />
            <br />
            <input
              onChange={(e) =>
                this.setState({
                  major: e.target.value,
                })
              }
              class="editableinput"
              name="major"
              placeholder="Major"
            ></input>
            <br />
            <br />
            <input
              onChange={(e) =>
                this.setState({
                  yearOfPassing: e.target.value,
                })
              }
              class="editableinput"
              name="yearOfPassing"
              placeholder="Graduating year"
            ></input>
            <br />
            <br />
            <input
              onChange={(e) =>
                this.setState({
                  cgpa: e.target.value,
                })
              }
              class="editableinput"
              name="cgpa"
              placeholder="CGPA"
            ></input>
            <br />
          </form>
          <button
            class="btn success"
            onClick={(event) => this.addEduDetails(event)}
          >
            Save
          </button>
          <br />

          <br />
        </div>
      );
    }
    let studentWorkDetails = "";
    this.props.studentObject.map((studentAllWorkDetailResult) => {
      studentWorkDetails = studentAllWorkDetailResult.workExperiences.map(
        (studentWorkDetailResult) => {
          console.log("xxxx::::", studentWorkDetailResult);
          return (
            <div class="card">
              <form>
                <input
                  onChange={(e) =>
                    this.handlemyWorkChange(
                      e,
                      studentWorkDetailResult._id,
                      "companyName"
                    )
                  }
                  class="editableinput"
                  name="companyName"
                  placeholder="Company"
                  defaultValue={studentWorkDetailResult.companyName}
                ></input>
                <br />
                <br />
                <input
                  onChange={(e) =>
                    this.handlemyWorkChange(
                      e,
                      studentWorkDetailResult._id,
                      "title"
                    )
                  }
                  class="editableinput"
                  name="title"
                  placeholder="Title"
                  defaultValue={studentWorkDetailResult.title}
                ></input>
                <br />
                <br />
                <input
                  onChange={(e) =>
                    this.handlemyWorkChange(
                      e,
                      studentWorkDetailResult._id,
                      "startDate"
                    )
                  }
                  class="editableinput"
                  name="startDate"
                  placeholder="StartDate"
                  defaultValue={studentWorkDetailResult.startDate}
                ></input>
                <br />
                <br />
                <input
                  onChange={(e) =>
                    this.handlemyWorkChange(
                      e,
                      studentWorkDetailResult._id,
                      "endDate"
                    )
                  }
                  class="editableinput"
                  name="endDate"
                  placeholder="EndDate"
                  defaultValue={studentWorkDetailResult.endDate}
                ></input>
                <br />
                <br />
                <input
                  onChange={(e) =>
                    this.handlemyWorkChange(
                      e,
                      studentWorkDetailResult._id,
                      "description"
                    )
                  }
                  class="editableinput"
                  name="description"
                  placeholder="Description"
                  defaultValue={studentWorkDetailResult.description}
                ></input>

                {/* <button
                  class="btn success"
                  onClick={event => this.submitmyReduxProfileStudent(event)}
                >
                  Save
                </button> */}
              </form>
              <button
                class="btn success"
                onClick={(event) =>
                  this.removeWorkDetails(event, studentWorkDetailResult._id)
                }
              >
                Remove
              </button>
              <br />
              <br />
            </div>
          );
        }
      );
    });

    let Addexperience = null;
    console.log("state is", this.state.addWorkFlag);
    if (this.state.addWorkFlag) {
      Addexperience = (
        <div class="card">
          <form>
            <input
              onChange={(e) =>
                this.setState({
                  companyName: e.target.value,
                })
              }
              name="companyName"
              class="editableinput3"
              type="text"
              placeholder={"Company Name"}
            ></input>
            <br />
            <br />
            <input
              onChange={(e) =>
                this.setState({
                  title: e.target.value,
                })
              }
              class="editableinput"
              name="title"
              placeholder="Title"
            ></input>
            <br />
            <br />
            <input
              onChange={(e) =>
                this.setState({
                  startDate: e.target.value,
                })
              }
              class="editableinput"
              name="startDate"
              placeholder="Start Date"
            ></input>
            <br />
            <br />
            <input
              onChange={(e) =>
                this.setState({
                  endDate: e.target.value,
                })
              }
              class="editableinput"
              name="endDate"
              placeholder="End Date"
            ></input>
            <br />
            <br />
            <input
              onChange={(e) =>
                this.setState({
                  description: e.target.value,
                })
              }
              class="editableinput"
              name="description"
              placeholder="Description"
            ></input>
            <br />
          </form>
          <button
            class="btn success"
            onClick={(event) => this.addWorkDetails(event)}
          >
            Save
          </button>
          <br />
          <br />
        </div>
      );
    }

    return (
      <div>
        {redirectVar}
        <body>
          <button
            class="btn success"
            onClick={(event) => this.submitmyReduxProfileStudent(event)}
          >
            Save
          </button>
          <button
            class="btn success"
            onClick={this.redirecttoUpdateProfilePage.bind(this)}
          >
            Go to Profile
          </button>
          <div class="row">
            <div class="leftcolumn">
              <h4>
                <b>My Journey</b>
                {/* <button class="btn success" onClick={e => this.addSkills()}>
                  Add Skills
                </button> */}
              </h4>
              <div class="card">
                {
                  <p>
                    <div>
                      <form>
                        <input
                          class="editableinput2"
                          type="text"
                          name="careerObjective"
                          defaultValue={studentDetails1}
                          onChange={(e) =>
                            this.handleReduxChange(
                              e,
                              this.state.studentDetailsId,
                              "careerObjective"
                            )
                          }
                        />
                        {/* <button
                          class="btn success"
                          onClick={event =>
                            this.submitmyReduxProfileStudent(event)
                          }
                        >
                          Save
                        </button> */}
                        <br />
                        <br />
                      </form>
                    </div>
                  </p>
                }
              </div>
              <h4 class="Profileheading">
                <b>Education</b>
                <button
                  class="btn success"
                  onClick={(e) => this.addEducation()}
                >
                  Add Education
                </button>
                <br />
                <br />
              </h4>
              {Addeducation}
              {studentEducationDetails}

              <br />
              <h4 class="Profileheading">
                <b>Work Experience</b>
                <button class="btn success" onClick={(e) => this.addWork()}>
                  Add Work
                </button>
              </h4>
              <br />
              {Addexperience}
              {studentWorkDetails}
            </div>
            <div class="rightcolumn">
              {studentDetails}
              {studentDetails2}
              <div class="card">{studentDetails3}</div>
            </div>
          </div>
        </body>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  studentObject: state.schools.studentObject,
  filePath: state.schools.filePath,
});

//export Profile Component
export default connect(mapStateToProps, {
  fetchStudent,
  fetchStudentDetails,
  fetchEduDetails,
  fetchWorkExpDetails,
  editMyJourney,
  addEducation,
  addWork,
  editMyedu,
  editMyWork,
  editMyskills,
  editContactDetails,
  removeMyEdu,
  removeMywork,
  editPersonalInfo,
  submitReduxProfileStudent,
  getStudentProfilePicPath,
})(UpdateProfile);