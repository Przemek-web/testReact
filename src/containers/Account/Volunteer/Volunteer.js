import React, {Component} from "react";
import UserDataService from "../../../service/UserDataService";
import {Button, Card, Popconfirm} from "antd";
import {CheckCircleTwoTone, CloseCircleOutlined, EditOutlined, UserOutlined} from "@ant-design/icons";
import Avatar from "antd/es/avatar/avatar";
import Item from "antd/es/list/Item";
import {supportedAccessLevels} from "../../../config/accessLevels";

class Volunteer extends Component {
    state = {
        id: this.props.match.params.id,
        email: '',
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

        image: null


    }

    cancel = () => {
        this.props.history.goBack()
    }

    onUpdateHandler = (id) => {
        console.log('reservation ' + id)
        this.props.history.push(`/volunteerReservation/${id}`)
    }

    componentDidMount() {

        console.log(this.state.id)

        UserDataService.getVolunteer(this.state.id)
            .then(response => {
                console.log('Response aa ' + JSON.stringify(response));
                this.setState({

                    email: response.data.email,
                    firstName: response.data.accountDetails.firstName,
                    lastName: response.data.accountDetails.lastName,
                    phoneNumber: response.data.accountDetails.phoneNumber,
                    cooking: response.data.volunteerDetails.cooking,
                    cleanup: response.data.volunteerDetails.cleanup,
                    transport: response.data.volunteerDetails.transport,
                    shopping: response.data.volunteerDetails.shopping,
                    rehabilitation: response.data.volunteerDetails.rehabilitation,
                    nursing: response.data.volunteerDetails.nursing,
                    monday: response.data.volunteerDetails.monday,
                    tuesday: response.data.volunteerDetails.tuesday,
                    wednesday: response.data.volunteerDetails.wednesday,
                    thursday: response.data.volunteerDetails.thursday,
                    friday: response.data.volunteerDetails.friday,
                    saturday: response.data.volunteerDetails.saturday,
                    roles: response.data.roles

                })
                if (response.data.image !== null) {
                    this.setState({
                        image: response.data.image.lob
                    })
                }
            })
    }

    checkServices = (cooking, cleanup, transport, shopping, rehabilitation, nursing) => {
        let services = ["Zakres dzialanlosci: "]
        if (cooking) {
            services.push("Cooking")
            services.push("  ")
        }
        if (cleanup) {
            services.push("Cleanup")
            services.push("  ")
        }
        if (transport) {
            services.push("Transport")
            services.push("  ")
        }
        if (shopping) {
            services.push("Shopping")
            services.push("  ")
        }
        if (rehabilitation) {
            services.push("Rehabilitation")
            services.push("  ")
        }
        if (nursing) {
            services.push("Nursing")
            services.push("  ")
        }
        return services

    }


    checkAvailability = (monday, tuesday, wednesday, thursday, friday, saturday) => {
        let array = ["Dostępne dni: "]
        if (monday) {
            array.push("Monday")
            array.push("  ")
        }
        if (tuesday) {
            array.push("Tuesday")
            array.push("  ")
        }
        if (wednesday) {
            array.push("Wednesday")
            array.push("  ")
        }
        if (thursday) {
            array.push("Thursday")
            array.push("  ")
        }
        if (friday) {
            array.push("Friday")
            array.push("  ")
        }
        if (saturday) {
            array.push("Saturday")
            array.push("  ")
        }
        return array
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
            width: '95%',
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
                        <p><strong>Zajecia: </strong>{this.checkServices(this.state.cooking, this.state.cleanup, this.state.transport,
                                this.state.shopping, this.state.rehabilitation, this.state.nursing)}</p>
                        <p><strong>Email:</strong>  {this.state.email} </p>
                        <p><strong>First Name:</strong> {this.state.firstName}</p>
                        <p><strong>Last Name:</strong> {this.state.lastName}</p>
                    </Card.Grid>

                    <Button style={buttonStyle} onClick={this.cancel}>Go Back</Button>
                    {/*<Button style={buttonStyle} onClick={this.onUpdateHandler(this.state.id)}>Edit</Button>*/}
                    <Popconfirm title="Sure to
            ?" onConfirm={() => this.onUpdateHandler(this.state.id)}>
                        <Button style={buttonStyle}>
                            <EditOutlined />
                            Zarezerwuj</Button>
                    </Popconfirm>

                </Card>
            </div>
        )
    }
}

export default Volunteer;