import React, { Component } from 'react';
import UserDataService from "../../../service/UserDataService";
import {Button, Card, Form, Input, Tooltip} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import axios from "axios";
import {toast} from "react-toastify";


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        // range: '${label} must be between ${min} and ${max}',
        range: 'Phone number must contains 9 digits'
    },
};


class ResetPassword extends Component {

    state = {
        resetPasswordCode: this.props.match.params.resetPasswordCode,
        errorMessage: null

    }

    componentDidMount() {
        UserDataService.getResetPasswordInfo(this.state.resetPasswordCode)
            .then(response => {
                console.log('Response resetPasswordInfo ' + JSON.stringify(response));

            })
            .catch( err => {
                this.setState({
                    errorMessage: err.response.data.message
                })
                console.log('Blad ' + JSON.stringify(err))

            } );
    }

    onFinish = (values) => {


        const data = {...values, resetPasswordCode: this.state.resetPasswordCode}
        console.log(data)

        axios.post("/api/users/resetPassword", data, {headers: {
                'Accept-Language': this.props.locale
            }})
            .then(response => {
                console.log('Response ' + JSON.stringify(response));
                toast.success('Successful send Reset password email', {position: toast.POSITION.BOTTOM_RIGHT})
            })
            .catch(err => {
                console.log('Error ' + JSON.stringify(err.response))
                toast.error(err.response.data.message, {position: toast.POSITION.BOTTOM_RIGHT})
            });
    };

    render() {

        const cardStyle = {
            width: '70%',

            display: 'block',
            margin: 'auto',
            marginTop:'100px',
            borderWidth: '3px',
            borderRadius: '15px',

        };
        const formStyle = {
            width: '35%',

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



        return (
            <div>
                {this.state.resetPasswordCode}
                <Card style={cardStyle}>

                    <Form {...layout}
                          name="nest-messages" onFinish={this.onFinish}
                          validateMessages={validateMessages}
                          style={formStyle}
                    >
                        <p><strong>Odzyskaj haslo:</strong></p>

                        <Form.Item
                            name="password"
                            label="New Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}} >
                            <Button type="primary" htmlType="submit">
                                Zresetuj hasło
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default ResetPassword;