import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navbar';
import JobNav from './jobnav';

class Oncampus extends Component{
    render(){
        return(
            <div>
            <Navbar/>
            <JobNav/>
            </div>
        )
    }
}

export default Oncampus;