import React, { Component } from 'react';
import cookie from "react-cookies";
import axios from 'axios';

class EducationCard extends Component{
    constructor(props){
        super(props);
        this.state={
            profilePic: "",
            editFlag: false
        }
        this.handleEdit= this.handleEdit.bind(this);
        this.handleCancel= this.handleCancel.bind(this);
        this.handleSave= this.handleSave.bind(this);
    }

    componentWillMount(){
        this.props.studentGetBasicDetails();
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

}

export default EducationCard;