import React, {Component} from "react";
import {List, Avatar, Space, Card, Row, Col, Checkbox, Button, Popconfirm} from 'antd';
import {MessageOutlined, LikeOutlined, StarOutlined, UserOutlined, EditOutlined} from "@ant-design/icons";
import UserDataService from "../../../service/UserDataService";
import axios from "axios";


const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

class ListVolunteers extends Component {

    state = {
        volunteers: [],

        checkedCooking: false,
        checkedCleanup: false,
        checkedTransport: false,
        checkedShopping: false,
        checkedRehabilitation: false,
        checkedNursing: false,

        checkedMonday: false,
        checkedTuesday: false,
        checkedWednesday: false,
        checkedThursday: false,
        checkedFriday: false,
        checkedSaturday: false,

        isClear: false

    }

    componentDidMount() {



        UserDataService.getAllVolunteers()
            .then(response => {
                console.log('Response getAllVolunteers ' + JSON.stringify(response));
                this.setState({
                    volunteers: response.data,

                })




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


    conditionalCheck = (image) => {

        if(image !== null) {
            return (
                <Avatar src={`data:image/jpeg;base64, ${image.lob}`} size={115}
                        style={{
                            backgroundColor: '#ff8080'

                        }}/>
            )
        } else {
            return (
                <Avatar
                    size={115}
                    style={{
                        backgroundColor: '#ff8080'

                    }}
                    icon={<UserOutlined />}/>
            )

        }
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



    onUpdateHandler = (id) => {
        console.log('update ' + id)
        this.props.history.push(`/volunteer/${id}`)
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

    setMondayHandler = () => {
        let monday = this.state.checkedMonday
        this.setState({checkedMonday: !monday})
    }

    setTuesdayHandler = () => {
        let tuesday = this.state.checkedTuesday
        this.setState({checkedTuesday: !tuesday})
    }

    setWednesdayHandler = () => {
        let wednesday = this.state.checkedWednesday
        this.setState({checkedWednesday: !wednesday})
    }

    setThursdayHandler = () => {
        let thursday = this.state.checkedThursday
        this.setState({ checkedThursday: !thursday})
    }

    setFridayHandler = () => {
        let friday = this.state.checkedFriday
        this.setState({checkedFriday: !friday})
    }

    setSaturdayHandler = () => {
        let saturday = this.state.checkedSaturday
        this.setState({checkedSaturday: !saturday})
    }

    filterVolunteers = () => {
        let cooking = this.state.checkedCooking
        let cleanup = this.state.checkedCleanup
        let transport = this.state.checkedTransport
        let shopping = this.state.checkedShopping
        let rehabilitation = this.state.checkedRehabilitation
        let nursing = this.state.checkedNursing

        let monday = this.state.checkedMonday
        let tuesday = this.state.checkedTuesday
        let wednesday = this.state.checkedWednesday
        let thursday = this.state.checkedThursday
        let friday = this.state.checkedFriday
        let saturday = this.state.checkedSaturday

        if(!cooking && !cleanup && !transport && !shopping && !rehabilitation && !nursing && !monday && !tuesday && !wednesday
        && !thursday && !friday && !saturday)  {

            UserDataService.getAllVolunteers()
                .then(response => {
                    console.log('Response getAllVolunteers ' + JSON.stringify(response));
                    this.setState({
                        volunteers: response.data,

                    })

                })
        } else {
           // const  filterData = {
           //     cooking: cooking,
           //     cleanup: cleanup,
           //     transport: transport,
           //     shopping: shopping,
           //     rehabilitation: rehabilitation,
           //     nursing: nursing,
           //     monday: monday,
           //     tuesday: tuesday,
           //     wednesday: wednesday,
           //     thursday: thursday,
           //     friday: friday,
           //     saturday: saturday
           // }

            axios.get(`/api/users/getFilterVolunteers`, {
                params: {
                    cooking: cooking,
                    cleanup: cleanup,
                    transport: transport,
                    shopping: shopping,
                    rehabilitation: rehabilitation,
                    nursing: nursing,
                    monday: monday,
                    tuesday: tuesday,
                    wednesday: wednesday,
                    thursday: thursday,
                    friday: friday,
                    saturday: saturday
                }
            })
                .then(response => {
                    console.log('Response filterData ' + JSON.stringify(response))
                    this.setState({
                        volunteers: response.data,

                    })
                })
        }

    }

    render() {

        const listStyle = {
            width: '70%',
            // textAlign: 'center',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',

        };

        const cardStyle = {
            width: '95%',
            height: '1020px',
            textAlign: 'center',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderWidth: '3px',
            borderRadius: '15px',


        };
        const gridStyle = {
            width: '15%',
            textAlign: 'center',
            borderWidth: '3px',
            borderRadius: '20px',
            marginTop: '20px',
            marginLeft: '10px',
            marginRight: '10px'

        };
        const grid1Style = {
            width: '82%',
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




        return(
            <div>

                <Card style={cardStyle} headStyle={{backgroundColor:'#ff8080', borderRadius:'15px', color:'white', fontSize:'20px'}}
                      title={<div style={{color:'white'}} ><UserOutlined /> Volunteers</div>}>


                    <Card.Grid hoverable={false} style={gridStyle}>
                        <Checkbox.Group style={{marginBottom:'50px'}}
                        >
                            <p><strong>Zakres usług:</strong></p>
                            <Row style={{marginLeft:'50px'}}>
                                <Col >
                                    <Checkbox
                                        value="Cooking"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                         onChange={this.setCookingHandler}
                                    >
                                        Cooking
                                    </Checkbox>
                                </Col>

                                    <Checkbox
                                        value="Cleanup"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                         onChange={this.setCleanupHandler}
                                    >
                                        Cleanup
                                    </Checkbox>


                                    <Checkbox
                                        value="Transport"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                         onChange={this.setTransportHandler}
                                    >
                                        Transport
                                    </Checkbox>


                                    <Checkbox
                                        value="Shopping"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                         onChange={this.setShoppingHandler}
                                    >
                                        Shopping
                                    </Checkbox>


                                    <Checkbox
                                        value="Rehabilitation"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                         onChange={this.setRehabilitationHandler}
                                    >
                                        Rehabilitation
                                    </Checkbox>


                                    <Checkbox
                                        value="Nursing"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                         onChange={this.setNursingHandler}
                                    >
                                        Nursing
                                    </Checkbox>

                            </Row>
                        </Checkbox.Group>




                        <Checkbox.Group
                            style={{marginBottom:'50px'}}
                        >
                            <p><strong>Wymiar czasowy:</strong></p>
                            <Row style={{marginLeft:'50px'}}>
                                <Col >
                                    <Checkbox
                                        value="Monday"
                                        style={{
                                            lineHeight: '32px',
                                        }}
                                         onChange={this.setMondayHandler}
                                    >
                                        Monday
                                    </Checkbox>
                                </Col>

                                <Checkbox
                                    value="Tuesday"
                                    style={{
                                        lineHeight: '32px',
                                    }}
                                     onChange={this.setTuesdayHandler}
                                >
                                    Tuesday
                                </Checkbox>


                                <Checkbox
                                    value="Wednesday"
                                    style={{
                                        lineHeight: '32px',
                                    }}
                                     onChange={this.setWednesdayHandler}
                                >
                                    Wednesday
                                </Checkbox>


                                <Checkbox
                                    value="Thursday"
                                    style={{
                                        lineHeight: '32px',
                                    }}
                                     onChange={this.setThursdayHandler}
                                >
                                    Thursday
                                </Checkbox>


                                <Checkbox
                                    value="Friday"
                                    style={{
                                        lineHeight: '32px',
                                    }}
                                     onChange={this.setFridayHandler}
                                >
                                    Friday
                                </Checkbox>


                                <Checkbox
                                    value="Saturday"
                                    style={{
                                        lineHeight: '32px',
                                    }}
                                     onChange={this.setSaturdayHandler}
                                >
                                    Saturday
                                </Checkbox>

                            </Row>
                        </Checkbox.Group>
                        <Button style={buttonStyle} onClick={this.filterVolunteers}>Filtruj</Button>

                    </Card.Grid>
                    <Card.Grid hoverable={false} style={grid1Style}>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 3,
                            }}
                            dataSource={this.state.volunteers}
                            // footer={
                            //     <div>
                            //         <b>ant design</b> footer part
                            //     </div>
                            // }
                            renderItem={item => (
                                <List.Item
                                    style={{borderColor:'black'}}
                                    key={item.accountDetails.firstName}
                                    actions={[
                                        <Popconfirm title="Sure to
            ?" onConfirm={() => this.onUpdateHandler(item.id)}>
                                            <Button style={buttonStyle}>
                                                <EditOutlined />
                                                Profil</Button>
                                        </Popconfirm>
                                    ]}
                                    // extra={
                                    //     <img
                                    //         width={272}
                                    //         alt="logo"
                                    //         src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                    //     />
                                    // }
                                >
                                    <List.Item.Meta
                                        // avatar={<Avatar src={item.avatar} size={150} />}
                                        avatar={this.conditionalCheck(item.image)}

                                        title={<div><strong>{item.accountDetails.firstName} {item.accountDetails.lastName}</strong></div>}
                                        description={this.checkAvailability(item.volunteerDetails.monday, item.volunteerDetails.tuesday, item.volunteerDetails.wednesday,
                                            item.volunteerDetails.thursday, item.volunteerDetails.friday, item.volunteerDetails.saturday)}
                                    />
                                    {this.checkServices(item.volunteerDetails.cooking, item.volunteerDetails.cleanup, item.volunteerDetails.transport,
                                        item.volunteerDetails.shopping, item.volunteerDetails.rehabilitation, item.volunteerDetails.nursing)}
                                </List.Item>
                            )}
                        />
                    </Card.Grid>
                </Card>

            </div>
        )
    }
}

export default ListVolunteers;