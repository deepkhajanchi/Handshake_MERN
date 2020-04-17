// import Navbar from "../NavBar/Navbar";
import React, { Component } from "react";
import "./Inbox.css";
import { connect } from "react-redux";
import {
  fetchConversations,
  postMessage,
} from "../../js/actions/actions_messages";
// import { userConstants } from "../../constants";
// import PostJobNav from "../PostJobs/PostJobNav";

class Inbox extends Component {
  state = {
    currentConversation: null,
    messageDraft: "",
    messages: [],
    user: "",
    firstName: "",
    lastName: "",
    studentFlag: false,
    companyFalg: false,
  };

  async componentWillMount() {
    var cookie = JSON.parse(window.localStorage.getItem("cookie"));
    if (cookie.includes("student")) {
      this.setState({
        studentFlag: true,
      });
    } else {
      this.setState({
        companyFalg: true,
      });
    }
    var usernameStudent = JSON.parse(window.localStorage.getItem("username"));
    var firstName = JSON.parse(window.localStorage.getItem("firstName"));
    var lastName = JSON.parse(window.localStorage.getItem("lastName"));
    const userObj = { username: usernameStudent };
    console.log("usernameStudent", usernameStudent);
    this.setState({
      firstName: firstName,
    });
    this.setState({
      user: usernameStudent,
    });
    this.setState({
      lastName: lastName,
    });
    console.log("usernameStudent", this.state.user);
    await this.props.fetchConversations(userObj).then(
      (response) => {
        console.log("fetchConversations", this.props.messages);
      },
      (error) => {
        console.log("Events is", error);
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    if (!this.state.currentConversation) {
      this.setState({ currentConversation: this.props.messages[0] });
    } else {
      this.props.messages.map((conversation) => {
        console.log("Conversarion is", this.state.currentConversation);
        let user1 =
          this.state.currentConversation.user1.username ===
          conversation.user1.username;
        let user2 =
          this.state.currentConversation.user2.username ===
          conversation.user2.username;
        console.log("users are", user1, user2);

        if (user1 && user2) {
          this.setState({
            currentConversation: conversation,
            messageDraft: "",
          });
        }
      });
    }
  }

  render() {
    return (
      <div className="user-inbox">
        {/* {role && role === "R" ? <PostJobNav /> : <Navbar />} */}
        <div className="content">
          <div className="master">
            <div className="master-header">
              <h4 className="t-16 t-black t-normal">Messaging</h4>
            </div>
            <div className="master-content">{this.renderMessageList()}</div>
          </div>
          <div className="detail">{this.renderConversations()}</div>
        </div>
      </div>
    );
  }

  renderMessageList() {
    let conversations = [];
    // let user = JSON.parse(localStorage.getItem("userConstants.USER_DETAILS"));
    let userLogo = "";
    if (this.props.messages && this.props.messages.length > 0) {
      this.props.messages.map((conversation) => {
        console.log(
          "User names",
          conversation.user1.lastname === "Corporation",
          conversation.user2.lastname === "Corporation"
        );
        if (
          conversation.user1.lastname === "Corporation" ||
          conversation.user2.lastname === "Corporation"
        ) {
          userLogo = <img alt="" src={require("./company.png")} />;
        } else {
          userLogo = <img alt="" src={require("./student.png")} />;
        }
        let sender =
          this.state.user === conversation.user1.username
            ? conversation.user2
            : conversation.user1;
        conversations.push(
          <div
            className="message"
            key={conversation._id}
            onClick={this.viewConversation.bind(this, conversation)}
          >
            {userLogo}
            <h5 className="t-14 t-black-light t-normal">
              {sender.firstname + " " + sender.lastname}
            </h5>
          </div>
        );
      });
      return conversations;
    } else {
      return (
        <div className="conversation content-ctr">
          <h4 className="t-14 t-black t-normal">No Messages Yet !</h4>
        </div>
      );
    }
  }

  viewConversation(conversation) {
    this.setState({ currentConversation: conversation });
  }

  renderConversations() {
    let headerName = "";
    // let user = JSON.parse(localStorage.getItem("userConstants.USER_DETAILS"));

    if (this.state.currentConversation) {
      let sender =
        this.state.user === this.state.currentConversation.user1.username
          ? this.state.currentConversation.user2
          : this.state.currentConversation.user1;
      headerName = sender.firstname + " " + sender.lastname;
      return (
        <div className="conversation">
          <div className="conversation-list">
            <div className="conversation-header">
              <img
                alt=""
                src={require("./avatar.png")}
                style={{ width: "40px", height: "40px" }}
              />
              <h6 className="t-14 t-black-light t-normal">{headerName}</h6>
            </div>
            <div className="conversation-content">
              {this.renderMessage()}
              <div
                style={{ float: "left", clear: "both" }}
                ref={(el) => {
                  this.messagesEnd = el;
                }}
              ></div>
            </div>
          </div>
          <div className="input-message">
            <textarea
              rows="6"
              cols="40"
              required
              maxLength="10000"
              className="form-control"
              value={this.state.messageDraft}
              onChange={(event) => {
                this.setState({ messageDraft: event.target.value });
              }}
              name="message"
              placeholder="Enter Message"
            ></textarea>
            <button
              className="btn success"
              onClick={this.sendMessage.bind(this)}
            >
              Send
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="conversation content-ctr">
          <h4 className="t-14 t-black t-normal">No Messages Yet !</h4>
        </div>
      );
    }
  }

  scrollToBottom = () => {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  renderMessage() {
    let messages = [];
    if (this.state.currentConversation) {
      this.state.currentConversation.messages.forEach((message) => {
        messages.push(
          <div key={message._id} className="message-container">
            <p
              className={
                this.state.user === message.from
                  ? "message-content from-bubble"
                  : "message-content to-bubble"
              }
            >
              {message.message}
            </p>
          </div>
        );
      });
    }
    return messages;
  }

  async sendMessage() {
    if (this.state.messageDraft.trim().length > 0) {
      // let user = JSON.parse(localStorage.getItem("user"));
      console.log("Current Props", this.state.currentConversation);
      const userEmail = { username: this.state.user };
      let sender =
        this.state.user === this.state.currentConversation.user1.username
          ? this.state.currentConversation.user2
          : this.state.currentConversation.user1;
      console.log("Sender is", sender);
      let messageDetails = {
        receiver: {
          username: sender.username,
          firstname: sender.firstname,
          lastname: sender.lastname,
        },
        message: this.state.messageDraft,
      };
      let senderInfo = {
        username: this.state.user,
        firstname: this.state.firstName,
        lastname: this.state.lastName,
      };
      let payload2 = {
        messageDetails: messageDetails,
        userEmail: userEmail,
        sender: senderInfo,
      };
      await this.props.postMessage(payload2).then(
        (response) => {
          this.props.messages.map((conversation) => {
            console.log("Conversarion is", this.state.currentConversation);
            let user1 =
              this.state.currentConversation.user1.username ===
              conversation.user1.username;
            let user2 =
              this.state.currentConversation.user2.username ===
              conversation.user2.username;
            console.log("users are", user1, user2);

            if (user1 && user2) {
              this.setState({
                currentConversation: conversation,
                messageDraft: "",
              });
            }
          });
        },
        (error) => {
          console.log("Events is", error);
        }
      );
    }
  }
}

const mapStateToProps = (state) => ({
  messages: state.schools.messages,
});

export default connect(mapStateToProps, { fetchConversations, postMessage })(
  Inbox
);
