import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Loginform from './student/studentlogin';
import Registerform from './student/studentregister';
import CompanyRegister from './company/companyregister';
import CompanyLogin from './company/companylogin';
import Navbar from './student/navbar';
import Studentlanding from './student/studentlanding';
import Studentmessages from './student/messages';
import Studentevents from './student/events';
import Studentjobs from './student/jobpostings';
import Studentprofile from './student/studentprofile';
import Studentsearch from './student/studentsearch';

//Create a Main Component
class Main extends Component {

    render(){
        return(
            <div>
                <Switch>
                    {/*Render Different Component based on Route*/}
                    <Route exact path="/" component={Loginform}/>
                    <Route path="/studentregister" component={Registerform}/>
                    <Route path="/studentlogin" component={Loginform}/>
                    <Route path="/companyregister" component={CompanyRegister}/>
                    <Route path="/companylogin" component={CompanyLogin}/>
                    <Route path="/navbar" component={Navbar}/>
                    <Route path="/studentlanding" component={Studentlanding}/>
                    <Route path="/messages" component={Studentmessages}/>
                    <Route path="/events" component={Studentevents}/>
                    <Route path="/jobpostings" component={Studentjobs}/>
                    <Route path="/studentprofile" component={Studentprofile}/>
                    <Route path="/studentsearch" component={Studentsearch}/>
                </Switch>
            </div>
        );
    }
}

//Export The Main Component
export default Main;