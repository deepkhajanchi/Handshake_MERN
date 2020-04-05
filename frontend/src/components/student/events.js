import React, {Component} from 'react';
import '../../Styles/events.css';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './navbar';


class Studentevents extends Component{
render(){
    return(
        <Navbar/>
    );
}
}

export default Studentevents;