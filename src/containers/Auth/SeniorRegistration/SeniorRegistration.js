import React, {Component} from "react";
import {Button, Card, Form, Input, InputNumber, Popconfirm, Tooltip, Select} from "antd";
import {QuestionCircleOutlined, UserOutlined} from "@ant-design/icons";
import axios from "axios";
import {toast} from "react-toastify";

import {Option} from "antd/es/mentions";
import {Translate} from "react-redux-i18n";
import * as actions from "../../../store/actions";
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
    // required: '${label} is required!',
    // types: {
    //     email: '${label} is not a valid email!',
    //     number: '${label} is not a valid number!',
    // },
    // number: {
    //     range: 'Phone number must contains 9 digits'
    // },
};

class SeniorRegistration extends Component {

    state = {
        levelName: 'NONE',
        textFile: -1,
        isClicked: false,
        I18n : require('react-redux-i18n').I18n
    }

    onFinish = (values) => {

        const data = new FormData();
        data.append("textFile", this.state.textFile)
        for (let key in values) {
            data.append(key, values[key])
        }
        console.log('Fd' + data)


        axios.post("/api/users/registerSenior", data)
            .then(response => {
                console.log('Response ' + JSON.stringify(response));

                toast.success(this.state.I18n.t('concerts.successRegisterSeniorInfo'), {position: toast.POSITION.BOTTOM_RIGHT})
                this.props.history.push(`/login`)
            })
            .catch(err => {
                console.log('Error ' + JSON.stringify(err.response))
                toast.error('Error senior registration', {position: toast.POSITION.BOTTOM_RIGHT})

            });
    };

    cancel = () => {
        this.props.history.goBack()
    }


    fileSelectedHandler = event => {
        let file = event.target.files[0]
        this.setState({
            textFile: file,
            isClicked: true
        })
        console.log(event.target.files[0])


        toast.success(this.state.I18n.t('concerts.chooseCertificateSuccessful'), {position: toast.POSITION.BOTTOM_RIGHT})
    }

    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append("textFile", this.state.textFile)
        // fd.append("login", this.state.login)

        for (let value of fd.values()) {
            console.log(value)
        }
        this.setState({
            isClicked: false
        })

