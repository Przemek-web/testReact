import React, {Component} from "react";
import {Button, Card, Form, Input, InputNumber, Popconfirm, Tooltip, Select, Col, Row, Checkbox, Radio} from "antd";
import {QuestionCircleOutlined, UserOutlined} from "@ant-design/icons";
import axios from "axios";
import {toast} from "react-toastify";
import {Translate} from "react-redux-i18n";
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

class VolunteerRegistration extends Component {

    state = {
        cooking: false,
        cleanup: false,
        transport: false,
        shopping: false,
        rehabilitation: false,
        nursing: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        I18n : require('react-redux-i18n').I18n
    }

    onFinish = (values) => {


        const data = {...values, cooking: this.state.cooking, cleanup: this.state.cleanup, transport: this.state.transport,
        shopping: this.state.shopping, rehabilitation: this.state.rehabilitation, nursing: this.state.nursing,
        monday: this.state.monday, tuesday: this.state.tuesday, wednesday: this.state.wednesday, thursday: this.state.thursday,
        friday: this.state.friday, saturday: this.state.saturday}
        console.log(data)

        axios.post("/api/users/registerVolunteer", data)
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

    setCookingHandler = () => {
        let cooking = this.state.cooking
        this.setState({cooking: !cooking})
    }

    setCleanupHandler = () => {
        let cleanup = this.state.cleanup
        this.setState({cleanup: !cleanup})
    }

    setTransportHandler = () => {
        let transport = this.state.transport
        this.setState({transport: !transport})
    }

    setShoppingHandler = () => {
        let shopping = this.state.shopping
        this.setState({shopping: !shopping})
    }

    setRehabilitationHandler = () => {
        let rehabilitation = this.state.rehabilitation
        this.setState({rehabilitation: !rehabilitation})
    }

    setNursingHandler = () => {
        let nursing = this.state.nursing
        this.setState({nursing: !nursing})
    }

    setMondayHandler = () => {
        let monday = this.state.monday
        this.setState({monday: !monday})
    }

    setTuesdayHandler = () => {
        let tuesday = this.state.tuesday
        this.setState({tuesday: !tuesday})
    }

    setWednesdayHandler = () => {
        let wednesday = this.state.wednesday
        this.setState({wednesday: !wednesday})
    }

    setThursdayHandler = () => {
        let thursday = this.state.thursday
        this.setState({ thursday: !thursday})
    }

    setFridayHandler = () => {
        let friday = this.state.friday
        this.setState({friday: !friday})
    }

    setSaturdayHandler = () => {
        let saturday = this.state.saturday
        this.setState({saturday: !saturday})
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
                  title={<div style={{color:'white'}} ><UserOutlined /> <Translate value="concerts.volunteerRegistration" /></div>}>
                <div style={{display:'none'}}>{this.props.locale}</div>
                <Form {...layout}
                      name="nest-messages" onFinish={this.onFinish}
                      validateMessages={validateMessages}
                      style={formStyle}
                >

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
                    <Form.Item name="checkbox-group"
                               label={
                                   <span>
            <Translate value="concerts.chooseServices" />&nbsp;
                                       <Tooltip title={this.state.I18n.t('concerts.chooseServicesTip')}>
                    <QuestionCircleOutlined />
                    </Tooltip>
                            </span>
                               }>
                        <Checkbox.Group
                       >
                            <Row style={{marginLeft:'15px'}}>
                                <Col span={12}>
                                    <Checkbox
                                        value="Cooking"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setCookingHandler}
                                    >
                                        <Translate value="concerts.cooking" />
                                    </Checkbox>
                                </Col>
                                <Col span={12}>
                                    <Checkbox
                                        value="Cleanup"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setCleanupHandler}
                                    >
                                        <Translate value="concerts.cleanup" />
                                    </Checkbox>
                                </Col>
                                <Col span={12}>
                                    <Checkbox
                                        value="Transport"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setTransportHandler}
                                    >
                                        <Translate value="concerts.transport" />
                                    </Checkbox>
                                </Col>
                                <Col span={12}>
                                    <Checkbox
                                        value="Shopping"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                       onChange={this.setShoppingHandler}
                                    >
                                        <Translate value="concerts.shopping" />
                                    </Checkbox>
                                </Col>
                                <Col span={12}>
                                    <Checkbox
                                        value="Rehabilitation"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setRehabilitationHandler}
                                    >
                                        <Translate value="concerts.rehabilitation" />
                                    </Checkbox>
                                </Col>
                                <Col span={12}>
                                    <Checkbox
                                        value="Nursing"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setNursingHandler}
                                    >
                                        <Translate value="concerts.nursing" />
                                    </Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>


                    <Form.Item name="checkbox-group2"
                               label={
                                   <span>
            <Translate value="concerts.chooseWorkdays" />&nbsp;
                                       <Tooltip title={this.state.I18n.t('concerts.chooseWorkdaysTip')}>
                    <QuestionCircleOutlined />
                    </Tooltip>
                            </span>
                               }>
                        <Checkbox.Group
                        >
                            <Row style={{marginLeft:'15px'}}>
                                <Col span={12}>
                                    <Checkbox
                                        value="Monday"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setMondayHandler}
                                    >
                                        <Translate value="concerts.monday" />
                                    </Checkbox>
                                </Col>
                                <Col span={12}>
                                    <Checkbox
                                        value="Tuesday"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setTuesdayHandler}
                                    >
                                        <Translate value="concerts.tuesday" />
                                    </Checkbox>
                                </Col>
                                <Col span={12}>
                                    <Checkbox
                                        value="Wednesday"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setWednesdayHandler}
                                    >
                                        <Translate value="concerts.wednesday" />
                                    </Checkbox>
                                </Col>
                                <Col span={12}>
                                    <Checkbox
                                        value="Thursday"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setThursdayHandler}
                                    >
                                        <Translate value="concerts.thursday" />
                                    </Checkbox>
                                </Col>
                                <Col span={12}>
                                    <Checkbox
                                        value="Friday"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setFridayHandler}
                                    >
                                        <Translate value="concerts.friday" />
                                    </Checkbox>
                                </Col>
                                <Col span={12}>
                                    <Checkbox
                                        value="Saturday"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setSaturdayHandler}
                                    >
                                        <Translate value="concerts.saturday" />
                                    </Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
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

export default connect( mapStateToProps, mapDispatchToProps )( VolunteerRegistration);


