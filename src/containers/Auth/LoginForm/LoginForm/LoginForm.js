import React, { Component } from 'react';


import {Form, Input, Button, Checkbox, Card} from "antd";
import {  UserOutlined, LockOutlined  } from "@ant-design/icons";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "../../../../store/actions";
import {Translate} from "react-redux-i18n";

class LoginForm extends Component {


    componentDidMount() {

        this.props.onReset();

    }

    onRedirectSeniorPage = () => {

        this.props.history.push(`/seniorRegistration`)
    }

    onRedirectVolunteerPage = () => {

        this.props.history.push(`/volunteerRegistration`)
    }

    onRedirectForgotPasswordPage = () => {

        this.props.history.push(`/forgotPassword`)
    }


     onFinish = (values) => {
        console.log('Received values of form: ', values);
         this.props.onAuth( values.username, values.password);
    };


    render() {
        const cardStyle = {
            width: '40%',
            backgroundColor: '#fff5e6',
            display: 'block',
            margin: 'auto',
            marginTop:'200px',
            borderWidth: '3px',
            borderRadius: '15px',

        };
        const formStyle = {
            width: '60%',
            padding:'40px',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
        };
        const buttonRedStyle = {
            backgroundColor: '#ff4d4d',
            color: 'white',
            borderRadius: '15px',
            borderColor: 'white',
            margin: '10px'
        }
        const buttonGreenStyle = {
            backgroundColor: '#5cd65c',
            color: 'white',
            borderRadius: '15px',
            borderColor: 'white',
            margin: '10px'
        }

        const buttonStyle = {
            backgroundColor: '#ffe0b3',
            borderRadius: '15px',
            margin: '10px',
            color: 'black'
        }

        let I18n = require('react-redux-i18n').I18n;
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
            this.props.onSetAuthRedirectPath();
        }

        return (

            <Card style={cardStyle} headStyle={{backgroundColor:'#8F5C2C', borderRadius:'15px', color:'white', fontSize:'20px', textAlign:'center'}}
                  title={<div style={{color:'white'}} ><UserOutlined /> <Translate value="concerts.login" /></div>}>
               <div style={{display:'none'}}>{this.props.locale}</div>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}
                style={formStyle}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: I18n.t('concerts.usernameCommunicate'),
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={I18n.t('concerts.username')} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: I18n.t('concerts.passwordCommunicate'),
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder={I18n.t('concerts.password')}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        <Translate value="concerts.loginButton" />
                    </Button>

                </Form.Item>
                <p><Translate value="concerts.seniorHelp" /> <a onClick={this.onRedirectSeniorPage}>  <Translate value="concerts.seniorLink" /></a></p>
                <p><Translate value="concerts.volunteerHelp" />  <a onClick={this.onRedirectVolunteerPage}><Translate value="concerts.volunteerLink" />  </a></p>
                <p><Translate value="concerts.forgetPasswordHelp" /> <a onClick={this.onRedirectForgotPasswordPage} >
                    <Translate value="concerts.resetPasswordLink" />
                </a></p>
            </Form>
            </Card>
        );
    }

}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        locale: state.i18n.locale
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password) => dispatch( actions.login( email, password) ),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
        onReset: () => dispatch(actions.reset())
    };
};


export default connect( mapStateToProps, mapDispatchToProps )( LoginForm );



