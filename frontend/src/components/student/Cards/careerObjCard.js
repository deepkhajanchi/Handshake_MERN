import React, { Component } from 'react';
import cookie from "react-cookies";
import axios from 'axios';

class CareerObjCard extends Component{
    constructor(props){
        super(props);
        this.state={
            careerObjective: '',
            editFlag: false
        }
        this.handleEdit= this.handleEdit.bind(this);
        this.handleCancel= this.handleCancel.bind(this);
        this.handleSave= this.handleSave.bind(this);
    }

    componentDidMount(){
        this.props.studentGetCareerObjective();
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

    handleSave=()=>{
        let data={
            SID: cookie.load("SID"),
            careerObjective: document.getElementById("careerObjective").value
        }
        this.props.studentUpdateCareerObjective(data);
    }

    render(){
        let career=null;
        let editButton= null;

        if(this.state.editFlag ===false){
            career= 
            <ul className="container">
                <li className="list-group-item">{this.props.careerObjective}</li>
            </ul>

            editButton=
            <button onClick={this.handleEdit} className="btn btn-primary btn-xs">
                Update
            </button>
        }else{
            career=
            <form className="container">
                <textarea style={{ width: '400px', height: '100px', marginTop: '20px' }} placeholder="Tell us more" name="careerObjective" id="careerObjective" required autoFocus />
                <br/>

                <button style={{marginTop: '20px'}} className="btn btn-danger" onClick={this.handleCancel}>Cancel</button>
                <button style={{ marginTop: '20px', marginLeft: '20px' }} className="btn btn-success" onClick={this.handleSave}>Save</button>
            </form>
        }
        return(
           
                <div className="container">
                    <h4>
                    What are you passionate about? What are you looking for on Handshake? What are your experiences or skills?
                    </h4>
                    {career}
                    {editButton}
                </div>
  
        );
    }

}

export default CareerObjCard;