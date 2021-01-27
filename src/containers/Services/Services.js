import React, {Component} from "react";
import {connect} from "react-redux";
import UserDataService from "../../service/UserDataService";
import {Button, Card, Checkbox, Col, DatePicker, Form, Popconfirm, Row} from "antd";
import {EditOutlined, UserOutlined} from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import {toast} from "react-toastify";


class Services extends Component {

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



    }

    componentDidMount() {

        console.log(this.state.id)

        UserDataService.getVolunteerReservation(this.props.user.id)
            .then(response => {
                console.log('Response volunteer services ' + JSON.stringify(response));
                this.setState({

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

                })})


    }

    editVolunteerServices = () => {


        const data = {id: this.props.user.id, cooking: this.state.cooking, cleanup: this.state.cleanup, transport: this.state.transport,
            shopping: this.state.shopping, rehabilitation: this.state.rehabilitation, nursing: this.state.nursing,
            monday: this.state.monday, tuesday: this.state.tuesday, wednesday: this.state.wednesday, thursday: this.state.thursday,
            friday: this.state.friday, saturday: this.state.saturday}
        console.log(data)

        axios.put("/api/users/editVolunteerServices", data)
            .then(response => {
                console.log('Response ' + JSON.stringify(response));
                toast.success('Successful ', {position: toast.POSITION.BOTTOM_RIGHT})
            })
            .catch(err => {
                console.log('Error ' + JSON.stringify(err.response))
                toast.error('Error', {position: toast.POSITION.BOTTOM_RIGHT})
            });

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
            width: '80%',
            height: '900px',
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
            width: '97%',
            textAlign: 'center',
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
                          title={<div style={{color:'white'}} ><UserOutlined /> Volunteer Services</div>}>
                        <Card.Grid hoverable={false} style={grid1Style}>
                            <p><strong>Zajęcia: </strong>
                                {this.state.cooking ? <div>Cooking: 10pkt</div> : null}
                                {this.state.cleanup ? <div>Cleanup: 12 pkt</div> : null}
                                {this.state.transport ? <div>Transport: 15 pkt</div> : null}
                                {this.state.shopping ? <div>Shopping: 5 pkt</div> : null}
                                {this.state.rehabilitation ? <div>Rehabilitation: 8 pkt</div> : null}
                                {this.state.nursing ? <div>Nursing: 6 pkt</div> : null}

                            </p>

                        </Card.Grid>
                        <Card.Grid hoverable={false} style={grid1Style}>
                            <p></p>
                            <p><strong>DNi: </strong>
                                {this.state.monday ? <div>Monday</div> : null}
                                {this.state.tuesday ? <div>Tuesday</div> : null}
                                {this.state.wednesday ? <div>Wednesday</div> : null}
                                {this.state.thursday? <div>Thursday</div> : null}
                                {this.state.friday ? <div>Friday</div> : null}
                                {this.state.saturday ? <div>Saturday</div> : null}

                            </p>

                        </Card.Grid>
                        <Card.Grid hoverable={false} style={grid1Style}>
                        <p style={{textAlign:'center', fontSize:'22px'}}><strong>Usługi:</strong> </p>
                        <p>

                                    <Checkbox
                                        value="Cooking"
                                        checked={this.state.cooking}
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setCookingHandler}
                                    >
                                        Cooking
                                    </Checkbox>


                                    <Checkbox
                                        value="Cleanup"
                                        checked={this.state.cleanup}
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setCleanupHandler}
                                    >
                                        Cleanup
                                    </Checkbox>


                                    <Checkbox
                                        value="Transport"
                                        checked={this.state.transport}
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setTransportHandler}
                                    >
                                        Transport
                                    </Checkbox>


                                    <Checkbox
                                        value="Shopping"
                                        checked={this.state.shopping}
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setShoppingHandler}
                                    >
                                        Shopping
                                    </Checkbox>


                                    <Checkbox
                                        value="Rehabilitation"
                                        checked={this.state.rehabilitation}
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setRehabilitationHandler}
                                    >
                                        Rehabilitation
                                    </Checkbox>


                                    <Checkbox
                                        value="Nursing"
                                        checked={this.state.nursing}
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setNursingHandler}
                                    >
                                        Nursing
                                    </Checkbox>



                        </p>

                        <p style={{textAlign:'center', fontSize:'22px'}}><strong>Dni:</strong> </p>
                        <p>
                                    <Checkbox
                                        value="Monday"
                                        checked={this.state.monday}
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setMondayHandler}
                                    >
                                        Monday
                                    </Checkbox>


                                    <Checkbox
                                        value="Tuesday"
                                        checked={this.state.tuesday}
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setTuesdayHandler}
                                    >
                                        Tuesday
                                    </Checkbox>


                                    <Checkbox
                                        value="Wednesday"
                                        checked={this.state.wednesday}
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setWednesdayHandler}
                                    >
                                        Wednesday
                                    </Checkbox>


                                    <Checkbox
                                        value="Thursday"
                                        checked={this.state.thursday}
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setThursdayHandler}
                                    >
                                        Thursday
                                    </Checkbox>


                                    <Checkbox
                                        value="Friday"
                                        checked={this.state.friday}
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setFridayHandler}
                                    >
                                        Friday
                                    </Checkbox>


                                    <Checkbox
                                        value="Saturday"
                                        checked={this.state.saturday}
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                        onChange={this.setSaturdayHandler}
                                    >
                                        Saturday
                                    </Checkbox>


                        </p>
                        </Card.Grid>
                        <Popconfirm title="Sure to
            ?" onConfirm={() => this.editVolunteerServices() }>
                            <Button style={buttonStyle}>
                                <EditOutlined />
                                Edytuj</Button>
                        </Popconfirm>
                    </Card>

            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {


    };
};

const mapStateToProps = state => {
    return {

        user: state.auth.user
    };
};

export default connect( mapStateToProps, mapDispatchToProps() )( Services );