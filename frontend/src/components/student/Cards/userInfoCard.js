import React, { Component } from 'react';
import cookie from "react-cookies";
import axios from 'axios';

class UserInfoCard extends Component{
    constructor(props){
        super(props);
        this.state={
            editFlag: false
        }
        this.handleEdit= this.handleEdit.bind(this);
        this.handleCancel= this.handleCancel.bind(this);
        this.handleSave= this.handleSave.bind(this);
    }

    componentDidMount(){
        this.props.studentGetUserInfo();
        let data= {
            cookie: cookie.load("cookie")
        }
        axios(
            {
                url: 'https://localhost:3001/getProfilePic',
                method: "GET",
                params: data
            }
        ).then(response=>{
            console.log("student basic details", response.data);
            this.setState({
                profilePic: response.data
            })
        })
    }
    handleEdit=()=>{
        this.setState({
            editFlag: true
        })
    }
    handleCancel=()=>{
        this.setState({
            editFlag:false
        })
    }
    handleSave=(e)=>{
        e.preventDefault();
        this.props.studentUpdateContactInfo({
            cookie: cookie.load("cookie"),
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value
        });
        this.setState({
            editFlag: false
        })
    }
    render() {
        let edit = null;
        let userInfo = null;

        if (this.state.editFlag === false) {
            userInfo =
                <ul className="container" >
                    <li className="list-group-item">{this.props.email}</li>
                    <li className="list-group-item">{this.props.phone}</li>
                </ul>

            edit =
                <button onClick={this.handleEdit} className="btn btn-primary btn-xs">
                    Edit
                </button>
        }
        else {
            userInfo =
                <form className="container">
                    <input
                        style={{ marginTop: '20px' }}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required
                        autoFocus />
                    <br />
                    <input
                        style={{ marginTop: '20px' }}
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="phone"
                        required />
                    <br />
                    <button style={{ marginTop: '20px' }} className="btn btn-danger btn-xs" onClick={this.handleCancel}>Cancel</button>
                    <button style={{ marginTop: '20px', marginLeft: '20px' }} className="btn btn-success btn-xs" onClick={this.handleSave}>Save</button>
                </form>
        }
        return (
            <div className="container">
                <label for="">Contact Information</label>
                {userInfo}
                {edit}
            </div>
        );
    }
}


export default UserInfoCard;