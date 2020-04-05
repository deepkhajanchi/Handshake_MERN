import React, {Component} from 'react';
import '../../Styles/studentmessages.css';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './navbar';


class Studentmessages extends Component{
render(){
    return(
        <Navbar/>
    );
}
}

export default Studentmessages;