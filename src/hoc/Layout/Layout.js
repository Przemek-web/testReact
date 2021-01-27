import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Toast from "../../components/Toast/Toast";
import FooterToolbar from 'ant-design-pro/lib/FooterToolbar';
import {Button} from "antd";
import * as actions from "../../store/actions";
import * as roleType from './../../constants/constants';


class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render () {


        let loadPoints = null;

        if (this.props.checkCurrentRole === roleType.SENIOR && this.props.senior !== null ) {
            let seniorId = this.props.senior.id
            loadPoints = <div>{this.props.onLoadPoints(seniorId)}</div>
        }
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    currentRole={this.props.checkCurrentRole}
                    points={this.props.points}
                    drawerToggleClicked={this.sideDrawerToggleHandler} />


                <main className={classes.Content}>
                    {this.props.children}
                    {/*Home*/}
                    {loadPoints}
                    {console.log("xd")}

                </main>
            </Aux>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {

       onLoadPoints: (id) => dispatch(actions.loadPoints(id))
    };
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        checkCurrentRole: state.auth.currentRole,
        senior: state.auth.user,
        points: state.auth.points

    };
};

export default connect( mapStateToProps, mapDispatchToProps() )( Layout );