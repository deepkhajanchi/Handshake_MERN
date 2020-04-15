import React, {Component} from 'react';
import '../../Styles/events.css';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './navbar';
import EventNav from './eventnav';


class Studentevents extends Component{
render(){
    return(
        <div>
            <Navbar/>
            <EventNav/>
        </div>
    );
}
}

export default Studentevents;