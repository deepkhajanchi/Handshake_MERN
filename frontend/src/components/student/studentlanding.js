import React, {Component} from 'react';
import '../../Styles/studentlanding.css';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './navbar';


class Studentlanding extends Component{
render(){
    let redirectVar= null;
    if(!cookie.load('SID')){
        redirectVar= <Redirect to='/' />
    }
    return(  
        <div>
             <Navbar/>
             <div className="bodyclass" data-react-className="StudentsHomeRoot">
                <div>
                    <div>
                        <div className="style__page___3P4sN">
                            <div className="understylepage">
                                <div className="style__dark-blue-background___3qXNF">
                                    <div className="style__container___15rlp style__large___3HKaH style__fitted___2ndoo">
                                        <h2 className="content-type-navigation-heading style__heading___29i1Z style__large___15W-p">
                                            What can we help you find today?
                                        </h2>
                                        <div className="style__cards___vCW7l">
                                            <div className="style__flex__fCvpa style__inline___2arqA">
                                                <div className="style__flex___fCvpa style__inline___2arqA">
                                                <div className="style__linked-card___1gGYN style__linked-card___2upG4">
                                                    <div>
                                                        <div className="style__card___PnOHK style__card___1rhof" data-hook="card">
                                                            <div className="style__card-item___B1f7m style__full-height___2Ciyb"> 
                                                                <div className="style__flex___fCvpa style__justify-flex-end___229cl style__column___1Ye52 style__full-height___3AWW4">
                                                               <img src="https://handshake-production-cdn.joinhandshake.com/assets/student-dashboard/content-type-navigation/jobs-1de9bdef638d3b2bfd9fc070e120cbcb077cca64a21983246f8ea1f36656c51e.svg" className="style__illustration___2pK_r" alt="jobs" />
                                                                        <h2 className="style__heading___34JlE style__heading___29i1Z style__large___l5W-p">
                                                                            <Link to="/jobpostings">
                                                                                Jobs
                                                                                <span className="style__arrow___2xTOf"> →
                                                                                </span>
                                                                            </Link>
                                                                        </h2>
                                                                        <div className="style__text___2ilXR style__tight___RF4uH style__muted___2z7cM">
                                                                            Find internships and full-time jobs
                                                                        </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="style__linked-card___1gGYN style__linked-card___2upG4">
                                                    <div>
                                                        <div className="style__card___PnOHK style__card___1rhof" data-hook="card">
                                                            <div className="style__card-item___B1f7m style__full-height___2Ciyb">
                                                                <div className="style__flex___fCvpa style__justify-flex-end___229cl style__column___1Ye52 style__full-height___3AWW4">
                                                              <img src="https://handshake-production-cdn.joinhandshake.com/assets/student-dashboard/content-type-navigation/jobs-1de9bdef638d3b2bfd9fc070e120cbcb077cca64a21983246f8ea1f36656c51e.svg" className="style__illustration___2pK_r" alt="employer" />
                                                                        <h2 className="style__heading___34JlE style__heading___29i1Z style__large___l5W-p">
                                                                            <a href="">
                                                                                Employers
                                                                                <span className="style__arrow___2xTOf"> →
                                                                                </span>
                                                                            </a>
                                                                        </h2>
                                                                        <div className="style__text___2ilXR style__tight___RF4uH style__muted___2z7cM">
                                                                            Discover the right company for you
                                                                        </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="style__linked-card___1gGYN style__linked-card___2upG4">
                                                    <div>
                                                        <div className="style__card___PnOHK style__card___1rhof" data-hook="card">
                                                            <div className="style__card-item___B1f7m style__full-height___2Ciyb">
                                                                <div className="style__flex___fCvpa style__justify-flex-end___229cl style__column___1Ye52 style__full-height___3AWW4">
                                                                    <img src="https://handshake-production-cdn.joinhandshake.com/assets/student-dashboard/content-type-navigation/community-b9569db28e5b36aedf5505f065b2e13486f59958c47711efa879a0f945574481.svg" alt="Community" className="style__illustration___2pK_r" />
                                                                        <h2 className="style__heading___34JlE style__heading___29i1Z style__large___l5W-p">
                                                                            <Link to="">
                                                                                Community
                                                                                <span className="style__arrow___2xTOf"> →
                                                                                </span>
                                                                            </Link>
                                                                        </h2>
                                                                        <div className="style__text___2ilXR style__tight___RF4uH style__muted___2z7cM">
                                                                            Learn from alumni and students
                                                                        </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="style__linked-card___1gGYN style__linked-card___2upG4">
                                                    <div>
                                                        <div className="style__card___PnOHK style__card___1rhof" data-hook="card">
                                                            <div className="style__card-item___B1f7m style__full-height___2Ciyb">
                                                                <div className="style__flex___fCvpa style__justify-flex-end___229cl style__column___1Ye52 style__full-height___3AWW4">
                                                                    <img src="https://handshake-production-cdn.joinhandshake.com/assets/student-dashboard/content-type-navigation/career-paths-e65567d3d8dec3783f22bdeb3c1b799ec2a7ffdb61ad0d810f0e6fa3786a6c49.svg" alt="Career paths" className="style__illustration___2pK_r" />
                                                                        <h2 className="style__heading___34JlE style__heading___29i1Z style__large___l5W-p">
                                                                            <Link to="">
                                                                                Career paths
                                                                                <span className="style__arrow___2xTOf"> →
                                                                                </span>
                                                                            </Link>
                                                                        </h2>
                                                                        <div className="style__text___2ilXR style__tight___RF4uH style__muted___2z7cM">
                                                                            Explore roles and average salaries
                                                                        </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="style__linked-card___1gGYN style__linked-card___2upG4">
                                                    <div>
                                                        <div className="style__card___PnOHK style__card___1rhof" data-hook="card">
                                                            <div className="style__card-item___B1f7m style__full-height___2Ciyb">
                                                                <div className="style__flex___fCvpa style__justify-flex-end___229cl style__column___1Ye52 style__full-height___3AWW4">
                                                                    <img src="https://handshake-production-cdn.joinhandshake.com/assets/student-dashboard/content-type-navigation/events-6fd0eb0ecb4e4cfc7df7930c529f90eeb08a61f329f20336dd2543ee7703a410.svg" alt="Events" className="style__illustration___2pK_r" />
                                                                        <h2 className="style__heading___34JlE style__heading___29i1Z style__large___l5W-p">
                                                                            <Link to="/events">
                                                                                Events
                                                                                <span className="style__arrow___2xTOf"> →
                                                                                </span>
                                                                            </Link>
                                                                        </h2>
                                                                        <div className="style__text___2ilXR style__tight___RF4uH style__muted___2z7cM">
                                                                            Register for events and careers fairs
                                                                        </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="style__linked-card___1gGYN style__linked-card___2upG4">
                                                    <div>
                                                        <div className="style__card___PnOHK style__card___1rhof" data-hook="card">
                                                            <div className="style__card-item___B1f7m style__full-height___2Ciyb">
                                                                <div className="style__flex___fCvpa style__justify-flex-end___229cl style__column___1Ye52 style__full-height___3AWW4">
                                                                    <img src="https://s3.amazonaws.com/handshake.production/app/public/assets/schools/122/original/hs-school-logo-data.?1559840573" alt="career center" className="style__illustration___2pK_r" />
                                                                        <h2 className="style__heading___34JlE style__heading___29i1Z style__large___l5W-p">
                                                                            <Link to="">
                                                                                Career center
                                                                                <span className="style__arrow___2xTOf"> →
                                                                                </span>
                                                                            </Link>
                                                                        </h2>
                                                                        <div className="style__text___2ilXR style__tight___RF4uH style__muted___2z7cM">
                                                                            Connect with the experts
                                                                        </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    );
}
}

export default Studentlanding;