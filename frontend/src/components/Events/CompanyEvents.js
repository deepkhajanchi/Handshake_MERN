import React, { Component } from "react";
import "../../App.css";
import { Redirect } from "react-router";
import {
  companyEvents,
  companyEventSearch,
  postEvent,
} from "../../js/actions/fetchStudent";
import { connect } from "react-redux";

class CompanyEvents extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      showingAlert: false,
      companyId: "",
      redirect: null,
      eventName: "",
      eventDescription: "",
      eventtime: "",
      eventocation: "",
      eventEligibility: "",
      createEventFlag: false,
      searchValue: "",
      next: "",
      prev: "",
      pageLimit: "5",
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitEventPosting = this.submitEventPosting.bind(this);
    this.cancelEventPosting = this.cancelEventPosting.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  //get the books data from backend
  async componentDidMount() {
    if (JSON.parse(window.localStorage.getItem("cookie"))) {
      const data = {
        companyId: JSON.parse(window.localStorage.getItem("cookie")).split(
          "+"
        )[0],
        page: "1",
        limit: this.state.pageLimit,
      };
      await this.props.companyEvents(data).then(
        (response) => {
          console.log("Events is", this.props.events.results);
          this.setState({
            events: this.state.events.concat(this.props.events.results),
          });
          if (this.props.events.next) {
            this.setState({
              next: this.props.events.next.page,
            });
          }
          if (this.props.events.next) {
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
    this.props.companyEvents(data).then(
      (response) => {
        console.log("Student Details are is", this.props.events.next);
        this.setState({
          events: this.props.events.results,
        });
        if (this.props.events.next) {
          this.setState({
            next: this.props.events.next.page,
          });
        }
        if (this.props.events.prev) {
          this.setState({
            prev: this.props.events.prev.page,
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
      companyId: JSON.parse(window.localStorage.getItem("cookie")).split(
        "+"
      )[0],
    };
    this.props.companyEvents(data).then(
      (response) => {
        this.setState({
          events: this.props.events.results,
        });
        if (this.props.events.next) {
          this.setState({
            next: this.props.events.next.page,
          });
        }
        if (this.props.events.prev) {
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

  handleChange = (e, name) => {
    this.setState({
      [name]: e.target.value,
    });
    console.log(this.state.eventName);
  };

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
    this.props.companyEventSearch(data).then(
      (response) => {
        console.log("Company Events is", response);
        this.setState({
          events: this.props.events,
        });
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
    if (this.state.createEventFlag) {
      var createEvent = (
        <div class="card2">
          <form>
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Event Title:
              <br />
              <input
                class="editableinput5"
                value={this.state.value}
                onChange={(e) => this.handleChange(e, "eventName")}
                name="eventName"
                style={{ marginTop: "15px" }}
              />
            </label>
            <br />
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Description:
              <br />
              <input
                class="editableinput5"
                value={this.state.value}
                onChange={(e) => this.handleChange(e, "eventDescription")}
                name="eventDescription"
                style={{ marginTop: "20px" }}
              />
            </label>
            <br />
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Event Date:
              <br />
              <input
                type="date"
                class="editableinput5"
                name="eventtime"
                min="2019-01-01"
                max="2030-12-31"
                onChange={(e) => this.handleChange(e, "eventtime")}
              ></input>
            </label>
            <br />
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Location:
              <br />
              <input
                class="editableinput5"
                value={this.state.value}
                onChange={(e) => this.handleChange(e, "eventocation")}
                name="eventocation"
                style={{ marginTop: "20px" }}
              />
            </label>
            <br />
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Eligibility:
              <br />
              <input
                class="editableinput6"
                value={this.state.value}
                rows="10"
                cols="30"
                onChange={(e) => this.handleChange(e, "eventEligibility")}
                name="eventEligibility"
                style={{ marginTop: "20px" }}
              />
            </label>
            <br />
            <br />
            <br />
            <button
              class="btn2 success"
              onClick={(event) => this.cancelEventPosting(event)}
            >
              Cancel
            </button>
            <button
              class="btn3 success"
              onClick={(event) => this.submitEventPosting(event)}
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
    //iterate over books to create a table row
    if (this.state.showingAlert) {
      let alert = (
        <div
          className={`alert alert-success ${
            this.state.showingAlert ? "alert-shown" : "alert-hidden"
          }`}
        >
          <strong>Hurray!!</strong> You have successfully registered to this
          event
        </div>
      );
    }

    let events = this.state.events.map((event) => {
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
          <h4>
            Event Date: {eventTime}
            <button
              class="btn success"
              onClick={(event1) =>
                this.viewRegisteredStudents(event1, event._id, event.companyId)
              }
            >
              Registered Students
            </button>
          </h4>
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
        {alert}
        {redirectVar}
        <div class="row">
          <h3 class="heading">
            {" "}
            Upcoming Events
            <button
              class="btn3 success"
              onClick={(event) => this.createEvent(event)}
            >
              Post an Event
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
          </div>
          <br />
          {createEvent}
          <br />
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

  createEvent = (event) => {
    this.setState({ createEventFlag: true });
  };

  viewRegisteredStudents = (event, eventId, companyId) => {
    this.setState({ redirect: `/studentsRegisteredForEvent/${eventId}` });
  };

  submitEventPosting = (event) => {
    const data = {
      eventName: this.state.eventName,
      eventDescription: this.state.eventDescription,
      eventtime: this.state.eventtime,
      eventocation: this.state.eventocation,
      eventEligibility: this.state.eventEligibility,
      companyId: JSON.parse(window.localStorage.getItem("cookie")).split(
        "+"
      )[0],
    };
    this.props.postEvent(data).then(
      (response) => {
        console.log("Event Created Res::", response.data);
        this.setState({
          events: this.props.events,
        });
      },
      (error) => {
        console.log("Events is", error);
      }
    );
    this.setState({ createEventFlag: false });
  };
  cancelEventPosting = (event) => {
    this.setState({ createEventFlag: false });
  };
}
const mapStateToProps = (state) => ({
  events: state.schools.events,
});

//export Profile Component
export default connect(mapStateToProps, {
  companyEvents,
  companyEventSearch,
  postEvent,
})(CompanyEvents);