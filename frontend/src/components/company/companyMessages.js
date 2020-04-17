import React, {Component} from 'react';
import '../../Styles/studentmessages.css';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import CompanyNav from './companyNav';


class CompanyMessages extends Component{
render(){
    return(
        <div>
        <CompanyNav/>
        </div>
    );
}
}

export default CompanyMessages;