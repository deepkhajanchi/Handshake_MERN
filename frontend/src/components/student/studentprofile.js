import React, {Component} from 'react';
import '../../Styles/studentprofile.css';
import UserInfoCard from '../student/Cards/userInfoCard';
import SkillCard from '../student/Cards/skillCard';
import BasicDetailsCard from '../student/Cards/basicdetailsCard';
import CareerObjCard from '../student/Cards/careerObjCard';
import EducationCard from '../student/Cards/educationCard';
import ExperienceCard from '../student/Cards/experienceCard';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './navbar';


class Studentprofile extends Component{
    constructor(props){
        super(props);
        this.state={
            isLogin: true
        }
    }
render(){
    if(this.state.isLogin === true){
    return(
        <div>
        <Navbar/>
        <div className="profilebody">
            <div className="leftbody">
                <UserInfoCard />
                <SkillCard />
                <BasicDetailsCard />
            </div>
            <div className="rightbody">
                <CareerObjCard />
                <EducationCard />
                <ExperienceCard />
            </div>
        </div>

        </div>
    );
    }else if(this.state.isLogin === false){
        return(<Redirect to="/" />)
    }
}
}

export default Studentprofile;