        console.log('Text file: ' + this.state.textFile)
        toast.success(this.state.I18n.t('concerts.addCertificateSuccessful'), {position: toast.POSITION.BOTTOM_RIGHT})
    }

    render() {
        const cardStyle = {
            width: '70%',

            display: 'block',
            backgroundColor: '#fff5e6',
            margin: 'auto',
            marginTop:'100px',
            borderWidth: '3px',
            borderRadius: '15px',

        };
        const formStyle = {
            width: '55%',

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
            color: 'black',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
        }


        return(

            <Card style={cardStyle} headStyle={{backgroundColor:'#8F5C2C', borderRadius:'15px', color:'white', fontSize:'20px', textAlign:'center'}}
                  title={<div style={{color:'white'}} ><UserOutlined /> <Translate value="concerts.seniorRegistration" /></div>}>
                <div style={{display:'none'}}>{this.props.locale}</div>
                <Form {...layout}
                      name="nest-messages" onFinish={this.onFinish}
                      validateMessages={validateMessages}
                      style={formStyle}
                >
                    <p></p>
                    <Form.Item

                        name="login"
                        label={
                            <span>
           <Translate value="concerts.username" />&nbsp;
                                <Tooltip title={this.state.I18n.t('concerts.usernameTip')}>
                    <QuestionCircleOutlined />
                    </Tooltip>
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                message: this.state.I18n.t('concerts.requireUsername'),

                            },
                            {
                                pattern: /[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźŹżŻ.-]{4,31}/ ,
                                message: this.state.I18n.t('concerts.usernameMessage'),

                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={
                            <span>
           <Translate value="concerts.password" />&nbsp;
                                <Tooltip title={this.state.I18n.t('concerts.passwordTip')}>
                    <QuestionCircleOutlined />
                    </Tooltip>
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                message: this.state.I18n.t('concerts.requirePassword'),
                            },
                            {
                                pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(){}:";'<>?,./+=])(?=\S+$).{8,}$/ ,
                                message: this.state.I18n.t('concerts.passwordMessage'),

                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label={
                            <span>
           <Translate value="concerts.confirmPassword" />&nbsp;
                                <Tooltip title={this.state.I18n.t('concerts.confirmPasswordTip')}>
                    <QuestionCircleOutlined />
                    </Tooltip>
                            </span>
                        }
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: this.state.I18n.t('concerts.requireConfirmPassword'),
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(<Translate value="concerts.requireConfirmPasswordDoesNotMatch" />)
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label={
                            <span>
           <Translate value="concerts.email" />&nbsp;
                                <Tooltip title={this.state.I18n.t('concerts.emailTip')}>
                    <QuestionCircleOutlined />
                    </Tooltip>
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: this.state.I18n.t('concerts.requireEmail'),
                            },
                            {
                                pattern: /^[^\s\\@]+@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.){1,11}[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/ ,
                                message: this.state.I18n.t('concerts.emailMessage'),

                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="firstName"
                        label={
                            <span>
           <Translate value="concerts.firstName" />&nbsp;
                                <Tooltip title={this.state.I18n.t('concerts.firstNameTip')}>
                    <QuestionCircleOutlined />
                    </Tooltip>
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                message: this.state.I18n.t('concerts.requireFirstName'),
                            },
                            {
                                pattern: /[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźŹżŻ.-]{2,31}/ ,
                                message:  this.state.I18n.t('concerts.firstNameMessage'),
                            }
                        ]}

                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        label={
                            <span>
           <Translate value="concerts.lastName" />&nbsp;
                                <Tooltip title={this.state.I18n.t('concerts.lastNameTip')}>
                    <QuestionCircleOutlined />
                    </Tooltip>
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                message: this.state.I18n.t('concerts.requireLastName'),
                            },
                            {
                                pattern: /[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźŹżŻ.-]{2,31}/ ,
                                message:  this.state.I18n.t('concerts.lastNameMessage'),
                            }

                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="phoneNumber"
                        label={
                            <span>
           <Translate value="concerts.phoneNumber" />&nbsp;
                                <Tooltip title={this.state.I18n.t('concerts.phoneNumberTip')}>
                    <QuestionCircleOutlined />
                    </Tooltip>
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                type: 'number',
                                message: this.state.I18n.t('concerts.requirePhoneNumber'),

                            },
                            {
                                pattern: /\d{9}/ ,
                                message: this.state.I18n.t('concerts.phoneNumberMessage'),
                            }
                        ]}
                    >
                        <InputNumber style={{width:'100%'}}/>
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
           <Translate value="concerts.disabilityLevel" />&nbsp;
                                <Tooltip title={this.state.I18n.t('concerts.disabilityLevelTip')} >
                    <QuestionCircleOutlined />
                    </Tooltip>
                            </span>
                        }

                    >
                        {/*<Select*/}
                        {/*    onChange={(value) => {*/}
                        {/*        this.setState({levelName: value})*/}
                        {/*    }}*/}
                        {/*    name="disabilityLevel"*/}
                        {/*    placeholder="select a disability level">*/}
                        {/*    <Option value="LIGHT">Light</Option>*/}
                        {/*    <Option value="MODERATE">Moderate</Option>*/}
                        {/*    <Option value="SIGNIFICANT">Significant</Option>*/}
                        {/*</Select>*/}
                        <p style={{padding: '10px'}}>
                            {this.state.isClicked === false ? <label htmlFor="upload" style={{
                                backgroundColor: '#ffe0b3',
                                borderRadius: '15px',
                                borderColor: 'black',
                                margin: '5px',
                                padding: '5px',
                                color: 'black'}}>
                                <Translate value="concerts.addCertificate" />
                                <Input
                                    accept=".txt, .pdf, .doc, .docx"
                                    type="file"
                                    id="upload"
                                    style={{display:'none'}}
                                    onChange={this.fileSelectedHandler}
                                />
                            </label> :  <button style={buttonStyle} onClick={this.fileUploadHandler}><Translate value="concerts.addCertificate2" /></button>}
                        </p>
                    </Form.Item>

                    <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}} >
                        <Button type="primary" htmlType="submit">
                            <Translate value="concerts.register" />
                        </Button>
                    </Form.Item>
                    <Button style={buttonStyle} onClick={this.cancel}><Translate value="concerts.cancel" /></Button>
                </Form>
            </Card>

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

export default connect( mapStateToProps, mapDispatchToProps )( SeniorRegistration);


