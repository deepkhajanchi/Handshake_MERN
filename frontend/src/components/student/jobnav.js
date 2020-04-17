import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import '../../Styles/jobNav.css'; 

class JobNav extends Component{
    render(){
        let redirectVar= null;
        if(!cookie.load("SID")){
            redirectVar = <Redirect to="/" />
        }
        return(
           
<div className="secondary-nav style__secondary-nav___2Hvda" data-hook="secondary-nav">
{redirectVar}
<div data-hook="container" className="style__container___15r1p style__large___3HKaH style__fitted___2ndoo">
    <div className="style__secondary-nav-content___2zGe0">
        <h2 className="style__heading___29i1Z style__extra-large___PY8Kd style__fitted___3L0Tr">
            Job Search
        </h2>
        <div className="style__secondary-nav-links___1xumQ">
            <Link to="/jobpostings" className="style__secondary-nav-link___2vnRB style__secondary-nav-link-active___A8hIy">
                Job Search
            </Link>
            <Link to="/applications" className="style__secondary-nav-link___2vnRB">
                Applications
            </Link>
            <Link to="/employers" className="style__secondary-nav-link___2vnRB">
                Employers
            </Link>
            <Link to="/oncampus" className="style__secondary-nav-link___2vnRB">
                On-Campus Interviews
            </Link>
        </div>
    </div>
</div>
</div>
        )
    }
}

export default JobNav;