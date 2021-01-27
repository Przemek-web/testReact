import React, { Component } from 'react';
import UserDataService from "../../../service/UserDataService";
import {toast} from "react-toastify";
import * as roleType from "../../../constants/constants";
import NavigationItem from "../../../components/Navigation/NavigationItems/NavigationItem/NavigationItem";

class Activation extends Component {


    state = {
        activationCode: this.props.match.params.activationCode,
        errorMessage: null

    }

    componentDidMount() {
        UserDataService.getActivationInfo(this.state.activationCode)
            .then(response => {
                console.log('Response activationInfo ' + JSON.stringify(response));

                })
            .catch( err => {
                this.setState({
                    errorMessage: err.response.data.message
                })
                console.log('Blad ' + JSON.stringify(err))

            } );
    }

    handleActivationInfo = () => {
        console.log("ActivationCOdeState: "+ this.state.activationCode)
        if (this.state.activationCode !== null) {
            <div>Brawo! Twoje konto zostało aktywowane</div>
        }
    }


    render() {

        let errorMessage = null;

        if (this.state.errorMessage !== null) {
            errorMessage = (
                <div className="invalid-feedback">{this.state.errorMessage}</div>
            );
        }

        return(
            <div>
                {this.state.activationCode !==null && this.state.errorMessage === null  ? <div>Brawo aktywowałeś konto</div> : null}
                {errorMessage}

            </div>
        )
    }
}

export default Activation;