import React, {Component} from "react";
import UserDataService from "../../service/UserDataService";
import {connect} from "react-redux";
import {Avatar, Button, Card, Input, Popconfirm, Space, Table} from "antd";
import {EditOutlined, SearchOutlined, UsergroupAddOutlined, UserOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";


class VolunteerReservationList extends Component {

    state = {
        reservations: [],



    }

    componentDidMount() {



        UserDataService.getSeniorReservationList(this.props.user.id)
            .then(response => {
                console.log('Response reservationsSenior ' + JSON.stringify(response));
                this.setState({
                    reservations: response.data,
                })

            })

    }

    conditionalCheck = (services) => {

        let array = []

        for ( let i=0 ; i < services.length; i++ ) {


            if (services[i].name === 'COOKING') {
                array.push("Cooking")
                array.push("  ")
            }
            if (services[i].name === 'CLEANUP') {
                array.push("Cleanup")
                array.push("  ")
            }
            if (services[i].name === 'TRANSPORT') {
                array.push("Transport")
                array.push("  ")
            }
            if (services[i].name === 'SHOPPING') {
                array.push("Shopping")
                array.push("  ")
            }
            if (services[i].name === 'REHABILITATION') {
                array.push("Rehabilitation")
                array.push("  ")
            }
            if (services[i].name === 'NURSING') {
                array.push("Nursing")
                array.push("  ")
            }

        }


        // if (tuesday) {
        //     array.push("Tuesday")
        //     array.push("  ")
        // }
        // if (wednesday) {
        //     array.push("Wednesday")
        //     array.push("  ")
        // }
        // if (thursday) {
        //     array.push("Thursday")
        //     array.push("  ")
        // }
        // if (friday) {
        //     array.push("Friday")
        //     array.push("  ")
        // }
        // if (saturday) {
        //     array.push("Saturday")
        //     array.push("  ")
        // }
        return array
    }


    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };


    render() {

        const tableStyle = {
            width: '70%',
            textAlign: 'center',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            border:'none'

        };

        const buttonStyle = {
            backgroundColor: '#ffe0b3',
            borderRadius: '15px'
        }

        const columns = [

            {
                title: 'Login seniora rezerwującego usługę',
                dataIndex: 'senior',
                key: 'senior',
                width: '25%',
                render: (senior) => <div>{senior.login}</div>

            },
            {
                title: 'Data rezerwacji',
                dataIndex: 'reservationDate',
                key: 'reservationDate',
                width: '25%',
                ...this.getColumnSearchProps('reservationDate'),

            },
            {
                title: 'Koszt rezerwacji w punktach',
                dataIndex: 'totalPoints',
                key: 'totalPoints',
                width: '25%',
                ...this.getColumnSearchProps('totalPoints'),

            },
            {
                title: 'Usługi w ramach rezerwacji',
                dataIndex: 'services',
                key: 'services',
                width: '25%',
                render: (services) => this.conditionalCheck(services)

            },


        ];


        return (
            <div>
                <Card style={tableStyle} headStyle={{backgroundColor:'#ff8080', borderRadius:'15px', color:'white', fontSize:'20px'}}
                      title={<div style={{color:'white'}} ><UsergroupAddOutlined /> Rezerwacje</div>}> </Card>
                <Table style={tableStyle} columns={columns} dataSource={this.state.reservations}  />
            </div>
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

export default connect( mapStateToProps, mapDispatchToProps )( VolunteerReservationList );
