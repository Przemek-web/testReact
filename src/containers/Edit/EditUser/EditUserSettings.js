import React, {Component} from "react";
import UserDataService from "../../../service/UserDataService";
import {Button, Card, Form, Input, InputNumber, Popconfirm, Switch} from "antd";
import axios from "axios";
import {toast} from "react-toastify";
import * as roleType from './../../../constants/constants'
import {UserOutlined} from "@ant-design/icons";


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

class EditUserSettings extends Component {


    state = {
        id: this.props.match.params.id,
        login: '',
        checkedAdmin: false,
        checkedManager: false,
        checkedUser: false,
        locked: null,
        version: null,
        roles: []

    }

    componentDidMount() {

        console.log(this.state.id)

        UserDataService.getUserSettingsData(this.state.id)
            .then(response => {
                console.log('Response editUserSettings ' + JSON.stringify(response));
                this.setState({
                    login: response.data.login,
                    locked: response.data.locked,
                    version: response.headers.etag,
                    roles: response.data.roles

                })

                this.initAccessLevelsSetup()
            })
            .catch(err => {
                console.log('Error EditUserSettings ' + JSON.stringify(err.response.data))
            });
        this.initAccessLevelsSetup()
    }

    onFinish = (values) => {
        console.log(values.user);

        const data = {admin: this.state.checkedAdmin, manager: this.state.checkedManager, user: this.state.checkedUser,
            login: this.state.login, locked: this.state.locked}
        console.log("Data: "+ JSON.stringify(data))

        axios.put("/api/users/editUserSettings", data, {headers: {
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


    handleClickAdmin = () => {
        if (this.state.checkedAdmin === false) {
            this.setState({checkedAdmin:true})
        } else {
            this.setState({checkedAdmin: false})
        }
    }

    handleClickManager = () => {
        if (this.state.checkedManager === false) {
            this.setState({checkedManager:true})
        } else {
            this.setState({checkedManager: false})
        }
    }

    handleClickUser = () => {
        if (this.state.checkedUser === false) {
            this.setState({checkedUser:true})
        } else {
            this.setState({checkedUser: false})
        }
    }

    initAccessLevelsSetup = () => {


      this.state.roles.filter(e => {
            console.log('Name' + e.accessLevel.name)
            if(e.accessLevel.name === roleType.ADMIN) {
                this.setState({checkedAdmin: true})
            }

            if(e.accessLevel.name === roleType.VOLUNTEER) {
                this.setState({checkedManager: true})
            }

            if(e.accessLevel.name === roleType.SENIOR) {
                this.setState({checkedUser: true})
            }
        })



    }

    setLockedHandler = () => {
        if (this.state.locked === false) {
            this.setState({locked: true})
            toast.success('Ustawiłeś konto na zablokowane', {position: toast.POSITION.BOTTOM_RIGHT})

        } else if (this.state.locked === true) {
            this.setState({locked: false})
            toast.success('Ustawiłeś konto na odblokowane', {position: toast.POSITION.BOTTOM_RIGHT})
        }
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
            <div>
                <Card style={cardStyle} headStyle={{backgroundColor:'#ff8080', borderRadius:'15px', color:'white', fontSize:'20px', textAlign:'center'}}
                      title={<div style={{color:'white'}} ><UserOutlined /> Edit User Settings</div>}>

                    <Form {...layout}
                          name="nest-messages" onFinish={this.onFinish}
                          validateMessages={validateMessages}
                          style={formStyle}
                    >
                       <p></p>

                        <p><strong>Edytuj poziomy dostepu:</strong></p>
                        <Form.Item label="Poziom Admin" name={['user', 'admin']}>
                            <Switch onClick={this.handleClickAdmin} checked={this.state.checkedAdmin} />
                        </Form.Item>
                        <Form.Item label="Poziom Volunteer" name={['user', 'manager']}>
                            <Switch onClick={this.handleClickManager} checked={this.state.checkedManager} />
                        </Form.Item>
                        <Form.Item label="Poziom Senior" name={['user', 'user']}>
                            <Switch onClick={this.handleClickUser} checked={this.state.checkedUser} />
                        </Form.Item>
                        <p><strong>Edytuj ustawienia konta:</strong></p>


                        <Popconfirm title="Jesteś pewien blablabla?" onConfirm={this.setLockedHandler}>
                            {this.state.locked ===true ? <Button  style={buttonGreenStyle}>Odblokuj konto</Button> :
                                <Button  style={buttonRedStyle}>Zablokuj konto</Button>}
                        </Popconfirm>
                        <p></p>
                        <p></p>
                        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}} >
                            <Button type="primary" htmlType="submit">
                                Edytuj ustawienia użytkownika
                            </Button>

                            <p> <Button style={buttonStyle} onClick={this.cancel}>Go Back</Button></p>
                        </Form.Item>

                    </Form>
                </Card>
            </div>
        )
    }
}

export default EditUserSettings;