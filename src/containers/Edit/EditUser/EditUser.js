import React, {Component} from "react";
import {Form, Input, InputNumber, Button, Card, Switch, Popconfirm} from 'antd'
import {connect} from "react-redux";
import UserDataService from "../../../service/UserDataService";
import axios from "axios";
import {toast} from "react-toastify";
import {authFail} from "../../../store/actions/auth";
import {EditOutlined, UserOutlined} from "@ant-design/icons";
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

class EditUser extends Component {

    state = {
        id: this.props.match.params.id,
        login: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        version: null,
    }
    componentDidMount() {

        console.log(this.state.id)

        UserDataService.getUserDetailsData(this.state.id)
            .then(response => {
                console.log('Response editPage ' + JSON.stringify(response));
                this.setState({
                    login: response.data.login,
                    firstName: response.data.accountDetails.firstName,
                    lastName: response.data.accountDetails.lastName,
                    phoneNumber: response.data.accountDetails.phoneNumber,
                    version: response.headers.etag

                })})
            .catch(err => {
                console.log('Error edituser ' + JSON.stringify(err.response.data))
            });
    }

    onFinish = (values) => {
        console.log(values.user);

        const data = {...values.user, login: this.state.login}
        console.log("Data: "+ JSON.stringify(data))

        axios.put("/api/users/editAccountDetails", data, {headers: {
                'If-Match': this.state.version
            }})
            .then(response => {
                console.log('Response ' + JSON.stringify(response));
                toast.success('Successful edit data', {position: toast.POSITION.BOTTOM_RIGHT})
            })
            .catch(err => {
                console.log('Error ' + JSON.stringify(err.response))
                toast.error('Error edit data', {position: toast.POSITION.BOTTOM_RIGHT})
            });
    };

    onUpdateHandler = (id) => {
        console.log('editUserSettings ' + id)
        this.props.history.push(`/editUserSettings/${id}`)
    }

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
            marginTop: '30px',
            color: 'black'
        }

        return(

            <Card style={cardStyle} headStyle={{backgroundColor:'#ff8080', borderRadius:'15px', color:'white', fontSize:'20px', textAlign:'center'}}
                  title={<div style={{color:'white'}} ><UserOutlined /> Edit user</div>}>

                <Form {...layout}
                      name="nest-messages" onFinish={this.onFinish}
                      validateMessages={validateMessages}
                      style={formStyle}
                >
                    <p></p>
                    <Form.Item
                        name={['user', 'firstName']}
                        label="First Name"
                        rules={[
                            {
                                required: true,
                            },
                            {
                                pattern: /[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźŹżŻ.-]{2,31}/ ,
                                message:'Imie musi posiadac conajmniej 2 znaki'
                            }
                        ]}

                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name={['user', 'lastName']}
                        label="Last Name"
                        rules={[
                            {
                                required: true,
                            },
                            {
                                pattern: /[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźŹżŻ.-]{2,31}/ ,
                                message:'Nazwisko musi posiadac conajmniej 2 znaki'
                            }

                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name={['user', 'phoneNumber']}
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                type: 'number',
                                min: 100000000,
                                max: 999999999,
                            },
                        ]}
                    >
                        <InputNumber style={{width:'100%'}}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}} >
                        <Button type="primary" htmlType="submit">
                            Edit
                        </Button>
                    </Form.Item>
                    <p><strong>Lub kliknij poniższy przycisk by edytować poziomy dostępu lub zablokować/odblokować konto:</strong></p>
                    <Popconfirm title="Sure to
            ?" onConfirm={() => this.onUpdateHandler(this.state.id)}>
                        <Button style={buttonStyle} >Edytuj ustawienia konta</Button>
                    </Popconfirm>
                    <p> <Button style={buttonStyle} onClick={this.cancel}>Go Back</Button></p>
                </Form>
            </Card>

        );
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

export default connect( mapStateToProps, mapDispatchToProps )( EditUser );
