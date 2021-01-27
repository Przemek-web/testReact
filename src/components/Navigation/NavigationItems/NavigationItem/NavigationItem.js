import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

class navigationItem extends Component {
    render() {
        // let accessLevelType;
        // if(this.props.currentRole!==null && this.props.currentRole.authority === "ROLE_USER") {
        //     accessLevelType = "User"
        // } else if(this.props.currentRole!==null && this.props.currentRole.authority === "ROLE_ADMIN") {
        //     accessLevelType = "Admin"
        // } else if(this.props.currentRole!==null && this.props.currentRole.authority === "ROLE_MODERATOR") {
        //     accessLevelType = "Moderator"
        // }

        return (
            <li className={classes.NavigationItem}>
                <NavLink
                    to={this.props.link}
                    exact={this.props.exact}
                    activeClassName={classes.active}>{this.props.children}</NavLink>
            </li>
        )
    }
}



export default navigationItem;