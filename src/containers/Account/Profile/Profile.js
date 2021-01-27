import React, { Component } from 'react';
import * as actions from "../../../store/actions";
import {connect} from "react-redux";
import {Button, Card, Input, Menu} from "antd";
import Meta from "antd/es/card/Meta";
import Avatar from "antd/es/avatar/avatar";
import {CheckCircleTwoTone, CloseCircleOutlined, UserOutlined} from "@ant-design/icons";
import {supportedAccessLevels} from "../../../config/accessLevels";
import Item from "antd/es/list/Item";
import UserDataService from "../../../service/UserDataService";
import axios from "axios";
import Card2 from "@material-ui/core/Card/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button2 from "@material-ui/core/Button";
import {toast} from "react-toastify";


class Profile extends Component {
    state = {
        login: '',
        email: '',
        activated: null,
        locked: null,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        image: null,
        imageURL:'',
        roles: [],

        isClicked: false

    }


    componentDidMount() {

        console.log(this.props.user.id)

        UserDataService.getUser(this.props.user.id)
            .then(response => {
                console.log('Response profile ' + JSON.stringify(response));
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
        // let data = this.state.image
        // this.onSetBlob(data)
    }


    cancel = () => {
        this.props.history.goBack()
    }

    onSetBlob = (data) => {
        let binaryData = [];
        binaryData.push(data);
        this.setState({imageURL: URL.createObjectURL(new Blob(binaryData)) })

    }

    onUpdateHandler = () => {
        console.log('update ')
        this.props.history.push(`/editProfile`)
    }

    fileSelectedHandler = event => {
        let file = event.target.files[0]
        this.setState({
            image: file,
            isClicked: true
        })
        console.log(event.target.files[0])
        // this.setState({imageURL: URL.createObjectURL(file)})
        // console.log("IMAGEURL: "+ URL.createObjectURL(file))

        toast.success('Wybór nowego zdjęcia zakończony sukcesem', {position: toast.POSITION.BOTTOM_RIGHT})
    }

    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append("imageFile", this.state.image)
        fd.append("login", this.state.login)

        for (let value of fd.values()) {
            console.log(value)
        }
        this.setState({
            isClicked: false
        })
        axios.post("/api/users/addImage", fd)
            .then(res=>{
                console.log(res)
                toast.success('Zmiana zdjęcia zakończona sukcesem', {position: toast.POSITION.BOTTOM_RIGHT})

            })
        this.props.history.push(`/`)
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
            margin: '10px',
            color: 'black'
        }

        const input = {
            display: 'none',
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

                        <p style={{padding: '10px'}}>
                            {this.state.isClicked === false ? <label htmlFor="upload" style={{
                                backgroundColor: '#ffe0b3',
                                borderRadius: '15px',
                                borderColor: 'black',
                                margin: '5px',
                                padding: '5px',
                                color: 'black'}}>
                                Zmień zdjęcie
                                <Input
                                accept="image/*"
                                type="file"
                                id="upload"
                                style={{display:'none'}}
                                onChange={this.fileSelectedHandler}
                                />
                                </label> :  <button style={buttonStyle} onClick={this.fileUploadHandler}>Upload</button>}



                        </p>
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
                    <Button style={buttonStyle} onClick={this.onUpdateHandler}>Edit</Button>

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

export default connect( mapStateToProps, mapDispatchToProps )( Profile );