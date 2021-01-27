import React, {Component} from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import AccessLevelSwitcher from "../../UI/AccessLevelSwitcher/AccessLevelSwitcher";
import * as roleType from './../../../constants/constants'
import {Translate} from "react-redux-i18n";
import {HomeOutlined} from "@ant-design/icons";

class navigationItems extends Component{
    render() {
        return(
            <ul className={classes.NavigationItems}>
                <div className={classes.AccessLevelSwitcher}>{this.props.isAuthenticated ? <AccessLevelSwitcher/> : null} </div>
                <NavigationItem link="/" exact><HomeOutlined style={{paddingRight:'10px', paddingLeft:'10px'}} /></NavigationItem>
                {/*{this.props.isAuthenticated*/}
                {/*    ? null*/}
                {/*    : <NavigationItem link="/register"><Translate value="concerts.register" /></NavigationItem> }*/}
                {this.props.isAuthenticated && this.props.currentRole !=null && this.props.currentRole.authority === roleType.SENIOR  ? <NavigationItem link="/listVolunteers"><Translate value="concerts.volunteers" /></NavigationItem> : null}
                {this.props.isAuthenticated && this.props.currentRole !=null && this.props.currentRole.authority === roleType.ADMIN  ? <NavigationItem link="/listSeniors"><Translate value="seniorzy" /></NavigationItem> : null}
                {this.props.isAuthenticated && this.props.currentRole !=null && this.props.currentRole.authority === roleType.SENIOR  ? <NavigationItem link="/listSeniorReservations"><Translate value="Rezerwacje" /></NavigationItem> : null}
                {this.props.isAuthenticated && this.props.currentRole !=null && this.props.currentRole.authority === roleType.VOLUNTEER  ? <NavigationItem link="/listVolunteerReservations"><Translate value="Rezerwacje" /></NavigationItem> : null}
                {this.props.isAuthenticated && this.props.currentRole !=null && this.props.currentRole.authority === roleType.VOLUNTEER  ? <NavigationItem link="/services"><Translate value="Usługi" /></NavigationItem> : null}
                {this.props.isAuthenticated && this.props.currentRole !=null && this.props.currentRole.authority === roleType.ADMIN  ? <NavigationItem link="/users"><Translate value="concerts.users" /></NavigationItem> : null}
                {this.props.isAuthenticated ? <NavigationItem link="/profile"><Translate value="concerts.profile" /></NavigationItem> : null}
                {!this.props.isAuthenticated
                    ? <NavigationItem link="/login"><Translate value="concerts.login" /></NavigationItem>

                    : <NavigationItem link="/logout"><Translate value="concerts.logout" /></NavigationItem>}
                {this.props.isAuthenticated && this.props.currentRole !=null && this.props.currentRole.authority === roleType.SENIOR ? <button style={{
                    backgroundColor: '#ffe0b3',
                    borderRadius: '15px',
                    margin: '10px',
                    color: 'black'
                }}>Punkty: {this.props.points} </button> : null}

            </ul>
        )
    }
}



export default navigationItems;