import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import '../../Styles/eventNav.css'; 
import Navbar from './navbar';

class EventNav extends Component{
    render(){
        let redirectVar= null;
        if(!cookie.load("SID")){
            redirectVar=<Redirect to="/" />
        }
        return(
            <div>
             {redirectVar}
                <Navbar/>
                    <div className="secondary-nav style__secondary-nav___2Hvda" data-hook="secondary-nav">
                        <div data-hook="container" className="style__container___15r1p style__large___3HKaH style__fitted___2ndoo">
                            <div className="style__secondary-nav-content___2zGe0">
                                <h2 className="style__heading___29i1Z style__extra-large___PY8Kd style__fitted___3L0Tr">
                                    Events
                                </h2>
                                <div className="style__secondary-nav-links___1xumQ">
                                    <Link to="/upcomingevents" className="style__secondary-nav-link___2vnRB style__secondary-nav-link-active___A8hIy">
                                        Upcoming Events
                                    </Link>
                                    <Link to="/registeredevents" className="style__secondary-nav-link___2vnRB">
                                        Registered Events
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>  
            </div>
        )
    }
}

export default EventNav;