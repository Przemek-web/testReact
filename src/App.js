import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/index';
import Logout from "./containers/Auth/Logout/Logout";
import Register from "./containers/Auth/Register/Register";
import Login from "./containers/Auth/Login/Login";
import TableExample from "./containers/Account/Users/Users";
import User from "./containers/Account/User/User";
import Profile from "./containers/Account/Profile/Profile";
import EditProfile from "./containers/Edit/EditProfile/EditProfile";
import EditUser from "./containers/Edit/EditUser/EditUser";
import EditUserSettings from "./containers/Edit/EditUser/EditUserSettings";
import SeniorRegistration from "./containers/Auth/SeniorRegistration/SeniorRegistration";
import VolunteerRegistration from "./containers/Auth/VolunteerRegistration/VolunteerRegistration";
import ListVolunteers from "./containers/Account/ListVolunteers/ListVolunteers";
import Volunteer from "./containers/Account/Volunteer/Volunteer";
import Reservation from "./containers/Reservation/Reservation";
import Activation from "./containers/Auth/Activation/Activation";
import ForgotPassword from "./containers/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./containers/Auth/ResetPassword/ResetPassword";
import Home from "./components/Home/Home";
import LoginForm from "./containers/Auth/LoginForm/LoginForm/LoginForm";
import ChangePassword from "./containers/Auth/ChangePassword/ChangePassword";
import SeniorReservationList from "./containers/SeniorReservationList/SeniorReservationList";
import VolunteerReservationList from "./containers/VolunteerReservationList/VolunteerReservationList";
import ListSeniors from "./containers/Account/ListSeniors/ListSeniors";
import Senior from "./containers/Account/Senior/Senior";
import Services from "./containers/Services/Services";


class App extends Component {
    componentDidMount () {

        console.log("App.js");
    }

    render () {
        let routes = (
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={LoginForm} />
                <Route exact path="/loginForm" component={LoginForm} />
                <Route exact path="/seniorRegistration" component={SeniorRegistration} />
                <Route exact path="/volunteerRegistration" component={VolunteerRegistration} />
                <Route exact path="/activation/:activationCode" component={Activation} />
                <Route exact path="/forgotPassword" component={ForgotPassword} />
                <Route exact path="/resetPassword/:resetPasswordCode" component={ResetPassword} />
                <Route exact path="/" component={Home} />

                <Redirect to="/" />
            </Switch>
        );

        if ( this.props.isAuthenticated ) {
            routes = (
                <Switch>


                    <Route exact path="/users" component={TableExample}/>
                    <Route exact path="/editUser/:id" component={EditUser}/>
                    <Route exact path="/editUserSettings/:id" component={EditUserSettings}/>
                    <Route path="/users/:id" component={User} />
                    <Route path="/volunteer/:id" component={Volunteer} />
                    <Route path="/senior/:id" component={Senior} />
                    <Route path="/volunteerReservation/:id" component={Reservation} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/profile" component={Profile}/>
                    <Route path="/editProfile" component={EditProfile} />
                    <Route path="/listVolunteers" component={ListVolunteers} />
                    <Route path="/listSeniors" component={ListSeniors} />
                    <Route path="/listSeniorReservations" component={SeniorReservationList} />
                    <Route path="/listVolunteerReservations" component={VolunteerReservationList} />
                    <Route path="/changePassword" component={ChangePassword} />
                    <Route path="/services" component={Services} />

                    <Route exact path="/" component={Home} />


                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <div>
                {this.props.onTryAutoSignup()}
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch( actions.authCheckState() )
    };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
