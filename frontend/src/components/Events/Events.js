import React, { Component } from "react";
import "../../App.css";
import { Redirect } from "react-router";
import {
  fetchEvents,
  registerStudentToEvent,
  fetchStudent,
  registeredEvents,
  upcomingEvents,
  eventSearch,
} from "../../js/actions/fetchStudent";
import { connect } from "react-redux";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsState: [],
      showingAlert: false,
      showPopup: false,
      searchValue: "",
      studentprofile: [],
      studentMajor: "",
      registeredEventIds: [],
      registeredEvents: [],
      next: "",
      prev: "",
      pageLimit: "5",
      events: [],
    };
    this.props = this.initialState;
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.viewRegisteredEvents = this.viewRegisteredEvents.bind(this);
  }

  //get the books data from backend
  async componentDidMount() {
    console.log(
      "in componentDidMount",
      JSON.parse(window.localStorage.getItem("cookie"))
    );
    if (JSON.parse(window.localStorage.getItem("cookie"))) {
      await this.props
        .fetchStudent(
          JSON.parse(window.localStorage.getItem("cookie")).split("+")[0]
        )
        .then(
          (response) => {
            this.setState({
              studentMajor: response.data.presentCourse,
            });
            this.setState({
              registeredEventIds: response.data.registeredEvents,
            });
          },
          (error) => {
            console.log("Events is", error);
          }
        );
      const data = {
        page: "1",
        limit: this.state.pageLimit,
      };
      await this.props.fetchEvents(data).then(
        (response) => {
          console.log("Events is", this.props.events[0].results);
          this.setState({
            events: this.props.events[0].results,
          });
          if (this.props.events[0].next) {
            this.setState({
              next: this.props.events[0].next.page,
            });
          }
          if (this.props.events[0].next) {
            this.setState({
              prev: "1",
            });
          }
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
      };
    } else {
      data = {
        page: this.state.prev,
        limit: this.state.pageLimit,
      };
    }
    console.log("data isss", data);
    this.props.fetchEvents(data).then(
      (response) => {
        console.log("Student Details are is", this.props.events[0].next);
        this.setState({
          events: this.props.events[0].results,
        });
        if (this.props.events[0].next) {
          this.setState({
            next: this.props.events[0].next.page,
          });
        }
        if (this.props.events[0].prev) {
          this.setState({
            prev: this.props.events[0].prev.page,
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
    };
    this.props.fetchEvents(data).then(
      (response) => {
        console.log("Student Details are is", this.props.events[0].next);
        this.setState({
          events: this.props.events[0].results,
        });
        if (this.props.events[0].next) {
          this.setState({
            next: this.props.events[0].next.page,
          });
        }
        if (this.props.events[0].prev) {
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

  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };
  handleSearch = () => {
    this.props.eventSearch(this.state.searchValue).then(
      (response) => {
        console.log("Events is", response);
        this.setState({
          events: this.props.events,
        });
      },
      (error) => {
        console.log("Events is", error);
      }
    );
  };

  viewRegisteredEvents(event, id) {
    console.log("Outd");
    if (JSON.parse(window.localStorage.getItem("cookie"))) {
      const data = {
        studentId: JSON.parse(window.localStorage.getItem("cookie")).split(
          "+"
        )[0],
      };
      this.props.registeredEvents(data).then(
        (response) => {
          console.log("Event Registered", this.props.events);
          this.setState({
            events: this.props.events,
          });
          this.setState({
            upComingEvents: true,
          });

          console.log("Event Registered", this.props.events);
        },
        (error) => {
          console.log("Events Error is", error);
        }
      );
    }
  }

  viewUpcomingEvents() {
    this.props.upcomingEvents().then(
      (response) => {
        console.log("Event Upcoming", this.props.events);
        this.setState({
          events: this.props.events,
        });
      },
      (error) => {
        console.log("Events Error is", error);
      }
    );
  }

  render() {
    let events = this.state.events.map((event) => {
      console.log(
        "event id issss",
        event._id,
        this.state.registeredEventIds,
        !this.state.registeredEventIds.includes(event._id)
      );
      let viewButton = "";
      if (!this.state.registeredEventIds.includes(event._id)) {
        console.log(
          "Hi",
          this.state.studentMajor,
          this.state.registeredEventIds
        );
        console.log(event.eventEligibility);
        console.log(this.state.studentMajor === event.eventEligibility);
        if (
          this.state.studentMajor === event.eventEligibility ||
          event.eventEligibility === "All"
        ) {
          viewButton = (
            <button
              class="btn success"
              onClick={(event1) =>
                this.registerToEventDetails(event1, event._id, event.companyId)
              }
            >
              Register
            </button>
          );
        } else {
          viewButton = (
            <button
              class="btn success"
              disabled
              onClick={(event1) =>
                this.registerToEventDetails(event1, event._id, event.companyId)
              }
            >
              Not Eligible
            </button>
          );
        }
      } else {
        viewButton = (
          <button
            disabled
            class="btn success"
            onClick={(event1) =>
              this.registerToEventDetails(event1, event._id, event.companyId)
            }
          >
            Registered
          </button>
        );
      }
      if (event.eventtime) {
        var eventTime = event.eventtime.slice(0, 10);
      }
      return (
        <div class="card2">
          <div class="wrapper">
            <img src={require("./events.jpg")} class="image--cover2"></img>
          </div>
          <h4>Event Name : {event.eventName}</h4>
          <h4>Location : {event.eventLocation}</h4>
          <h4>Event Date: {eventTime}</h4>
          {viewButton}
          {/* <h4>Posting Date: {jobPosting.postingDate}</h4> */}
          <h4>Event Eligibility : {event.eventEligibility}</h4>
          <h5>Description : {event.eventDescription}</h5>
        </div>
      );
    });
    //if not logged in go to login page
    let redirectVar = null;
    console.log("Cookie is", JSON.parse(window.localStorage.getItem("cookie")));
    if (!JSON.parse(window.localStorage.getItem("cookie"))) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <div class="row">
          <h3 class="heading">
            {" "}
            Events
            <button
              class="btn5 success"
              onClick={(event) =>
                this.viewRegisteredEvents(
                  event,
                  JSON.parse(window.localStorage.getItem("cookie")).split(
                    "+"
                  )[0]
                )
              }
            >
              {" "}
              Registered Events
            </button>
            <button
              class="btn6 success"
              onClick={this.viewUpcomingEvents.bind(this)}
            >
              {" "}
              Upcoming Events
            </button>
          </h3>
          <br />
          <br />
          <div>
            <input
              name="text"
              type="text"
              class="searchComponent"
              placeholder="  Search for an Event Name / Location"
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
            {events}
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

  registerToEventDetails = (event, eventId, companyId) => {
    if (JSON.parse(window.localStorage.getItem("cookie"))) {
      const data = {
        _id: eventId,
        companyId: companyId,
        studentId: JSON.parse(window.localStorage.getItem("cookie")).split(
          "+"
        )[0],
      };
      console.log("studentId", data);
      this.props.registerStudentToEvent(data).then(
        (response) => {
          if (response.data == "Successfully Updated") {
            console.log("Registered is", response);
            this.setState({
              showingAlert: true,
            });
            alert("Successfully Registered for this event");
          } else {
            this.setState({
              showingAlert: true,
            });
            alert("Not Registered for this event");
          }
        },
        (error) => {
          console.log("Error Registering for this event");
        }
      );
    }
  };
}
const mapStateToProps = (state) => ({
  events: state.schools.events,
  studentObject: state.schools.studentObject,
});

//export Profile Component
export default connect(mapStateToProps, {
  fetchEvents,
  registerStudentToEvent,
  fetchStudent,
  registeredEvents,
  upcomingEvents,
  eventSearch,
})(Events);