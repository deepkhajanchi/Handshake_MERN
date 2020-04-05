import React, {Component} from 'react';
import '../../Styles/studentprofile.css';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './navbar';


class Studentprofile extends Component{
render(){
    return(
        <Navbar/>
        
    );
}
}

export default Studentprofile;