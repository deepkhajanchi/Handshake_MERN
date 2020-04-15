import React, { Component } from 'react';
import cookie from "react-cookies";
import axios from 'axios';

class SkillCard extends Component{
    constructor(props){
        super(props);
        this.state={
            skillArray: [],
            ID: '',
            skill:'',
            addFlag: false
        }
        this.handleToggle= this.handleToggle.bind(this);
        this.handleSave= this.handleSave.bind(this);
    }

    componentDidMount(){
        this.props.studentGetSkills();
       /*
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
        */
    }

    handleToggle = () => {
        if (this.state.addFlag === true) {
            this.setState({
                addFlag: false
            })

        } else {
            this.setState({
                addFlag: true
            })
        }
    }
    handleSave = (e) => {
        console.log('skill sent', this.state.skill)
        let data = {
            ID: localStorage.getItem("ID"),
            skill: this.state.skill
        }
        console.log('pressed save button', data)
    }
    render() {
        let skillElement = null;
        if (this.state.addFlag === true) {
            skillElement =
                <div>
                    <form className='container' >
                        <input
                            onChange={this.handleChange}
                            type='text' id='skill' name='skill' placeholder='Enter your skill'
                            required autoFocus />
                        <button className='btn btn-default btn-xs' onClick={this.handleToggle} type='submit'>Cancel</button>
                        <button className='btn btn-success btn-xs' onClick={this.handleSave}>Save</button>
                    </form>
                </div>
        }
        else {
            skillElement =
                <div>
                    <tr>
                        <td>
                           
                             <div>{this.state.skillArray.map(single => <SingleSkill key={single.SkillID} item={single} />)}</div> */
                            <div>
                                <button style={{ marginTop: '20px' }} className="btn btn-primary"
                                    onClick={this.handleToggle}>Add Skill</button>
                            </div>
                        </td>
                    </tr>
                </div>
        }
        return (
            <div className='container'>
                <label>Skills</label>
                <table className="table table-borderless">
                    <tbody>

                        {skillElement}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default SkillCard;