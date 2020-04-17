import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Loginform from './student/studentlogin';
import Registerform from './student/studentregister';
import Studentlanding from './student/studentlanding';
import Navbar from './student/navbar';
import JobNav from './student/jobnav';
import Studentjobs from './student/jobpostings';
import EventNav from './student/eventnav';
import Studentevents from './student/events';
import Studentsearch from './student/studentsearch';
import Studentmessages from './student/messages';
import Studentprofile from './student/studentprofile';
import Applications from './student/applications';
import UpcomingEvents from './student/upcomingevents';
import RegisteredEvents from './student/registeredevents';


import CompanyRegister from './company/companyregister';
import CompanyLogin from './company/companylogin';
import CompanyNav from './company/companyNav';
import CompanyProfile from './company/companyprofile';
import CompanyJobs from './company/companyJobs';
import CompanyEvents from './company/companyEvents';
import CompanyStudents from './company/companyStudents';
import OtherStudent from './company/companyStudentsevents';
import CompanyMessages from './company/companyMessages';


//Create a Main Component
class Main extends Component {

    render(){
        return(
            <div>
                
                    {/*Render Different Component based on Route*/}
                    <Route exact path="/" component={Loginform}/>
                    <Route path="/studentregister" component={Registerform}/>
                    <Route path="/studentlogin" component={Loginform}/>
		            <Route path="/studentlanding" component={Studentlanding}/>
		            <Route path="/navbar" component={Navbar}/>
		            <Route path="/jobnav" component={JobNav}/>
                    <Route path="/jobpostings" component={Studentjobs}/>
                    <Route path="/applications" component={Applications}/>
                    <Route path="/eventnav" component={EventNav}/>
                    <Route path="/events" component={Studentevents}/>
                    <Route path="/studentsearch" component={Studentsearch}/>
                    <Route path="/messages" component={Studentmessages}/>
                    <Route path="/studentprofile" component={Studentprofile}/>
                    <Route path="/upcomingevents" component={UpcomingEvents}/>
                    <Route path="/registeredevents" component={RegisteredEvents}/>

		            <Route path="/companyregister" component={CompanyRegister}/>
                    <Route path="/companylogin" component={CompanyLogin}/>
                    <Route path="/companyNav" component={CompanyNav}/>
                    <Route path="/companyProfile" component={CompanyProfile}/>
                    <Route path="/companyJobs" component={CompanyJobs}/>
                    <Route path="/companyEvents" component={CompanyEvents}/>
                    <Route path="/companyStudents" component={CompanyStudents}/>
                    <Route path="/companyStudentsevents" component={OtherStudent}/> 
                    <Route path="/companyMessages" component={CompanyMessages}/> 
                     
            </div>
        );
    }
}

//Export The Main Component
export default Main;
