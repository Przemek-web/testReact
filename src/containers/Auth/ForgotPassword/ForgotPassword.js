import React, { Component } from 'react';
import {Button, Card, Form, Input, InputNumber, Select, Tooltip} from "antd";
import {QuestionCircleOutlined, UserOutlined} from "@ant-design/icons";
import {Option} from "antd/es/mentions";
import axios from "axios";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import * as actions from "../../../store/actions";


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

class  ForgotPassword extends  Component {





    onFinish = (values) => {


        const data = {...values}
        console.log(data)

        axios.post("/api/users/forgotPassword", data, {headers: {
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
            backgroundColor: '#fff5e6',
            marginTop:'200px',
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
                <Card style={cardStyle} headStyle={{backgroundColor:'#8F5C2C', borderRadius:'15px', color:'white', fontSize:'20px', textAlign:'center'}}
                      title={<div style={{color:'white'}} ><UserOutlined /> Odzyskaj hasło</div>}>

                    <Form {...layout}
                          name="nest-messages" onFinish={this.onFinish}
                          validateMessages={validateMessages}
                          style={formStyle}
                    >
                        <p/>
                        <Form.Item
                            name="forgotPassword"
                            label={
                                <span>
            Email&nbsp;
                                    <Tooltip title="W przypadku gdy zapomniałeś swojego hasła napisz je tutaj a my wyslemy link który je zresetuje">
                    <QuestionCircleOutlined />
                    </Tooltip>
                            </span>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your nickname!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}} >
                            <Button type="primary" htmlType="submit">
                                Wyslij email resetujący hasło
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>

            </div>
        );
    }
}


const mapStateToProps = state => {
    return {

        locale: state.i18n.locale
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect( mapStateToProps, mapDispatchToProps )( ForgotPassword );