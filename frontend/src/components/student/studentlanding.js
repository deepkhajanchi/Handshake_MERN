import React, {Component} from 'react';
import '../../Styles/studentlanding.css';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './navbar';


class Studentlanding extends Component{
render(){
    return(
        <Navbar/>
    );
}
}

export default Studentlanding;