import React, {Component} from 'react';
import '../../Styles/events.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './navbar';
import EventNav from './eventnav';


class Studentevents extends Component{
    constructor(props){
        super(props);
        this.state={
            activeKey:1
        }
        this.handleSelect= this.handleSelect.bind(this);
    }

    handleSelect(selectedKey,event){
        this.setState({
            activeKey: selectedKey
        });
    }
render(){
    let redirectVar= null;
    if(!cookie.load("SID")){
        redirectVar= <Redirect to="/" />
    }
    return(
        <div className="container">
            {redirectVar}
            <Navbar/>
            <EventNav/>
        </div>
    );
}
}

export default Studentevents;