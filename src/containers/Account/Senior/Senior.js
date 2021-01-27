import React, {Component} from "react";
import UserDataService from "../../../service/UserDataService";
import {Button, Card, Popconfirm, Select} from "antd";
import {
    CheckCircleTwoTone,
    CloseCircleOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    UserOutlined
} from "@ant-design/icons";
import Avatar from "antd/es/avatar/avatar";
import {Option} from "antd/es/mentions";
import {toast} from "react-toastify";
import axios from "axios";


class Senior extends Component {
    state = {
        id: this.props.match.params.id,
        acceptCertificate: null,
        textFile: null,
        firstName: null,
        lastName: null,
        phoheNumber: null,
        levelName: 'NONE'



    }

    cancel = () => {
        this.props.history.goBack()
    }



    componentDidMount() {



        UserDataService.getSenior(this.state.id)
            .then(response => {
                console.log('Response senior ' + JSON.stringify(response));
                this.setState({
                    acceptCertificate: response.data.seniorDetails.acceptCertificate,
                    firstName: response.data.accountDetails.firstName,
                    lastName: response.data.accountDetails.lastName,
                    phoneNumber: response.data.accountDetails.phoneNumber




                })
                if (response.data.seniorDetails.lob !== null) {
                    this.setState({
                        textFile: response.data.seniorDetails.lob
                    })
                }
            })
        // let data = this.state.image
        // this.onSetBlob(data)
    }

    displayCertificate = (acceptCertificate) => {
        let array = []
        if (acceptCertificate === true) {
            let decodedText = atob(this.state.textFile)
            return <div>{decodedText} </div>
        } else if ( acceptCertificate === false) {
            let decodedText = atob(this.state.textFile)
            return <div>{decodedText} </div>
        } else if (acceptCertificate === null) {
            return <div>Brak certyfikatu</div>
        }

        return array
    }




    calculateCertificateLevel = () => {
        if (this.state.levelName === 'NONE') {
            toast.error('You dont select level', {position: toast.POSITION.BOTTOM_RIGHT})
        } else {
            console.log('Level status: ' + this.state.levelName)

            const data = {id: this.state.id, levelName: this.state.levelName, acceptCertificate: this.state.acceptCertificate}
            axios.post("/api/users/calculateCertificateLevel", data)
                .then(response => {
                    console.log('Response ' + JSON.stringify(response));
                    toast.success('Successful ', {position: toast.POSITION.BOTTOM_RIGHT})
                })
                .catch(err => {
                    console.log('Error ' + JSON.stringify(err.response))
                    toast.error('Error ', {position: toast.POSITION.BOTTOM_RIGHT})
                });
            this.props.history.push(`/`)
        }


    }




    render() {
        const cardStyle = {
            width: '80%',
            height: '800px',
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
                      title={<div style={{color:'white'}} ><UserOutlined /> Senior</div>}>


                    <Card.Grid hoverable={false} style={grid1Style}>
                        <p style={{textAlign:'center', fontSize:'22px'}}><strong>Informacje ogólne:</strong> </p>
                        <p><strong>First Name:</strong> {this.state.firstName}</p>
                        <p><strong>Last Name:</strong> {this.state.lastName}</p>
                        <p><strong>Phone Number:</strong> {this.state.phoneNumber}</p>
                    </Card.Grid>
                    <Card.Grid hoverable={false} style={grid1Style}>
                        <p style={{textAlign:'center', fontSize:'22px'}}><strong>Orzeczenie:</strong> </p>
                        {this.displayCertificate(this.state.acceptCertificate)}
                    </Card.Grid>
                    <Card.Grid hoverable={false} style={grid1Style}>
                        <p style={{textAlign:'center', fontSize:'22px'}}><strong>Ocena orzeczenia:</strong> </p>

                        {this.state.acceptCertificate === false ?
                       <div style={{textAlign:'center'}}>Wymaga oceny <ExclamationCircleOutlined style={{color:'red', marginLeft:'3px'}} />
                    <p></p>
                       <p>
                           <Select
                               onChange={(value) => {
                                   this.setState({levelName: value})
                               }}
                               name="disabilityLevel"
                               placeholder="select a disability level">
                               <Option value="LIGHT">Light</Option>
                               <Option value="MODERATE">Moderate</Option>
                               <Option value="SIGNIFICANT">Significant</Option>
                           </Select>
                           <p>
                               <p></p>
                           <Popconfirm title="Sure to
            ?" onConfirm={() => this.calculateCertificateLevel()}>
                               <Button style={buttonStyle}>
                                   <EditOutlined />
                                   Oceń orzeczenie</Button>
                           </Popconfirm>
                       </p>
                       </p>

                       </div> :
                       <div style={{textAlign:'center'}}>Ocenione/ brak konieczności oceny <CheckCircleTwoTone style={{marginRight:'5px', textAlign: 'left'}} twoToneColor="#52c41a" />  </div>  }
                    </Card.Grid>

                    <Button style={buttonStyle} onClick={this.cancel}>Go Back</Button>



                </Card>
            </div>
        )
    }
}

export default Senior;