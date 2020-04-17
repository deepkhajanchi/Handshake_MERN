import React, {Component} from 'react';
import '../../Styles/studentmessages.css';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './navbar';


class StudentMessages extends Component{
render(){
    return(
        <div>
        <Navbar/>
        </div>
    );
}
}

export default StudentMessages;