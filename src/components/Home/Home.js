import React, {Component} from "react";
import {Card} from "antd";
import classes from "../Navigation/Toolbar/Toolbar.module.css";
import Logo from "../Logo/Logo";
import Background from '../../assets/images/senior.png'
import Aux from './../../hoc/Aux/Aux'




class Home extends Component {


    render() {
        return(
            <div>
                <p style={{position:'fixed', top:'20%', left:'41%', color:'#C25100', fontFamily:'Lobster', fontSize:'30px'}}><strong>Pomocnik seniora</strong></p>
                <div className={classes.Logo} style={{height:"30%", position:'fixed', top:'30%', left:'40%'}}>
                    <Logo />
                </div>
            </div>
        )
    }
}

export default Home