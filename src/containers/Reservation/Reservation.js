import React, {Component} from "react";
import UserDataService from "../../service/UserDataService";
import {EditOutlined, UserOutlined} from "@ant-design/icons";
import {Button, Card, Checkbox, DatePicker, Popconfirm} from "antd";
import Avatar from "antd/es/avatar/avatar";
import moment from 'moment';
import {toast} from "react-toastify";
import {connect} from "react-redux";
import * as actions from "../../store/actions";
import axios from "axios";
import {registerSuccess} from "../../store/actions";
import {authFail} from "../../store/actions/auth";


class Reservation extends Component {



    state = {
        id: this.props.match.params.id,
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



        checkedCooking: false,
        checkedCleanup: false,
        checkedTransport: false,
        checkedShopping: false,
        checkedRehabilitation: false,
        checkedNursing: false,

        totalPoints: 0,
        reservationDate : '',


        dates:[]

    }

    componentDidMount() {

        console.log(this.state.id)

        UserDataService.getVolunteerReservation(this.state.id)
            .then(response => {
                console.log('Response volunteerReservation ' + JSON.stringify(response));
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


        UserDataService.getVolunteerReservationDate(this.state.id)
            .then(response => {
                console.log('Dates: ' + JSON.stringify(response));

                this.conditionalCheck(response.data)
            })

    }

    conditionalCheck = (services) => {

        let array = []

        for ( let i=0 ; i < services.length; i++ ) {

            array.push(services[i].reservationDate)

        }

        console.log('DatesLOL'+ array)
        this.setState({
            dates: array
        })

    }


    setCookingHandler = () => {
        let cooking = this.state.checkedCooking
        this.setState({checkedCooking: !cooking})
    }

    setCleanupHandler = () => {
        let cleanup = this.state.checkedCleanup
        this.setState({checkedCleanup: !cleanup})
    }

    setTransportHandler = () => {
        let transport = this.state.checkedTransport
        this.setState({checkedTransport: !transport})
    }

    setShoppingHandler = () => {
        let shopping = this.state.checkedShopping
        this.setState({checkedShopping: !shopping})
    }

    setRehabilitationHandler = () => {
        let rehabilitation = this.state.checkedRehabilitation
        this.setState({checkedRehabilitation: !rehabilitation})
    }

    setNursingHandler = () => {
        let nursing = this.state.checkedNursing
        this.setState({checkedNursing: !nursing})
    }

    handleAllPointsAndReserve = () => {
        let cookingPoints = 0
        let cleanupPoints = 0
        let transportPoints = 0
        let shoppingPoints = 0
        let rehabilitationPoints = 0
        let nursingPoints = 0
        if (this.state.checkedCooking) {
            cookingPoints = 10
        }
        if (this.state.checkedCleanup) {
            cleanupPoints = 12
        }
        if (this.state.checkedTransport) {
            transportPoints = 15
        }
        if (this.state.checkedShopping) {
            shoppingPoints = 5
        }
        if (this.state.checkedRehabilitation) {
            rehabilitationPoints = 8
        }
        if (this.state.checkedNursing) {
            nursingPoints = 6
        }
        let totalPoints = cookingPoints + cleanupPoints + transportPoints + shoppingPoints + rehabilitationPoints + nursingPoints
        this.setState({
            totalPoints: totalPoints
        })
        toast.success(`${totalPoints} tyle to kosztuje punktow, jestes pewien`, {position: toast.POSITION.BOTTOM_RIGHT})
        console.log("Id wolontariusza: " + this.state.id + " id moje "+ this.props.user.id + "Punkty: " + totalPoints + " data rezerwacji: " + this.state.reservationDate )


        const reservationData = {
            totalPoints: totalPoints,
            reservationDate: this.state.reservationDate,
            seniorId: this.props.user.id,
            volunteerId: this.state.id,
            cookingService: this.state.checkedCooking,
            cleanupService: this.state.checkedCleanup,
            transportService: this.state.checkedTransport,
            shoppingService: this.state.checkedShopping,
            rehabilitationService: this.state.checkedRehabilitation,
            nursingService: this.state.checkedNursing

        }

        axios.post("/api/users/reservation", reservationData)
            .then(response => {
                console.log('Response ' + JSON.stringify(response.headers));
                // dispatch(registerSuccess())
                toast.success('Successful reservation', {position: toast.POSITION.BOTTOM_RIGHT})
            })
            .catch(err => {
                console.log('Error ' + JSON.stringify(err.response))
                // dispatch(authFail(err.response.data));
                toast.error(err.response.data.message, {position: toast.POSITION.BOTTOM_RIGHT})
            });
    }






    disabledDate = (current) => {
        // const disabledDates = ["2021-01-13", "2021-01-23"];
        const disabledDates = this.state.dates
        // Can not select Sundays and predefined days
        let monday = -1;
        let tuesday = -1;
        let wednesday = -1;
        let thursday = -1;
        let friday = -1;
        let saturday = -1;
        if (this.state.monday === false) {
            monday = 1
        }
        if (this.state.tuesday ===false) {
            tuesday = 2
        }
        if (this.state.wednesday ===false) {
            wednesday = 3
        }
        if (this.state.thursday ===false) {
            thursday = 4
        }
        if (this.state.friday ===false) {
            friday = 5
        }
        if (this.state.saturday ===false) {
            saturday = 6
        }

        return (
            moment(current).day() === monday  || moment(current).day() === tuesday  || moment(current).day() === wednesday  ||
            moment(current).day() === thursday  || moment(current).day() === friday  || moment(current).day() === saturday  || moment(current).day() === 0  ||
            disabledDates.find(date => date === moment(current).format("YYYY-MM-DD")) || moment().add(-1, 'days')  >= current
        );
    }

     onDataChange = (date, dateString) => {
        console.log(moment(date).format("YYYY-MM-DD"));
        this.setState({
            reservationDate: moment(date).format("YYYY-MM-DD")
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
            width: '97%',
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
                      title={<div style={{color:'white'}} ><UserOutlined /> VolunteerReservation</div>}>
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
                        <p><strong>Wybierz które z tych zajęć ma świadczyć wolontariusz podczas wizyty: </strong>
                            <p>
                            {this.state.cooking ? <Checkbox onChange={this.setCookingHandler}>Cooking</Checkbox> : null}
                            {this.state.cleanup ? <Checkbox onChange={this.setCleanupHandler}>Cleanup</Checkbox> : null}
                            {this.state.transport ? <Checkbox onChange={this.setTransportHandler}>Transport</Checkbox> : null}
                            {this.state.shopping ? <Checkbox onChange={this.setShoppingHandler}>Shopping</Checkbox> : null}
                            {this.state.rehabilitation ? <Checkbox onChange={this.setRehabilitationHandler}>Rehabilitation</Checkbox> : null}
                            {this.state.nursing ? <Checkbox onChange={this.setNursingHandler}>Nursing</Checkbox>: null}
                            </p>
                        </p>

                    </Card.Grid>

                    <Card.Grid hoverable={false} style={grid1Style}>
                        <p><strong>Wybierz dzień dokonania rezerwacji: </strong>
                            <p>
                                <DatePicker

                                    format="YYYY-MM-DD"
                                    disabledDate={this.disabledDate}
                                    onChange={this.onDataChange}
                                    showTime={{ defaultValue: moment("00:00:00") }}
                                />
                            </p>
                        </p>

                    </Card.Grid>

                    <Button style={buttonStyle} onClick={this.cancel}>Go Back</Button>
                    {/*<Button style={buttonStyle} onClick={this.onUpdateHandler(this.state.id)}>Edit</Button>*/}
                    <Popconfirm title="Sure to
            ?" onConfirm={() => this.handleAllPointsAndReserve() }>
                        <Button style={buttonStyle}>
                            <EditOutlined />
                            Dokonaj rezerwacji</Button>
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

        user: state.auth.user,
        points: state.auth.points
    };
};

export default connect( mapStateToProps, mapDispatchToProps() )( Reservation );