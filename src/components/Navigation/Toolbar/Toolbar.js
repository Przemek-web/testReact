import React, {Component} from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
// import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import { Translate } from "react-redux-i18n";
import LanguageSwitcher from "../../UI/LanguageSwitcher/LanguageSwitcher";
import * as roleType from './../../../constants/constants'

import AccessLevelSwitcher from "../../UI/AccessLevelSwitcher/AccessLevelSwitcher";

class toolbar extends Component {
    render() {
        let accessLevelType=null;
        if(this.props.currentRole!==null && this.props.currentRole.authority === roleType.SENIOR) {
            accessLevelType = "Senior"
        } else if(this.props.currentRole!==null && this.props.currentRole.authority === roleType.ADMIN) {
            accessLevelType = "Admin"
        } else if(this.props.currentRole!==null && this.props.currentRole.authority === roleType.VOLUNTEER) {
            accessLevelType = "Volunteer"
        }
        return(
            <header className={[classes.Toolbar, classes[accessLevelType]].join(' ')}>
                {/*<DrawerToggle clicked={props.drawerToggleClicked} />*/}
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <LanguageSwitcher/>


                {/*<div className={classes.Sign}>*/}
                {/*    <p><Translate value="concerts.title" /></p>*/}
                {/*</div>*/}

                <nav className={classes.DesktopOnly}>
                    <NavigationItems isAuthenticated={this.props.isAuth} currentRole = {this.props.currentRole} points={this.props.points} />
                </nav>
            </header>
        )
    }
}


export default toolbar;