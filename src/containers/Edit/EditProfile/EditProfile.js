import React, {Component} from "react";
import {Form, Input, InputNumber, Button, Card, Popconfirm} from 'antd'
import {connect} from "react-redux";
import UserDataService from "../../../service/UserDataService";
import axios from "axios";
import {toast} from "react-toastify";
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

class EditProfile extends Component {

    state = {
        login: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        message: '',
        version: null

    }
    componentDidMount() {

        console.log(this.props.user.id)

        UserDataService.getUserDetailsData(this.props.user.id)
            .then(response => {
                console.log('Response editProfiles ' + JSON.stringify(response));
                this.setState({
                    login: response.data.login,
                    firstName: response.data.accountDetails.firstName,
                    lastName: response.data.accountDetails.lastName,
                    phoneNumber: response.data.accountDetails.phoneNumber,
                    version: response.headers.etag
                })})

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
                this.setState({message: err.response.data.message})
                console.log('Error editProfile ' + JSON.stringify(err.response.data))
                toast.error(this.state.message, {position: toast.POSITION.BOTTOM_RIGHT})
            });
    };


    cancel = () => {
        this.props.history.goBack()
    }


    onUpdateHandler = () => {
        console.log('changePassword ')
        this.props.history.push(`/changePassword`)
    }

render() {
    const cardStyle = {
        width: '70%',

        display: 'block',
        margin: 'auto',
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

    const buttonStyle = {
        backgroundColor: '#ffe0b3',
        borderRadius: '15px',
        marginTop: '30px',
        color: 'black',

    }

    return(

<Card style={cardStyle} headStyle={{backgroundColor:'#ff8080', borderRadius:'15px', color:'white', fontSize:'20px', textAlign:'center'}}
      title={<div style={{color:'white'}} ><UserOutlined /> Edit profile settings</div>}>

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
        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>

            <Button style={buttonStyle} onClick={this.onUpdateHandler} >Zmien haslo</Button>
            <p> <Button style={buttonStyle} onClick={this.cancel}>Go Back</Button></p>
        </Form.Item>

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

export default connect( mapStateToProps, mapDispatchToProps )( EditProfile );
