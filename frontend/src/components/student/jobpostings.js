import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

import '../../Styles/jobposting.css';
import Navbar from './navbar';
import JobNav from './jobnav';


class Studentjobs extends Component{
render(){
    return(
        <div>
        
        <Navbar/>
        <JobNav/>
    
            <div>
                <div>
                    <div>
                        <div className="style__container___15rlp style__large___3HKaH">
                            <form>
                                <div id="posting-filters">
                                   
                                        <div className="style__card___1rhof style__fitted___5wNfd">
                                            <div className="style__card-item___B1f7m style__medium___2atZe">
                                                <div className="style__input-fields___3mtFs">
                                                    <div className="style__input-field___2VT8r">
                                                        <svg aria-hidden="true" data-prefix="fas" data-icon="search" className="svg-inline--fa fa-search fa-w-16 style__icon___1ecPC icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z">

                                                            </path>
                                                        </svg>
                                                    <div className="style__form-field___3lYyO">
                                                        <div className="style__form-group-spacing___3cZ0u style__fitted___3UWcg form-group">
                                                            <input name="query" placeholder="Job titles, employers, or keywords" type="text" className="form-control" />
                                                            
                                                        </div>
                                                    </div>
                                                    </div>
                                            <div className="style__space___2f7gG">
                                            
                                            </div>
                                            <div className="style__input-field___2VT8r">
                                                <svg aria-hidden="true" data-prefix="fas" data-icon="map-marker-alt" className="svg-inline--fa fa-map-marker-alt fa-w-12 style__icon___1ecPC icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                                    <path fill="currentColor" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z">

                                                    </path>
                                                </svg>
                                                <div className="style__location___2OaJL form-group">
                                                    <div className="style__places-container___Nhmil">
                                                        <input className="form-control" placeholder="City, State, Zip Code, or Address" type="text" />
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="style__keywords___2SQq8">
                                        <div>
                                        <span>
                                            <span>
                                                <div className="style__filters___28PUq">
                                                    <div className="style__custom-flex___1Wi9I">
                                                        <div className="style__pills___2JqQ3">
                                                            <div>
                                                                <button data-hook="pill" className="style__pill___3uHDM style__small___1oG3P style__blue___mBOsr style__inverse___2z_Ei style__clickable___3a6Y8" title="" aria-label="Full-Time Job" aria-pressed="false" type="button">
                                                                    Full-Time Job
                                                                </button>
                                                                <button data-hook="pill" className="style__pill___3uHDM style__small___1oG3P style__blue___mBOsr style__inverse___2z_Ei style__clickable___3a6Y8" title="" aria-label="Part-Time" aria-pressed="false" type="button">
                                                                    Part-Time
                                                                </button>
                                                                <button data-hook="pill" className="style__pill___3uHDM style__small___1oG3P style__blue___mBOsr style__inverse___2z_Ei style__clickable___3a6Y8" title="" aria-label="Internship" aria-pressed="false" type="button">
                                                                    Internship
                                                                </button>
                                                                <button data-hook="pill" className="style__pill___3uHDM style__small___1oG3P style__blue___mBOsr style__inverse___2z_Ei style__clickable___3a6Y8" title="" aria-label="On-Campus" aria-pressed="false" type="button">
                                                                    On-Campus
                                                                </button>
                                                                    <svg aria-hidden="true" data-prefix="fas" data-icon="filter" className="svg-inline--fa fa-filter fa-w-16 style__filter-icon___3v9dY icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                                        <path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z">

                                                                        </path>
                                                                    </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span>
                                        </span>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="style__container___1Ln6C">
            <div className="style__full-height___DHs_Q style__card___1rhof style__fitted___5wNfd" data-hook="card">
                <div className="style__split-view___YNCfu">
                    <div className="style__results___2OFr9" data-hook="results-pane">
                        <div className="style__controls___5F89H">
                            <div className="style__flex___fCvpa style__align-center___GzLZc style__justify-space-between___F3m5J">
                                <div className="style__flex-item___2eWZ4">
                                  </div>
                                <div className="style__flex-item___2eWZ4">
                                    <div className="dropdown pull-right">
                                        <button data-hook="button" data-toggle="dropdown" type="button" className="style__base___hEhR9 style__small___3-agh">
                                            <svg aria-hidden="true" data-prefix="far" data-icon="sort-amount-down" className="svg-inline--fa fa-sort-amount-down fa-w-16 style__left-icon___1hSd_ icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path fill="currentColor" d="M156.718 404.24l-67.994 72.002c-4.732 5.01-12.713 5.014-17.448 0L3.283 404.24C-3.883 396.652 1.428 384 12.007 384H56V44c0-6.627 5.373-12 12-12h24c6.627 0 12 5.373 12 12v340h43.994c10.587 0 15.884 12.658 8.724 20.24zM236 136h264c6.627 0 12-5.373 12-12v-24c0-6.627-5.373-12-12-12H236c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12zm-12 84v-24c0-6.627 5.373-12 12-12h200c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H236c-6.627 0-12-5.373-12-12zm0 192v-24c0-6.627 5.373-12 12-12h72c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12h-72c-6.627 0-12-5.373-12-12zm0-96v-24c0-6.627 5.373-12 12-12h136c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H236c-6.627 0-12-5.373-12-12z">
                                                </path>
                                            </svg>
                                            <span>
                                                Relevance 
                                            <svg aria-hidden="true" data-prefix="fas" data-icon="caret-down" className="svg-inline--fa fa-caret-down fa-w-10 icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z">
                                                </path>
                                            </svg>
                                            </span>
                                        </button>
                                        <ul className="dropdown-menu" role="menu">
                                            <li>
                                                <a href="#" id="sort-by-default">
                                                    Relevance
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" id="sort-by-expiration_date">
                                                    Expiration Date
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" id="sort-by-created_at">
                                                    Date Posted
                                                </a>
                                            </li>
                                        </ul>
                                        
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

export default Studentjobs;