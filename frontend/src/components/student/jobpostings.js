import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './navbar';
import JobNav from './jobnav';


class Studentjobs extends Component{
render(){
    return(
        <div>
        <Navbar/>
        <JobNav/>
        </div>
    );
}
}

export default Studentjobs;