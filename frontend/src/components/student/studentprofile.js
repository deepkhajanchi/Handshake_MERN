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
    let redirectVar= null;
  /* if(!cookie.load("cookie")){
       redirectVar=<Redirect to="/" />
   }
   */
    return(
        <div>
            <Navbar/>
                <div>
                    <div>
                        <div>
                            <div className= "style__container___15r1p style__medium___2PHCb">
                                <div className= "style__profile___26D5X">
                                    <div>
                                        <div className="row style__profile-row___KAiYi">
                                            <div className="col-md-4">
                                                <UserInfoCard />
                                                <SkillCard />
                                                <BasicDetailsCard />
                                            </div>
                                        </div>
                                            <div className="col-md-8">
                                                <CareerObjCard />
                                                <EducationCard />
                                                <ExperienceCard />
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
    }
    //else if(this.state.isLogin === false){
      //  return(<Redirect to="/" />)
    //}
}


export default Studentprofile;