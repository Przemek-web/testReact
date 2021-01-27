import React, {Component} from "react";
import axios from "axios";
import {fetchUsersFailed, storeUsers} from "../../../store/actions";
import UserDataService from "../../../service/UserDataService";
import {CheckCircleTwoTone, CloseCircleOutlined, EditOutlined, UserOutlined} from "@ant-design/icons";
import {Button, Card, Input, Popconfirm} from "antd";
import Avatar from "antd/es/avatar/avatar";
import Item from "antd/es/list/Item";
import {supportedAccessLevels} from "../../../config/accessLevels";

class User extends Component {
    state = {
        id: this.props.match.params.id,
        login: '',
        email: '',
        activated: null,
        locked: null,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        roles: []

    }

    cancel = () => {
this.props.history.goBack()
    }

    onUpdateHandler = (id) => {
        console.log('editUser ' + id)
        this.props.history.push(`/editUser/${id}`)
    }

    fileSelectedHandler = event => {
        let file = event.target.files[0]
        this.setState({
            image: file
        })
        console.log(event.target.files[0])
        // this.setState({imageURL: URL.createObjectURL(file)})
        // console.log("IMAGEURL: "+ URL.createObjectURL(file))

    }

    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append("imageFile", this.state.image)
        fd.append("login", this.state.login)

        for (let value of fd.values()) {
            console.log(value)
        }
        axios.post("/api/users/addImage", fd)
            .then(res=>{
                console.log(res)
            })
    }

    componentDidMount() {

        console.log(this.state.id)

        UserDataService.getUser(this.state.id)
            .then(response => {
                console.log('Response aa ' + JSON.stringify(response));
                this.setState({
                login: response.data.login,
                email: response.data.email,
                activated: response.data.activated,
                locked: response.data.locked,
                firstName: response.data.accountDetails.firstName,
                lastName: response.data.accountDetails.lastName,
                phoneNumber: response.data.accountDetails.phoneNumber,
                roles: response.data.roles


             })
                if (response.data.image !== null) {
                    this.setState({
                        image: response.data.image.lob
                    })
                }


            })
    }
    render() {
        const cardStyle = {
            width: '80%',
            height: '750px',
            textAlign: 'center',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderWidth: '3px',
            borderRadius: '15px',


        };
        const gridStyle = {
            width: '22%',
            textAlign: 'center',
            borderWidth: '3px',
            borderRadius: '20px',
            marginTop: '20px',
            marginLeft: '10px',
            marginRight: '10px'

        };
        const grid1Style = {
            width: '75%',
            textAlign: 'left',
            fontSize: '15px',
            borderWidth: '3px',
            borderRadius: '20px',
            marginTop: '20px',
            marginLeft: '10px',
            marginRight: '10px'

        };
        const grid2Style = {
            width: '98%',
            textAlign: 'center',
            borderWidth: '3px',
            borderRadius: '20px',
            marginTop: '20px',
            marginLeft: '14px',
            marginRight: '10px',

        };
        const buttonStyle = {
            backgroundColor: '#ffe0b3',
            borderRadius: '15px',
            margin: '10px'
        }
        return(
            <div>

                <Card style={cardStyle} headStyle={{backgroundColor:'#ff8080', borderRadius:'15px', color:'white', fontSize:'20px'}}
                      title={<div style={{color:'white'}} ><UserOutlined /> User Profile</div>}>
                    <Card.Grid hoverable={false} style={grid2Style}>
                        {this.state.image!==null?
                            <Avatar src={`data:image/jpeg;base64, ${this.state.image}`} size={150}
                                    style={{
                                        backgroundColor: '#ff8080'

                                    }}/>
                            :<Avatar
                                size={150}
                                style={{
                                    backgroundColor: '#ff8080'

                                }}
                                icon={<UserOutlined />}/>}

                    </Card.Grid>
                    <Card.Grid hoverable={false} style={grid1Style}>
                        <p><strong>Login:</strong>  {this.state.login}</p>
                        <p><strong>Email:</strong>  {this.state.email} </p>
                        <p><strong>First Name:</strong> {this.state.firstName}</p>
                        <p><strong>Last Name:</strong> {this.state.lastName}</p>
                        <p><strong>Phone Number:</strong> {this.state.phoneNumber}</p>
                    </Card.Grid>
                    <Card.Grid hoverable={false} style={gridStyle}>
                        <p><strong>Poziomy dostępu:</strong></p>
                        {this.state.roles.map(role => (


                            <Item
                                href="#"
                                key={role.accessLevel.name}
                                // active={role === this.props.currentRole}
                                onClick={e => this.handleAccessLevelClick(e,role)}
                                style={{textAlign:'left'}}
                            >
                                <CheckCircleTwoTone style={{marginRight:'5px', textAlign: 'left'}} twoToneColor="#52c41a" />
                                {supportedAccessLevels[role.accessLevel.name]}
                            </Item>

                        ))}
                        <p><strong>Ustawienia konta:</strong></p>
                        <p style={{textAlign:'left'}}><strong>Activated:</strong> {this.state.activated ?
                            <CheckCircleTwoTone style={{marginRight:'5px', textAlign: 'left'}} twoToneColor="#52c41a" /> :
                            <CloseCircleOutlined style={{color:'red', marginLeft:'3px'}} /> }</p>
                        <p style={{textAlign:'left'}}><strong>Locked:</strong> {this.state.locked ?
                            <CheckCircleTwoTone style={{marginRight:'5px', marginLeft:'5px'}} twoToneColor="#52c41a" /> :
                            <CloseCircleOutlined style={{color:'red', marginLeft:'3px'}} /> }</p>
                    </Card.Grid>
                    <Button style={buttonStyle} onClick={this.cancel}>Go Back</Button>
                    {/*<Button style={buttonStyle} onClick={this.onUpdateHandler(this.state.id)}>Edit</Button>*/}
                    <Popconfirm title="Sure to
            ?" onConfirm={() => this.onUpdateHandler(this.state.id)}>
                        <Button style={buttonStyle}>
                            <EditOutlined />
                            Edit</Button>
                    </Popconfirm>

                </Card>
            </div>
        )
    }
}

export default User;