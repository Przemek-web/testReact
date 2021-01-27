import React, { Component } from 'react';
import {Button, Card, Form, Input} from "antd";
import {UserOutlined} from "@ant-design/icons";
import axios from "axios";
import {toast} from "react-toastify";
import {connect} from "react-redux";


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



class ChangePassword extends Component {




    onFinish = (values) => {


        const data = {...values, id: this.props.user.id}
        console.log(data)

        axios.post("/api/users/changePassword", data, {headers: {
                'Accept-Language': this.props.locale
            }})
            .then(response => {
                console.log('Response ' + JSON.stringify(response));
                toast.success('Successful change password', {position: toast.POSITION.BOTTOM_RIGHT})
            })
            .catch(err => {
                console.log('Error ' + JSON.stringify(err.response))
                toast.error(err.response.data.message, {position: toast.POSITION.BOTTOM_RIGHT})
            });
    };

    cancel = () => {
        this.props.history.goBack()
    }

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

        return(
            <div>

                <Card style={cardStyle} headStyle={{backgroundColor:'#ff8080', borderRadius:'15px', color:'white', fontSize:'20px', textAlign:'center'}}
                      title={<div style={{color:'white'}} ><UserOutlined /> Change password</div>}>

                    <Form {...layout}
                          name="nest-messages" onFinish={this.onFinish}
                          validateMessages={validateMessages}
                          style={formStyle}
                    >

                        <Form.Item
                            name="newPassword"
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

                            name="confirmNewPassword"
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
                                        if (!value || getFieldValue('newPassword') === value) {
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
                            <Button style={buttonStyle} onClick={this.cancel}>Go Back</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};


export default connect( mapStateToProps, mapDispatchToProps )( ChangePassword );